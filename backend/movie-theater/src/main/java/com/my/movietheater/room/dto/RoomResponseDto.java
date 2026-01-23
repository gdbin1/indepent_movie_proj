package com.my.movietheater.room.dto;

import lombok.Data;

@Data
public class RoomResponseDto {

    private Long roomId;
    private String roomCode;
    private String roomName;
    private String roomType;

    private String theme;
    private String description;
    private String imageUrl;

    private int capacityMin;
    private int capacityMax;

    private int basePrice;
}
