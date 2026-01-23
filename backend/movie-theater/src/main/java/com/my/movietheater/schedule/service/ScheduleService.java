package com.my.movietheater.schedule.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.schedule.dto.ScheduleCreateRequestDto;
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
     * ADMIN : 상영 일정 등록
     */
    @Transactional
    public void createSchedule(ScheduleCreateRequestDto dto) {
        // 기본 상태 세팅
        if (dto.getStatus() == null || dto.getStatus().isBlank()) {
            dto.setStatus("OPEN");
        }

        scheduleMapper.insertSchedule(dto);
    }
    
    @Transactional(readOnly = true)
    public ScheduleResponseDto getScheduleDetail(Long scheduleId) {
        return scheduleMapper.selectScheduleById(scheduleId);
    }

}
