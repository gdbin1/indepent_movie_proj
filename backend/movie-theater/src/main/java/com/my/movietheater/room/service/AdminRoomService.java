package com.my.movietheater.room.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.room.dto.AdminRoomCreateRequestDto;
import com.my.movietheater.room.dto.RoomResponseDto;
import com.my.movietheater.room.mapper.RoomMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminRoomService {

    private final RoomMapper roomMapper;

    // ADMIN : 방 등록
    @Transactional
    public void createRoom(AdminRoomCreateRequestDto dto) {

        if (dto.getCapacityMin() > dto.getCapacityMax()) {
            throw new IllegalArgumentException("최소 인원은 최대 인원보다 클 수 없습니다.");
        }

        roomMapper.insertAdminRoom(dto);
    }

    // ADMIN : 방 목록 조회 (관리 화면용)
    @Transactional(readOnly = true)
    public List<RoomResponseDto> getRooms() {
        return roomMapper.selectAdminRooms();
    }

    // ADMIN : 방 활성/비활성 처리
    @Transactional
    public void updateRoomActive(Long roomId, int isActive) {
        roomMapper.updateRoomActive(roomId, isActive);
    }
}
