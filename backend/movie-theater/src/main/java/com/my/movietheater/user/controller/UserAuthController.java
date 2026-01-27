package com.my.movietheater.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.my.movietheater.user.dto.LoginRequest;
import com.my.movietheater.user.dto.SignupRequest;
import com.my.movietheater.user.dto.UserDto;
import com.my.movietheater.user.service.UserAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserAuthController {

    private final UserAuthService authService;

    /**
     * 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        UserDto user = authService.login(request);

        if (user == null) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return ResponseEntity.ok(user);
    }

    /**
     * 회원가입 (USER)
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {

        try {
            authService.signup(request);
            return ResponseEntity.ok("회원가입 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("회원가입 처리 중 오류가 발생했습니다.");
        }
    }
}
