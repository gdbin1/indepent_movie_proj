package com.my.movietheater.schedule.dto;

import lombok.Data;

@Data
public class ScheduleResponseDto {

    private Long scheduleId;

    // start_at / end_at → HH:mm
    private String startTime;
    private String endTime;

    private String status;
}
