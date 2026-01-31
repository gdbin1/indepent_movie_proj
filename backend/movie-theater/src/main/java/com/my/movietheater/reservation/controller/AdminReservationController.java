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
     * ADMIN 예약 목록 조회 (v2)
     * - date 필수
     * - status, keyword 선택
     * - page, size 페이징
     */
    @GetMapping
    public Map<String, Object> list(
            @RequestParam(name = "date") String date,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return adminReservationService.getAdminReservationList(
                date, status, keyword, page, size
        );
    }

    @PostMapping("/{reservationId}/cancel")
    public Map<String, Object> cancel(@PathVariable("reservationId") Long reservationId) {
        return adminReservationService.cancelByAdmin(reservationId);
    }
}
