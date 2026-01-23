package com.my.movietheater.room.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.room.dto.RoomResponseDto;

@Mapper
public interface RoomMapper {

    List<RoomResponseDto> selectAvailableRooms(
        @Param("scheduleId") Long scheduleId,
        @Param("peopleCount") int peopleCount
    );
}
