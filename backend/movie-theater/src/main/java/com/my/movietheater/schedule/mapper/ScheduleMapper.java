package com.my.movietheater.schedule.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.schedule.dto.ScheduleResponseDto;

@Mapper
public interface ScheduleMapper {

    List<ScheduleResponseDto> selectSchedulesByMovieAndDate(
        @Param("movieId") Long movieId,
        @Param("displayDate") String displayDate
    );
}
