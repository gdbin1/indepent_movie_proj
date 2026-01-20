package com.my.movietheater.kobis.service;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.my.movietheater.kobis.dto.WeeklyBoxOfficeDto;
import com.my.movietheater.kobis.dto.WeeklyBoxOfficeResponseDto;

@Service
public class KobisService {

    @Value("${kobis.api.key}")
    private String apiKey;

    @Value("${kobis.api.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 주간 박스오피스 조회
     * @param targetDt yyyyMMdd
     * @return 주간 박스오피스 리스트
     */
    public List<WeeklyBoxOfficeDto> getWeeklyBoxOfficeList(String targetDt) {

        try {
            String url = baseUrl
                    + "/boxoffice/searchWeeklyBoxOfficeList.json"
                    + "?key=" + apiKey
                    + "&targetDt=" + targetDt
                    + "&weekGb=0";

            // 1. KOBIS API 호출 (JSON 문자열)
            String json = restTemplate.getForObject(URI.create(url), String.class);

            // 2. JSON → DTO 변환
            WeeklyBoxOfficeResponseDto response =
                    objectMapper.readValue(json, WeeklyBoxOfficeResponseDto.class);

            // 3. 실제 박스오피스 리스트 반환
            return response
                    .getBoxOfficeResult()
                    .getWeeklyBoxOfficeList();

        } catch (Exception e) {
            throw new RuntimeException("KOBIS 박스오피스 조회 실패", e);
        }
    }
}
