package com.my.movietheater.user.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.my.movietheater.user.dto.LoginRequest;
import com.my.movietheater.user.dto.SignupRequest;
import com.my.movietheater.user.dto.UserDto;
import com.my.movietheater.user.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAuthService {

    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 로그인
     */
    public UserDto login(LoginRequest request) {

        UserDto user = userMapper.findByEmail(request.getEmail());
        if (user == null) {
            return null;
        }

        // 비밀번호 검증
        boolean match = passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
        );

        if (!match) {
            return null;
        }

        // 🔥 보안: 비밀번호 제거
        user.setPassword(null);
        return user;
    }

    /**
     * 회원가입 (USER 전용)
     */
    public void signup(SignupRequest request) {

        int exists = userMapper.countByEmail(request.getEmail());
        if (exists > 0) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        UserDto user = new UserDto();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setPhone(request.getPhone());   // 🔥 이 줄 추가
        user.setRole("USER");

        userMapper.insertUser(user);
    }

}
