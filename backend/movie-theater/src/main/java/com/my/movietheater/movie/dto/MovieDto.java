package com.my.movietheater.movie.dto;

import lombok.Data;

@Data
public class MovieDto {

    private Long movieId;

    private String source;        // KOBIS / ADMIN
    private String movieCd;       // KOBIS movieCd
    private String title;         // 영화 제목

    /* ===== 수정 대상 ===== */
    private String description;   // 영화 설명
    private Integer runtimeMin;   // 러닝타임 (분) ⭐ 필수
    private String posterUrl;     // 포스터 URL

    /* ===== 기타 ===== */
    private String openDate;      // 개봉일 (yyyy-MM-dd)
    private String priceGrade;    // PREMIUM / BASIC
    private Integer isActive;     // 0: 비활성 / 1: 활성
}
