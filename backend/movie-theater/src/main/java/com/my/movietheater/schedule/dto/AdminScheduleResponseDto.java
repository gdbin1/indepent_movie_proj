package com.my.movietheater.schedule.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminScheduleResponseDto {

    private Long scheduleId;

    private Long movieId;
    private String movieTitle;

    private Long roomId;
    private String roomName;

    // "14:00" 형태 (Mapper.xml에서 DATE_FORMAT으로 내려옴)
    private String startTime;
    private String endTime;

    // "OPEN" / "CLOSED"
    private String status;
}
