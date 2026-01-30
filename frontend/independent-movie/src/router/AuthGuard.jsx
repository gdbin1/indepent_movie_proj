import { Navigate, Outlet } from "react-router-dom";

/**
 * ADMIN 전용 가드
 * - ADMIN만 통과
 * - USER / 비로그인 모두 차단
 */
export function AdminGuard() {
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
