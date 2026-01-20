package com.my.movietheater.kobis.dto;

import lombok.Data;

@Data
public class WeeklyBoxOfficeDto {

    private String rnum;            // 순번
    private String rank;            // 순위
    private String rankInten;       // 전일 대비 순위 증감
    private String rankOldAndNew;   // NEW / OLD

    private String movieCd;         // 영화 코드
    private String movieNm;         // 영화명
    private String openDt;          // 개봉일

    private String salesAmt;        // 매출액
    private String salesShare;      // 매출 비율
    private String salesInten;      // 매출 증감분
    private String salesChange;     // 매출 증감률
    private String salesAcc;        // 누적 매출액

    private String audiCnt;         // 관객수
    private String audiInten;       // 관객 증감분
    private String audiChange;      // 관객 증감률
    private String audiAcc;         // 누적 관객수

    private String scrnCnt;         // 스크린 수
    private String showCnt;         // 상영 횟수
}
