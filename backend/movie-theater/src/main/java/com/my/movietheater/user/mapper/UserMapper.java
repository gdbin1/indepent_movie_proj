package com.my.movietheater.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.user.dto.UserDto;

@Mapper
public interface UserMapper {

    /**
     * 이메일로 사용자 조회 (로그인용)
     */
    UserDto findByEmail(@Param("email") String email);

    /**
     * 이메일 중복 체크
     */
    int countByEmail(@Param("email") String email);

    /**
     * 회원 생성
     */
    void insertUser(UserDto user);
}
