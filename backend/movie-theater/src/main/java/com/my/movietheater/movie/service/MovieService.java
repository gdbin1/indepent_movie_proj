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

    /* ==================================================
     * USER
     * ================================================== */

    /**
     * USER - 현재 상영 중 영화 전체 조회
     * is_active = 1
     */
    @Transactional(readOnly = true)
    public List<MovieDto> getActiveMovies() {
        return movieMapper.selectActiveMovies();
    }

    /**
     * USER - 현재 상영 중 영화 (등급별)
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

    /* ==================================================
     * KOBIS
     * ================================================== */

    /**
     * KOBIS 박스오피스 → movie 테이블 저장
     * - PREMIUM
     * - 최초 저장 시 DRAFT 상태 (is_active = 0)
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
            movie.setIsActive(0); // ⭐ DRAFT 상태

            int exists = movieMapper.existsByMovieCd(dto.getMovieCd());

            if (exists == 0) {
                movieMapper.insertMovie(movie);
            } else {
                movieMapper.updateMovieByMovieCd(movie);
            }
        }
    }

    /* ==================================================
     * ADMIN
     * ================================================== */

    /**
     * ADMIN - 수동 영화 등록 (BASIC)
     */
    @Transactional
    public void createBasicMovie(AdminMovieCreateRequest request) {

        if (request.getRuntimeMin() == null || request.getRuntimeMin() <= 0) {
            throw new IllegalArgumentException("러닝타임은 필수입니다.");
        }

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

        MovieDto movie = movieMapper.selectMovieById(movieId);
        if (movie == null) {
            throw new IllegalArgumentException("존재하지 않는 영화입니다.");
        }

        // ⭐ 상영 시작 시 러닝타임 검증
        if (isActive && (movie.getRuntimeMin() == null || movie.getRuntimeMin() <= 0)) {
            throw new IllegalStateException("러닝타임이 없는 영화는 상영할 수 없습니다.");
        }

        movieMapper.updateMovieActive(movieId, isActive ? 1 : 0);
    }

    /**
     * ✅ ADMIN - 영화 수정 (핵심)
     */
    @Transactional
    public void updateMovieForAdmin(MovieDto request) {

        if (request.getMovieId() == null) {
            throw new IllegalArgumentException("movieId는 필수입니다.");
        }

        if (request.getRuntimeMin() == null || request.getRuntimeMin() <= 0) {
            throw new IllegalArgumentException("러닝타임은 1분 이상이어야 합니다.");
        }

        MovieDto origin = movieMapper.selectMovieById(request.getMovieId());
        if (origin == null) {
            throw new IllegalArgumentException("존재하지 않는 영화입니다.");
        }

        movieMapper.updateMovieForAdmin(request);
    }

    /**
     * ADMIN - 영화 삭제
     * - BASIC : 삭제 가능
     * - PREMIUM : 삭제 불가
     */
    @Transactional
    public void deleteMovie(Long movieId) {

        MovieDto movie = movieMapper.selectMovieById(movieId);

        if (movie == null) {
            throw new IllegalArgumentException("존재하지 않는 영화입니다.");
        }

        if ("PREMIUM".equals(movie.getPriceGrade())) {
            throw new IllegalStateException("PREMIUM 영화는 삭제할 수 없습니다.");
        }

        movieMapper.deleteMovie(movieId);
    }
}
