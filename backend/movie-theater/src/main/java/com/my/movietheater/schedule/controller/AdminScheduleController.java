package com.my.movietheater.schedule.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.my.movietheater.schedule.dto.AdminScheduleCreateRequestDto;
import com.my.movietheater.schedule.dto.AdminScheduleResponseDto;
import com.my.movietheater.schedule.service.AdminScheduleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/schedules")
public class AdminScheduleController {

    private final AdminScheduleService adminScheduleService;

    /**
     * ADMIN : 상영 일정 등록
     */
    @PostMapping
    public void createSchedule(
            @RequestBody @Valid AdminScheduleCreateRequestDto req
    ) {
        adminScheduleService.createSchedule(req);
    }

    /**
     * ADMIN : 날짜별 스케줄 조회 (관리 화면용)
     * 예) GET /api/admin/schedules?date=2026-01-23
     */
    @GetMapping
    public List<AdminScheduleResponseDto> getSchedulesByDate(
            @RequestParam("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return adminScheduleService.getSchedulesByDate(date);
    }

    /**
     * ADMIN : 스케줄 상태 변경 (OPEN / CLOSED)
     */
    @PatchMapping("/{scheduleId}/status")
    public void updateScheduleStatus(
            @PathVariable Long scheduleId,
            @RequestBody UpdateScheduleStatusRequest req
    ) {
        adminScheduleService.updateScheduleStatus(scheduleId, req.getStatus());
    }

    /**
     * 상태 변경 요청 DTO (Controller 내부용)
     */
    static class UpdateScheduleStatusRequest {
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
