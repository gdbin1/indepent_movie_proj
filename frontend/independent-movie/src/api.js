import axios from "axios";

/**
 * 공통 API 인스턴스
 * - Vite proxy 설정으로 /api → localhost:8080
 */
const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

export default api;
