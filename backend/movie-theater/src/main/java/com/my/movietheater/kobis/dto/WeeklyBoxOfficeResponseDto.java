package com.my.movietheater.kobis.dto;

import lombok.Data;

@Data
public class WeeklyBoxOfficeResponseDto {

    private BoxOfficeResult boxOfficeResult;

    @Data
    public static class BoxOfficeResult {
        private String boxofficeType;
        private String showRange;
        private String yearWeekTime;
        private java.util.List<WeeklyBoxOfficeDto> weeklyBoxOfficeList;
    }
}
