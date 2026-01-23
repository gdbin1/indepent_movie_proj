package com.my.movietheater.room.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.my.movietheater.room.dto.AdminRoomCreateRequestDto;
import com.my.movietheater.room.dto.RoomResponseDto;
import com.my.movietheater.room.service.AdminRoomService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/rooms")
public class AdminRoomController {

    private final AdminRoomService adminRoomService;

    // ADMIN : 방 등록
    @PostMapping
    public void createRoom(
            @RequestBody @Valid AdminRoomCreateRequestDto dto
    ) {
        adminRoomService.createRoom(dto);
    }

    // ADMIN : 방 목록 조회 (관리 화면용)
    @GetMapping
    public List<RoomResponseDto> getRooms() {
        return adminRoomService.getRooms();
    }

    // ADMIN : 방 활성/비활성 처리
    @PatchMapping("/{roomId}/active")
    public void updateRoomActive(
            @PathVariable("roomId") Long roomId,
            @RequestParam("isActive") int isActive
    ) {
        adminRoomService.updateRoomActive(roomId, isActive);
    }

}
