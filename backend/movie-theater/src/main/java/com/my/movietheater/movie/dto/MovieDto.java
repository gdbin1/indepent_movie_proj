package com.my.movietheater.movie.dto;

import lombok.Data;

@Data
public class MovieDto {

    private Long movieId;

    private String source;        // KOBIS
    private String movieCd;       // KOBIS movieCd
    private String title;         // movieNm
    private String description;   // null
    private Integer runtimeMin;   // 0
    private String openDate;      // openDt (문자열)
    private String posterUrl;     // null
    private String priceGrade;    // BASIC or DEFAULT
    private Integer isActive;     // 1
}
