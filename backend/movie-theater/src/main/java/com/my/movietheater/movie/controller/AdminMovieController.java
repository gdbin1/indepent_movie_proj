package com.my.movietheater.movie.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.my.movietheater.kobis.dto.WeeklyBoxOfficeDto;
import com.my.movietheater.kobis.service.KobisService;
import com.my.movietheater.movie.dto.AdminMovieCreateRequest;
import com.my.movietheater.movie.dto.AdminMovieDto;
import com.my.movietheater.movie.service.MovieService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/movie")
@RequiredArgsConstructor
public class AdminMovieController {

    private final KobisService kobisService;
    private final MovieService movieService;

    /**
     * KOBIS 박스오피스 영화 저장 (PREMIUM)
     * POST /api/admin/movie/boxoffice
     */
    @PostMapping("/boxoffice")
    public String saveBoxOfficeToMovieTable(@RequestParam("targetDt") String targetDt) {

        List<WeeklyBoxOfficeDto> boxOfficeList = kobisService.getWeeklyBoxOfficeList(targetDt);

        movieService.saveMoviesFromBoxOffice(boxOfficeList);

        return "KOBIS 박스오피스 → movie 테이블 저장 완료";
    }

    /**
     * ADMIN 수동 영화 등록 (BASIC)
     * POST /api/admin/movie
     */
    @PostMapping
    public String createMovie(@RequestBody AdminMovieCreateRequest request) {
        movieService.createBasicMovie(request);
        return "ADMIN 영화(BASIC) 등록 완료";
    }

    /**
     * movie 전체 목록 조회 (ADMIN)
     * GET /api/admin/movie
     */
    @GetMapping
    public List<AdminMovieDto> getAllMovies() {
        return movieService.getAllMoviesForAdmin();
    }

    /**
     * 상영(노출) 여부 토글 (ADMIN)
     * PATCH /api/admin/movie/{movieId}/active?isActive=true|false
     */
    @PatchMapping("/{movieId}/active")
    public String updateActive(
            @PathVariable("movieId") Long movieId,
            @RequestParam("isActive") boolean isActive
    ) {
        movieService.updateMovieActive(movieId, isActive);
        return isActive ? "상영(노출) ON" : "상영(노출) OFF";
    }
}
