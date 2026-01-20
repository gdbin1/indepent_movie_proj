package com.my.movietheater.auth.service;

import org.springframework.stereotype.Service;

import com.my.movietheater.auth.dto.LoginRequestDto;
import com.my.movietheater.auth.dto.LoginResponseDto;
import com.my.movietheater.auth.mapper.AuthMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthMapper authMapper;

    /**
     * ADMIN 로그인 처리 (최소 구현)
     */
    public void adminLogin(LoginRequestDto requestDto) {

        // 1. 이메일로 사용자 조회
        LoginResponseDto user = authMapper.selectUserForLogin(requestDto.getEmail());

        if (user == null) {
            throw new RuntimeException("존재하지 않는 계정입니다.");
        }

        // 2. 비밀번호 비교 (현재는 평문 비교)
        if (!user.getPassword().equals(requestDto.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        // 3. ADMIN 권한 체크
        if (!"ADMIN".equals(user.getRole())) {
            throw new RuntimeException("관리자 권한이 없습니다.");
        }

        // 4. 성공 (토큰/세션 없음)
    }
}
