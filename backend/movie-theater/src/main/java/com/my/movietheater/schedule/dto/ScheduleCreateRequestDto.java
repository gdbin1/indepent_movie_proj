package com.my.movietheater.schedule.dto;

import lombok.Data;

@Data
public class ScheduleCreateRequestDto {

    private Long scheduleId; // useGeneratedKeys 용 (선택)

    private Long movieId;

    // yyyy-MM-dd
    private String displayDate;

    // yyyy-MM-dd HH:mm:ss
    private String startAt;
    private String endAt;

    // OPEN / CLOSED
    private String status;
}
