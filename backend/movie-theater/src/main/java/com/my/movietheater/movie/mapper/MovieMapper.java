package com.my.movietheater.movie.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.movie.dto.AdminMovieDto;
import com.my.movietheater.movie.dto.MovieDto;

@Mapper
public interface MovieMapper {

    int existsByMovieCd(String movieCd);

    void insertMovie(MovieDto movie);

    void updateMovieByMovieCd(MovieDto movie);

    /**
     * ADMIN - 영화 전체 목록 조회
     */
    List<AdminMovieDto> selectAllMoviesForAdmin();

    /**
     * ADMIN - 상영(노출) 여부 토글
     */
    int updateMovieActive(
            @Param("movieId") Long movieId,
            @Param("isActive") int isActive
    );

    /**
     * USER - 현재 상영 중 영화 목록 조회 (PREMIUM)
     */
    List<MovieDto> selectActiveMovies();

    /**
     * USER - 영화 상세 조회
     */
    MovieDto selectMovieById(Long movieId);
}
