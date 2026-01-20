package com.my.movietheater.movie.dto;

import lombok.Data;

@Data
public class AdminMovieDto {
    private Long movieId;
    private String source;
    private String movieCd;
    private String title;
    private String openDate;
    private Integer runtimeMin;
    private String posterUrl;
    private String priceGrade;
    private Integer isActive; // 1/0
}
