package com.my.movietheater.reservation.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.my.movietheater.reservation.dto.AdminReservationListDto;
import com.my.movietheater.reservation.mapper.AdminReservationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminReservationService {

    private final AdminReservationMapper adminReservationMapper;

    public Map<String, Object> getAdminReservationList(
            String date,
            String status,
            String keyword,
            int page,
            int size
    ) {
        if (!StringUtils.hasText(date)) {
            throw new IllegalArgumentException("date는 필수입니다.");
        }

        int safePage = Math.max(page, 1);
        int safeSize = 10;
        int offset = (safePage - 1) * safeSize;

        String safeStatus =
                (StringUtils.hasText(status) && !"ALL".equalsIgnoreCase(status))
                        ? status
                        : null;

        String safeKeyword =
                StringUtils.hasText(keyword) ? keyword.trim() : null;

        List<AdminReservationListDto> list =
                adminReservationMapper.selectAdminReservationList(
                        date, safeStatus, safeKeyword, safeSize, offset
                );

        int total =
                adminReservationMapper.countAdminReservationList(
                        date, safeStatus, safeKeyword
                );

        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("page", safePage);
        result.put("size", safeSize);
        result.put("totalCount", total);
        result.put("totalPage", (int) Math.ceil((double) total / safeSize));

        return result;
    }

    @Transactional
    public Map<String, Object> cancelByAdmin(Long reservationId) {
        String status =
                adminReservationMapper.selectReservationStatusById(reservationId);

        if (status == null) {
            throw new IllegalArgumentException("존재하지 않는 예약입니다.");
        }
        if ("CANCELLED".equalsIgnoreCase(status)) {
            throw new IllegalStateException("이미 취소된 예약입니다.");
        }

        adminReservationMapper.cancelReservationByAdmin(reservationId);

        Map<String, Object> result = new HashMap<>();
        result.put("reservationId", reservationId);
        result.put("status", "CANCELLED");
        return result;
    }
}
