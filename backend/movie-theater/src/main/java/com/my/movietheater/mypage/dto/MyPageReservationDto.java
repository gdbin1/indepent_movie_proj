// src/main/java/com/my/movietheater/mypage/dto/MyPageReservationDto.java
package com.my.movietheater.mypage.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MyPageReservationDto {

    private Long reservationId;

    private Long userId;

    private Long movieId;
    private String movieTitle;      // ✅ movie.title AS movieTitle

    private Long scheduleId;
    private LocalDate displayDate;
    private LocalDateTime startAt;
    private LocalDateTime endAt;

    private Long roomId;
    private String roomName;

    private Integer peopleCount;
    private Integer priceTotal;

    // RESERVED / COMPLETED / CANCELED (문자열로 그대로 내려줌)
    private String status;

    private LocalDateTime createdAt;
}
