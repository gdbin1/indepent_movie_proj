import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleGoUser = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="aL-layout">
      <aside className="aL-sidebar">
        <h2 className="aL-title">ADMIN</h2>

        {/* ===== 메인 네비게이션 ===== */}
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
          <NavLink to="/admin/reservations">
            예약 관리
          </NavLink>
        </nav>

        {/* ===== 하단 액션 네비게이션 (고정) ===== */}
        <nav className="aL-nav aL-nav-bottom">
          <button
            className="aL-action"
            onClick={handleGoUser}
          >
            사용자 화면으로
          </button>
          <button
            className="aL-action aL-logout"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </nav>
      </aside>

      <main className="aL-content">
        <Outlet />
      </main>
    </div>
  );
}
