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

    /**
     * USER : 영화 + 날짜별 상영 일정 조회
     */
    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> getSchedules(Long movieId, String displayDate) {
        return scheduleMapper.selectSchedulesByMovieAndDate(movieId, displayDate);
    }

    /**
     * USER : 상영 일정 단건 조회 (SeatSelect 진입용)
     */
    @Transactional(readOnly = true)
    public ScheduleResponseDto getScheduleDetail(Long scheduleId) {
        return scheduleMapper.selectScheduleById(scheduleId);
    }
}
