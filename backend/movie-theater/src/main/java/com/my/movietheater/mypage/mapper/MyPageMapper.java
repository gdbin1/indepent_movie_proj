// src/main/java/com/my/movietheater/mypage/mapper/MyPageMapper.java
package com.my.movietheater.mypage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.mypage.dto.MyPageReservationDto;

@Mapper
public interface MyPageMapper {

    List<MyPageReservationDto> selectMyReservations(@Param("userId") Long userId);
}
