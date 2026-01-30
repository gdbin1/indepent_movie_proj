package com.my.movietheater.user.dto;

import lombok.Data;

@Data
public class UserDto {

    private Long userId;
    private String email;
    private String password;
    private String name;
    private String role; // USER / ADMIN
    private String phone;
    
}
