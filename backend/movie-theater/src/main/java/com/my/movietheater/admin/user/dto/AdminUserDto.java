package com.my.movietheater.admin.user.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserDto {

    private Long userId;
    private String email;
    private String name;
    private String phone;
    private String role;
    private LocalDateTime createdAt;
}
