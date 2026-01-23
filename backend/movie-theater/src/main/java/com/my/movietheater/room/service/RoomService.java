package com.my.movietheater.room.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.room.dto.RoomResponseDto;
import com.my.movietheater.room.mapper.RoomMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomMapper roomMapper;

    /**
     * USER : 예약 가능한 방 목록 조회
     */
    @Transactional(readOnly = true)
    public List<RoomResponseDto> getAvailableRooms(Long scheduleId, int peopleCount) {
        return roomMapper.selectAvailableRooms(scheduleId, peopleCount);
    }
}
