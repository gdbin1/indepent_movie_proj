package com.my.movietheater.schedule.mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.schedule.dto.AdminScheduleResponseDto;
import com.my.movietheater.schedule.dto.ScheduleResponseDto;

@Mapper
public interface ScheduleMapper {

    /* =========================
       USER
    ========================= */

    /**
     * USER : 영화 + 날짜별 시간표 조회
     */
    List<ScheduleResponseDto> selectSchedulesByMovieAndDate(
        @Param("movieId") Long movieId,
        @Param("displayDate") String displayDate
    );

    /**
     * USER : 시간 슬롯 단건 조회
     */
    ScheduleResponseDto selectScheduleById(
        @Param("scheduleId") Long scheduleId
    );


    /* =========================
       ADMIN
    ========================= */

    /**
     * ADMIN : 같은 방 + 같은 시작 시간 중복 체크
     */
    int existsByRoomAndStartAt(
        @Param("roomId") Long roomId,
        @Param("startAt") LocalDateTime startAt
    );

    /**
     * ADMIN : 스케줄 생성
     */
    void insertAdminSchedule(
        @Param("movieId") Long movieId,
        @Param("roomId") Long roomId,
        @Param("startAt") LocalDateTime startAt,
        @Param("endAt") LocalDateTime endAt,
        @Param("displayDate") LocalDate displayDate
    );

    /**
     * ADMIN : 날짜별 스케줄 조회 (관리 화면용)
     */
    List<AdminScheduleResponseDto> selectAdminSchedulesByDate(
        @Param("displayDate") LocalDate displayDate
    );

    /**
     * ADMIN : 스케줄 상태 변경
     */
    void updateScheduleStatus(
        @Param("scheduleId") Long scheduleId,
        @Param("status") String status
    );
}
