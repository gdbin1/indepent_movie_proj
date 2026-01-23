package com.my.movietheater.schedule.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    		 @RequestParam(name = "movieId") Long movieId,
    	     @RequestParam(name = "date") String date
    ) {
        return scheduleService.getSchedules(movieId, date);
    }
    
    @GetMapping("/api/schedules/{scheduleId}")
    public ScheduleResponseDto getScheduleDetail(
    		@PathVariable("scheduleId") Long scheduleId
    ) {
        return scheduleService.getScheduleDetail(scheduleId);
    }

}
