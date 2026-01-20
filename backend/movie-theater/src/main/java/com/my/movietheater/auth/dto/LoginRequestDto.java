package com.my.movietheater.auth.dto;

import lombok.Data;

/**
 * ADMIN 로그인 요청 DTO
 */
@Data
public class LoginRequestDto {

    private String email;
    private String password;
}
