package com.my.movietheater.movie.dto;

import lombok.Data;

/**
 * ADMIN 수동 영화 등록 요청 DTO
 * - BASIC 영화 전용
 * - priceGrade, source, isActive는 서버에서 고정 처리
 */
@Data
public class AdminMovieCreateRequest {

    /** 영화 제목 */
    private String title;

    /** 영화 설명 */
    private String description;

    /** 상영 시간 (분) */
    private Integer runtimeMin;

    /** 개봉일 (yyyy-MM-dd) */
    private String openDate;

    /** 포스터 이미지 URL */
    private String posterUrl;
}
