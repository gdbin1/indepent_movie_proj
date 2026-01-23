package com.my.movietheater.reservation.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Reservation DTO
 * reservation 테이블 기준
 */
@Getter
@Setter
@ToString
public class ReservationDto {

    private Long reservationId;     // PK
    private String reservationNo;   // UNIQUE 예약 번호

    private Long userId;            // 사용자 ID
    private Long scheduleId;        // 스케줄 ID
    private Long roomId;            // ✅ 방 ID (핵심)

    private Integer peopleCount;    // 인원 수
    private Integer priceTotal;     // 총 금액 (서버에서 room.base_price로 확정)

    private String status;          // RESERVED / CANCELLED

    private LocalDateTime canceledAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
