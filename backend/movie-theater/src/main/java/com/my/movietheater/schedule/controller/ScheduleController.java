package com.my.movietheater.schedule.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.schedule.dto.ScheduleResponseDto;
import com.my.movietheater.schedule.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ScheduleController {
	
	private final ScheduleService scheduleService;


    @GetMapping("/api/schedules")
    public List<ScheduleResponseDto> getSchedules(
        @RequestParam Long movieId,
        @RequestParam String date   // yyyy-MM-dd
    ) {
        return scheduleService.getSchedules(movieId, date);
    }
}
