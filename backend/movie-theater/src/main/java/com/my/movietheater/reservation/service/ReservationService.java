package com.my.movietheater.reservation.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.reservation.dto.ReservationDto;
import com.my.movietheater.reservation.mapper.ReservationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationMapper reservationMapper;

    /**
     * 예약 생성
     * - ✅ room_id 반드시 저장
     * - ✅ price_total은 서버가 room.base_price로 확정 (프론트 값 무시)
     * - ✅ 중복 예약 방지: schedule_id + room_id + status=RESERVED
     */
    @Transactional
    public ReservationDto createReservation(ReservationDto reservation) {

        // 필수값 검증
        if (reservation.getUserId() == null) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }
        if (reservation.getScheduleId() == null) {
            throw new IllegalArgumentException("scheduleId는 필수입니다.");
        }
        if (reservation.getRoomId() == null) {
            throw new IllegalArgumentException("roomId는 필수입니다.");
        }
        if (reservation.getPeopleCount() == null || reservation.getPeopleCount() <= 0) {
            throw new IllegalArgumentException("peopleCount는 1 이상이어야 합니다.");
        }

        // ✅ 중복 방지 (시간+방 기준)
        int exists = reservationMapper.countByScheduleAndRoom(
                reservation.getScheduleId(),
                reservation.getRoomId()
        );
        if (exists > 0) {
            throw new IllegalStateException("이미 예약된 공간입니다.");
        }

        // ✅ 가격은 서버에서 room.base_price로 확정
        Integer roomPrice = reservationMapper.selectRoomPrice(reservation.getRoomId());
        if (roomPrice == null) {
            throw new IllegalStateException("존재하지 않거나 비활성화된 공간입니다.");
        }

        reservation.setReservationNo(generateReservationNo());
        reservation.setStatus("RESERVED");
        reservation.setPriceTotal(roomPrice); // 프론트 priceTotal 무시

        reservationMapper.insertReservation(reservation);

        return reservation;
    }

    @Transactional(readOnly = true)
    public ReservationDto getReservation(Long reservationId) {
        return reservationMapper.selectReservationById(reservationId);
    }

    /**
     * 예약 취소
     */
    @Transactional
    public void cancelReservation(Long reservationId, Long loginUserId) {
        int updated = reservationMapper.cancelReservation(reservationId, loginUserId);

        if (updated == 0) {
            throw new IllegalStateException("예약 취소에 실패했습니다.");
        }
    }


    private String generateReservationNo() {
        String date = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int random = (int) (Math.random() * 9000) + 1000;
        return "RSV-" + date + "-" + random;
    }
}
