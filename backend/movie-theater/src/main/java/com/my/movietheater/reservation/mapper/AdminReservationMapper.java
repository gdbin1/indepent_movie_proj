package com.my.movietheater.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.movietheater.reservation.dto.AdminReservationListDto;

@Mapper
public interface AdminReservationMapper {

    List<AdminReservationListDto> selectAdminReservationList(
            @Param("status") String status,           // null 가능
            @Param("keyword") String keyword,         // null/"" 가능 (예약번호/이메일/이름/전화)
            @Param("dateFrom") String dateFrom,       // "YYYY-MM-DD" (null 가능)
            @Param("dateTo") String dateTo,           // "YYYY-MM-DD" (null 가능)
            @Param("limit") int limit,
            @Param("offset") int offset
    );

    int countAdminReservationList(
            @Param("status") String status,
            @Param("keyword") String keyword,
            @Param("dateFrom") String dateFrom,
            @Param("dateTo") String dateTo
    );
    
	String selectReservationStatusById(@Param("reservationId") Long reservationId);

	int cancelReservationByAdmin(@Param("reservationId") Long reservationId);
}
