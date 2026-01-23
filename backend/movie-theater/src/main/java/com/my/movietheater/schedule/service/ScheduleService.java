package com.my.movietheater.schedule.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.schedule.dto.ScheduleResponseDto;
import com.my.movietheater.schedule.mapper.ScheduleMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleMapper scheduleMapper;

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> getSchedules(Long movieId, String displayDate) {
        return scheduleMapper.selectSchedulesByMovieAndDate(movieId, displayDate);
    }
}
