package com.my.movietheater.admin.user.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.my.movietheater.admin.user.dto.AdminUserDto;
import com.my.movietheater.admin.user.mapper.AdminUserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final AdminUserMapper adminUserMapper;

    /**
     * ADMIN 회원 목록 조회
     */
    public List<AdminUserDto> getUserList() {
        return adminUserMapper.selectUserList();
    }

    /**
     * 회원 권한 변경
     */
    public void updateUserRole(Long userId, String role) {

        // 허용된 role만 처리
        if (!"USER".equals(role) && !"ADMIN".equals(role)) {
            throw new IllegalArgumentException("잘못된 권한 값입니다.");
        }

        adminUserMapper.updateUserRole(userId, role);
    }
}
