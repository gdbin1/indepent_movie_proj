package com.my.movietheater.auth.dto;

import lombok.Data;

/**
 * ADMIN 로그인 DB 조회 결과 DTO
 */
@Data
public class LoginResponseDto {

    private Long userId;
    private String email;
    private String password;
    private String role;
}
