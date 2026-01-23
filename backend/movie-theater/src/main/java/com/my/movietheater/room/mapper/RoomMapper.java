package com.my.movietheater.room.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.room.dto.AdminRoomCreateRequestDto;
import com.my.movietheater.room.dto.RoomResponseDto;

@Mapper
public interface RoomMapper {

    /* =========================
       USER
    ========================= */

    /**
     * USER : 인원수 + 스케줄 기준
     * 예약 가능한 방 조회
     */
    List<RoomResponseDto> selectAvailableRooms(
        @Param("scheduleId") Long scheduleId,
        @Param("peopleCount") int peopleCount
    );


    /* =========================
       ADMIN
    ========================= */

    /**
     * ADMIN : 방 등록
     */
    void insertAdminRoom(AdminRoomCreateRequestDto dto);

    /**
     * ADMIN : 방 목록 조회 (관리 화면용)
     */
    List<RoomResponseDto> selectAdminRooms();

    /**
     * ADMIN : 방 활성/비활성 처리
     */
    void updateRoomActive(
        @Param("roomId") Long roomId,
        @Param("isActive") int isActive
    );
}
