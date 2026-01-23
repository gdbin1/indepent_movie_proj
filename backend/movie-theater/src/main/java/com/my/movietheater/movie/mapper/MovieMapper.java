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
     * ✅ ADMIN - 영화 수정 (runtime / description / poster / grade)
     */
    int updateMovieForAdmin(MovieDto movie);

    /**
     * ✅ ADMIN - 영화 삭제 (BASIC만 가능, PREMIUM은 Service에서 차단)
     */
    int deleteMovie(@Param("movieId") Long movieId);

    /**
     * USER - 현재 상영 중 영화 목록 조회
     */
    List<MovieDto> selectActiveMovies();

    /**
     * USER - 현재 상영 중 영화 목록 조회 (등급별)
     */
    List<MovieDto> selectActiveMoviesByGrade(
            @Param("priceGrade") String priceGrade
    );

    /**
     * USER - 영화 상세 조회
     */
    MovieDto selectMovieById(Long movieId);

    /**
     * 러닝타임 조회 (Schedule 검증용)
     */
    int selectRuntimeMinByMovieId(Long movieId);
}
