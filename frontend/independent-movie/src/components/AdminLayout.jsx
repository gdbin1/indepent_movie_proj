import { Outlet, NavLink, Navigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const role = localStorage.getItem("role")?.trim().toUpperCase();

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="aL-layout">
      <aside className="aL-sidebar">
        <h2 className="aL-title">ADMIN</h2>

        <nav className="aL-nav">
          <NavLink to="/admin" end>
            대시보드
          </NavLink>
          <NavLink to="/admin/movie/add">
            영화 등록
          </NavLink>
          <NavLink to="/admin/movie">
            영화 관리
          </NavLink>
          <NavLink to="/admin/room">
            방 관리
          </NavLink>
          <NavLink to="/admin/schedule">
            스케줄 관리
          </NavLink>
        </nav>
      </aside>

      <main className="aL-content">
        <Outlet />
      </main>
    </div>
  );
}
