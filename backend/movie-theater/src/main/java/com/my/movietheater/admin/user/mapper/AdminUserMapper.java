package com.my.movietheater.admin.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.admin.user.dto.AdminUserDto;

@Mapper
public interface AdminUserMapper {

    /**
     * ADMIN 회원 목록 조회
     */
    List<AdminUserDto> selectUserList();

    /**
     * 회원 권한 변경
     */
    int updateUserRole(
        @Param("userId") Long userId,
        @Param("role") String role
    );
}
