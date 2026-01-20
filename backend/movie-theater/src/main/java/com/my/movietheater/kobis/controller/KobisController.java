package com.my.movietheater.kobis.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.kobis.dto.WeeklyBoxOfficeDto;
import com.my.movietheater.kobis.service.KobisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/kobis")
@RequiredArgsConstructor
public class KobisController {

    private final KobisService kobisService;

    /**
     * 주간 박스오피스 조회
     * @param targetDt yyyyMMdd
     */
    @GetMapping("/weekly")
    public List<WeeklyBoxOfficeDto> getWeeklyBoxOffice(
            @RequestParam String targetDt
    ) {
        return kobisService.getWeeklyBoxOfficeList(targetDt);
    }
}
