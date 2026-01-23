package com.my.movietheater.schedule.dto;

import lombok.Data;

@Data
public class ScheduleResponseDto {

    private Long scheduleId;
    private String roomName;

    // start_at / end_at → HH:mm 로 내려줌
    private String startTime;
    private String endTime;

    private int priceFinal;
}
