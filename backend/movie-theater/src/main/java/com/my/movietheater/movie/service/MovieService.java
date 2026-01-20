package com.my.movietheater.movie.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.movietheater.kobis.dto.WeeklyBoxOfficeDto;
import com.my.movietheater.movie.dto.AdminMovieDto;
import com.my.movietheater.movie.dto.MovieDto;
import com.my.movietheater.movie.mapper.MovieMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieMapper movieMapper;
    
    /**
     * USER - 현재 상영 중 영화 목록 조회
     * is_active = 1 인 영화만 반환 (PREMIUM)
     */
    @Transactional(readOnly = true)
    public List<MovieDto> getActiveMovies() {
        return movieMapper.selectActiveMovies();
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
     * - 최초 저장 시 is_active = 1 (상영/노출 ON)
     * - 이미 존재하면 기본 정보만 업데이트
     */
    @Transactional
    public void saveMoviesFromBoxOffice(List<WeeklyBoxOfficeDto> boxOfficeList) {

        for (WeeklyBoxOfficeDto dto : boxOfficeList) {

            MovieDto movie = new MovieDto();
            movie.setSource("KOBIS");
            movie.setMovieCd(dto.getMovieCd());
            movie.setTitle(dto.getMovieNm());
            movie.setOpenDate(dto.getOpenDt());

            // 초기값 (운영 단계에서 ADMIN이 수정 가능)
            movie.setDescription(null);
            movie.setRuntimeMin(0);
            movie.setPosterUrl(null);
            movie.setPriceGrade("PREMIUM");

            // ⭐ 중요: 상영/노출 여부
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
