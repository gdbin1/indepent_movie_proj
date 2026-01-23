package com.my.movietheater.schedule.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.movie.mapper.MovieMapper;
import com.my.movietheater.schedule.dto.AdminScheduleCreateRequestDto;
import com.my.movietheater.schedule.dto.AdminScheduleResponseDto;
import com.my.movietheater.schedule.mapper.ScheduleMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminScheduleService {

    private final ScheduleMapper scheduleMapper;
    private final MovieMapper movieMapper;

    /**
     * ADMIN 스케줄 생성
     * - 종료시간 = 시작시간 + 영화 러닝타임
     * - 같은 방 + 같은 시작시간 중복 차단
     */
    @Transactional
    public Long createSchedule(AdminScheduleCreateRequestDto req) {

        int runtimeMin = movieMapper.selectRuntimeMinByMovieId(req.getMovieId());
        if (runtimeMin <= 0) {
            throw new IllegalArgumentException("영화 러닝타임이 올바르지 않습니다.");
        }

        LocalDateTime startAt =
                req.getDisplayDate().atTime(req.getStartTime());
        LocalDateTime endAt =
                startAt.plusMinutes(runtimeMin);

        int exists =
                scheduleMapper.existsByRoomAndStartAt(req.getRoomId(), startAt);
        if (exists > 0) {
            throw new IllegalStateException("이미 같은 방에 동일한 시작 시간의 스케줄이 존재합니다.");
        }

        scheduleMapper.insertAdminSchedule(
                req.getMovieId(),
                req.getRoomId(),
                startAt,
                endAt,
                req.getDisplayDate()
        );

        return 1L; // 필요 시 generated key 반환 구조로 변경 가능
    }

    /**
     * ADMIN : 날짜별 스케줄 조회 (관리 화면용)
     */
    @Transactional(readOnly = true)
    public List<AdminScheduleResponseDto> getSchedulesByDate(LocalDate displayDate) {
        return scheduleMapper.selectAdminSchedulesByDate(displayDate);
    }

    /**
     * ADMIN : 스케줄 상태 변경
     */
    @Transactional
    public void updateScheduleStatus(Long scheduleId, String status) {

        if (!"OPEN".equals(status) && !"CLOSED".equals(status)) {
            throw new IllegalArgumentException("유효하지 않은 스케줄 상태입니다.");
        }

        scheduleMapper.updateScheduleStatus(scheduleId, status);
    }
}
