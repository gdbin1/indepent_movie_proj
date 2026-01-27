package com.my.movietheater.mypage.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.my.movietheater.mypage.dto.MyPageReservationDto;
import com.my.movietheater.mypage.mapper.MyPageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final MyPageMapper myPageMapper;

    public List<MyPageReservationDto> getMyReservations(Long userId) {
        return myPageMapper.selectMyReservations(userId);
    }
}
