package com.my.movietheater.reservation.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AdminReservationListDto {

    // reservation
    private Long reservationId;
    private String reservationNo;
    private Long userId;
    private Long scheduleId;
    private Long roomId;

    private Integer peopleCount;
    private Integer priceTotal;
    private String reservationStatus;   // reservation.status
    private LocalDateTime canceledAt;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // users
    private String userEmail;
    private String userName;
    private String userPhone;
    private String userRole;

    // room
    private String roomCode;
    private String roomName;
    private String roomType;
    private Integer capacityMin;
    private Integer capacityMax;

    // schedule
    private LocalDate displayDate;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String scheduleStatus;
}
