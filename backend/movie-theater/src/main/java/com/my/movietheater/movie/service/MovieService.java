package com.my.movietheater.movie.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.kobis.dto.WeeklyBoxOfficeDto;
import com.my.movietheater.movie.dto.AdminMovieCreateRequest;
import com.my.movietheater.movie.dto.AdminMovieDto;
import com.my.movietheater.movie.dto.MovieDto;
import com.my.movietheater.movie.mapper.MovieMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieMapper movieMapper;

    /**
     * USER - 현재 상영 중 영화 전체 조회
     * is_active = 1
     */
    @Transactional(readOnly = true)
    public List<MovieDto> getActiveMovies() {
        return movieMapper.selectActiveMovies();
    }

    /**
     * ✅ USER - 현재 상영 중 영화 (등급별)
     * is_active = 1
     * price_grade = BASIC / PREMIUM
     */
    @Transactional(readOnly = true)
    public List<MovieDto> getActiveMoviesByGrade(String priceGrade) {
        return movieMapper.selectActiveMoviesByGrade(priceGrade);
    }

    /**
     * USER - 영화 상세 조회
     */
    @Transactional(readOnly = true)
    public MovieDto getMovieDetail(Long movieId) {
        return movieMapper.selectMovieById(movieId);
    }

    /**
     * KOBIS 박스오피스 → movie 테이블 저장
     * - ADMIN 전용
     * - price_grade = PREMIUM
     * - 최초 저장 시 is_active = 1
     */
    @Transactional
    public void saveMoviesFromBoxOffice(List<WeeklyBoxOfficeDto> boxOfficeList) {

        for (WeeklyBoxOfficeDto dto : boxOfficeList) {

            MovieDto movie = new MovieDto();
            movie.setSource("KOBIS");
            movie.setMovieCd(dto.getMovieCd());
            movie.setTitle(dto.getMovieNm());
            movie.setOpenDate(dto.getOpenDt());

            movie.setDescription(null);
            movie.setRuntimeMin(0);
            movie.setPosterUrl(null);
            movie.setPriceGrade("PREMIUM");
            movie.setIsActive(1);

            int exists = movieMapper.existsByMovieCd(dto.getMovieCd());

            if (exists == 0) {
                movieMapper.insertMovie(movie);
            } else {
                movieMapper.updateMovieByMovieCd(movie);
            }
        }
    }

    /**
     * ADMIN - 수동 영화 등록 (BASIC)
     */
    @Transactional
    public void createBasicMovie(AdminMovieCreateRequest request) {

        MovieDto movie = new MovieDto();
        movie.setSource("ADMIN");
        movie.setMovieCd(null);
        movie.setTitle(request.getTitle());
        movie.setDescription(request.getDescription());
        movie.setRuntimeMin(request.getRuntimeMin());
        movie.setOpenDate(request.getOpenDate());
        movie.setPosterUrl(request.getPosterUrl());
        movie.setPriceGrade("BASIC");
        movie.setIsActive(1);

        movieMapper.insertMovie(movie);
    }

    /**
     * ADMIN - movie 전체 목록 조회
     */
    @Transactional(readOnly = true)
    public List<AdminMovieDto> getAllMoviesForAdmin() {
        return movieMapper.selectAllMoviesForAdmin();
    }

    /**
     * ADMIN - 상영(노출) 여부 토글
     */
    @Transactional
    public void updateMovieActive(Long movieId, boolean isActive) {
        int activeValue = isActive ? 1 : 0;
        movieMapper.updateMovieActive(movieId, activeValue);
    }
}
