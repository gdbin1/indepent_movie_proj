package com.my.movietheater.room.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.room.dto.RoomResponseDto;
import com.my.movietheater.room.service.RoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    /**
     * USER : SeatSelect 진입용
     * scheduleId + peopleCount 기준
     */
    @GetMapping("/api/rooms/available")
    public List<RoomResponseDto> getAvailableRooms(
            @RequestParam("scheduleId") Long scheduleId,
            @RequestParam("peopleCount") int peopleCount
    ) {
        return roomService.getAvailableRooms(scheduleId, peopleCount);
    }

    /**
     * USER / ADMIN : 활성화된 방 전체 목록
     * (스케줄 생성, 방 선택용)
     */
    @GetMapping("/api/rooms")
    public List<RoomResponseDto> getActiveRooms() {
        return roomService.getActiveRooms();
    }
}
