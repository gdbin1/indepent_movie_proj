// src/main/java/com/my/movietheater/mypage/controller/MyPageController.java
package com.my.movietheater.mypage.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.mypage.dto.MyPageReservationDto;
import com.my.movietheater.mypage.service.MyPageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {

    private final MyPageService myPageService;

    /**
     * 마이페이지 - 내 예약 목록 조회
     * 예: GET /api/mypage/reservations?userId=1
     */
    @GetMapping("/reservations")
    public List<MyPageReservationDto> getMyReservations(@RequestParam("userId") Long userId) {
        return myPageService.getMyReservations(userId);
    }
}
