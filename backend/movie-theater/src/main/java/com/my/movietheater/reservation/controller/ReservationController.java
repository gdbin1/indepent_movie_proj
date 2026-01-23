package com.my.movietheater.reservation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.reservation.dto.ReservationDto;
import com.my.movietheater.reservation.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * USER 예약 생성
     */
    @PostMapping
    public ReservationDto createReservation(@RequestBody ReservationDto reservation) {
        return reservationService.createReservation(reservation);
    }

    /**
     * 예약 단건 조회 (예약 완료 / 확인 페이지용)
     */
    @GetMapping("/{reservationId}")
    public ReservationDto getReservation(@PathVariable("reservationId") Long reservationId) {
        return reservationService.getReservation(reservationId);
    }

    /**
     * 예약 취소
     */
    @PatchMapping("/{reservationId}/cancel")
    public void cancelReservation(@PathVariable("reservationId") Long reservationId) {
        reservationService.cancelReservation(reservationId);
    }
}
