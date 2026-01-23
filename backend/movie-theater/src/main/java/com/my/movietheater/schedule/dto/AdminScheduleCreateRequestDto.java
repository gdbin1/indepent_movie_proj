package com.my.movietheater.schedule.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * ADMIN 스케줄 생성 요청 DTO
 */
@Getter
@Setter
public class AdminScheduleCreateRequestDto {

    @NotNull
    private Long movieId;

    @NotNull
    private Long roomId;

    @NotNull
    private LocalDate displayDate;

    @NotNull
    private LocalTime startTime;
}
