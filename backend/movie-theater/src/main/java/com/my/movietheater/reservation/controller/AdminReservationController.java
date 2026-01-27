package com.my.movietheater.reservation.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.reservation.service.AdminReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/reservations")
public class AdminReservationController {

    private final AdminReservationService adminReservationService;

    /**
     * ADMIN 전체 예약 목록 조회 (취소 포함 히스토리)
     * - status: 필터 (예: RESERVED, CANCELED 등) / 없으면 전체
     * - keyword: 예약번호, 이메일, 이름, 전화 검색
     * - dateFrom, dateTo: 상영일(display_date) 기준 필터 (YYYY-MM-DD)
     * - page, size: 페이징
     */
    @GetMapping
    public Map<String, Object> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return adminReservationService.getAdminReservationList(status, keyword, dateFrom, dateTo, page, size);
    }
    
//    ADMIN 강제 취소
    @PostMapping("/{reservationId}/cancel")
    public Map<String, Object> cancel(@PathVariable Long reservationId) {
        return adminReservationService.cancelByAdmin(reservationId);
    }
}
