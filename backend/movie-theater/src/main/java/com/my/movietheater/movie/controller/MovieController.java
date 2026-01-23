package com.my.movietheater.movie.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.movietheater.movie.dto.MovieDto;
import com.my.movietheater.movie.service.MovieService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    /**
     * USER - 현재 상영 중 영화 목록 조회
     * is_active = 1 인 영화만 반환 (PREMIUM)
     */
    @GetMapping("/active")
    public List<MovieDto> getActiveMovies() {
        return movieService.getActiveMovies();
    }

    /**
     * USER - 영화 상세 조회
     * BoxOffice(PREMIUM) / 일반 영화 공통
     */
    @GetMapping("/{movieId}")
    public MovieDto getMovieDetail(
            @PathVariable("movieId") Long movieId
    ) {
        return movieService.getMovieDetail(movieId);
    }
    
    /**
     * USER - 현재 상영 중 BASIC 영화
     */
    @GetMapping("/active/basic")
    public List<MovieDto> getActiveBasicMovies() {
        return movieService.getActiveMoviesByGrade("BASIC");
    }

    /**
     * USER - 현재 상영 중 PREMIUM 영화
     */
    @GetMapping("/active/premium")
    public List<MovieDto> getActivePremiumMovies() {
        return movieService.getActiveMoviesByGrade("PREMIUM");
    }

    
    
}
