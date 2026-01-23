package com.my.movietheater.reservation.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.reservation.dto.ReservationDto;

@Mapper
public interface ReservationMapper {

    /**
     * room 가격 조회
     */
    Integer selectRoomPrice(@Param("roomId") Long roomId);

    /**
     * schedule + room 기준 중복 예약 체크
     */
    int countByScheduleAndRoom(
            @Param("scheduleId") Long scheduleId,
            @Param("roomId") Long roomId
    );

    /**
     * 예약 생성
     */
    int insertReservation(ReservationDto reservation);

    /**
     * 예약 단건 조회
     */
    ReservationDto selectReservationById(@Param("reservationId") Long reservationId);

    /**
     * 예약 취소
     */
    int cancelReservation(@Param("reservationId") Long reservationId);
}
