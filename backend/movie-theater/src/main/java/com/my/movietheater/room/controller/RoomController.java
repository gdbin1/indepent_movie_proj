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
     * SeatSelect 진입용
     * scheduleId + peopleCount 기준
     */
    @GetMapping("/api/rooms/available")
    public List<RoomResponseDto> getAvailableRooms(
            @RequestParam Long scheduleId,
            @RequestParam int peopleCount
    ) {
        return roomService.getAvailableRooms(scheduleId, peopleCount);
    }
}
