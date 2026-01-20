package com.my.movietheater.auth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.auth.dto.LoginResponseDto;

@Mapper
public interface AuthMapper {

    LoginResponseDto selectUserForLogin(@Param("email") String email);
}
