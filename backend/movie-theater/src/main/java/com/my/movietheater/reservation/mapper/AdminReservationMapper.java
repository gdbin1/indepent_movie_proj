package com.my.movietheater.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.reservation.dto.AdminReservationListDto;

@Mapper
public interface AdminReservationMapper {

    List<AdminReservationListDto> selectAdminReservationList(
            @Param("date") String date,
            @Param("status") String status,
            @Param("keyword") String keyword,
            @Param("limit") int limit,
            @Param("offset") int offset
    );

    int countAdminReservationList(
            @Param("date") String date,
            @Param("status") String status,
            @Param("keyword") String keyword
    );

    String selectReservationStatusById(@Param("reservationId") Long reservationId);

    int cancelReservationByAdmin(@Param("reservationId") Long reservationId);
}
