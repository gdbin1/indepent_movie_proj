package com.my.movietheater.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.my.movietheater.auth.dto.LoginRequestDto;
import com.my.movietheater.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * ADMIN 로그인 (최소 구현)
     */
    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequestDto requestDto) {

        authService.adminLogin(requestDto);

        // 토큰/세션 없이 성공 여부만 반환
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("ADMIN 로그인 성공");
    }
}
