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
            String status,
            String keyword,
            String dateFrom,
            String dateTo,
            int page,
            int size
    ) {
        int safePage = Math.max(page, 1);
        int safeSize = Math.min(Math.max(size, 1), 100); // 최대 100 제한
        int offset = (safePage - 1) * safeSize;

        String safeStatus = StringUtils.hasText(status) ? status : null;
        String safeKeyword = StringUtils.hasText(keyword) ? keyword.trim() : null;
        String safeDateFrom = StringUtils.hasText(dateFrom) ? dateFrom : null;
        String safeDateTo = StringUtils.hasText(dateTo) ? dateTo : null;

        List<AdminReservationListDto> list = adminReservationMapper.selectAdminReservationList(
                safeStatus, safeKeyword, safeDateFrom, safeDateTo, safeSize, offset
        );
        int total = adminReservationMapper.countAdminReservationList(
                safeStatus, safeKeyword, safeDateFrom, safeDateTo
        );

        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("page", safePage);
        result.put("size", safeSize);
        result.put("total", total);
        result.put("totalPages", (int) Math.ceil((double) total / safeSize));
        return result;
    }
    
 // Step 2: ADMIN 강제 취소
    // =========================
    @Transactional
    public Map<String, Object> cancelByAdmin(Long reservationId) {
        if (reservationId == null) {
            throw new IllegalArgumentException("reservationId는 필수입니다.");
        }

        String status = adminReservationMapper.selectReservationStatusById(reservationId);
        if (status == null) {
            throw new IllegalArgumentException("존재하지 않는 예약입니다. reservationId=" + reservationId);
        }
        if ("CANCELLED".equalsIgnoreCase(status)) {
            throw new IllegalStateException("이미 취소된 예약입니다.");
        }

        int updated = adminReservationMapper.cancelReservationByAdmin(reservationId);
        if (updated == 0) {
            // 동시성 등으로 이미 취소된 경우
            throw new IllegalStateException("예약 취소에 실패했습니다. (이미 취소되었을 수 있음)");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("reservationId", reservationId);
        result.put("status", "CANCELLED");
        result.put("message", "ADMIN 강제 취소 완료");
        return result;
    }
}
