package com.my.movietheater.admin.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.admin.user.dto.AdminUserDto;
import com.my.movietheater.admin.user.dto.RoleUpdateRequest;
import com.my.movietheater.admin.user.service.AdminUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    /**
     * ADMIN 회원 목록 조회
     */
    @GetMapping
    public List<AdminUserDto> getUsers() {
        return adminUserService.getUserList();
    }

    /**
     * 회원 권한 변경
     */
    @PutMapping("/{userId}/role")
    public void updateUserRole(
        @PathVariable Long userId,
        @RequestBody RoleUpdateRequest request
    ) {
        adminUserService.updateUserRole(userId, request.getRole());
    }
}
