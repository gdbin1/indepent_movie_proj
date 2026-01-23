package com.my.movietheater.room.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

/**
 * ADMIN 방 등록 DTO
 */
@Getter
@Setter
public class AdminRoomCreateRequestDto {

    // 관리자용 방 코드 (UNIQUE)
    @NotBlank
    private String roomCode;

    // 사용자 노출 방 이름
    @NotBlank
    private String roomName;

    // 방 타입 (COUPLE / FAMILY 등)
    @NotBlank
    private String roomType;

    // 테마
    private String theme;

    // 방 설명
    private String description;

    // 이미지 URL
    private String imageUrl;

    // 최소 수용 인원
    @NotNull
    @Min(1)
    private Integer capacityMin;

    // 최대 수용 인원
    @NotNull
    @Min(1)
    private Integer capacityMax;

    // 기본 가격
    @NotNull
    @Min(0)
    private Integer basePrice;
}
