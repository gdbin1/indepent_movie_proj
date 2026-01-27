package com.my.movietheater.reservation.dto;

import lombok.Data;

@Data
public class AdminReservationCancelRequest {
    private Long reservationId;     // 필수
    private String reason;          // 선택(지금은 저장 컬럼 없음 → 로그/확장용)
}
