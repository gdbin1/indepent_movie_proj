package com.my.movietheater.schedule.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.schedule.dto.ScheduleCreateRequestDto;
import com.my.movietheater.schedule.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/schedules")
public class AdminScheduleController {

    private final ScheduleService scheduleService;

    /**
     * ADMIN : 상영 일정 등록
     */
    @PostMapping
    public void createSchedule(@RequestBody ScheduleCreateRequestDto dto) {
        scheduleService.createSchedule(dto);
    }
}
