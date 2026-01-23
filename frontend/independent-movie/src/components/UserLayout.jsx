import "./UserLayout.css";
import { NavLink, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="user-layout">
      {/* ================= HEADER ================= */}
      <header className="user-header">
        <div className="container user-header-inner">
          <h1 className="user-logo">
            <NavLink to="/" className="user-logo-link">
              Independent Movie
            </NavLink>
          </h1>

          <nav className="user-nav">
            <NavLink to="/movies" className="user-nav-link">
              영화
            </NavLink>
            <NavLink to="/space" className="user-nav-link">
              공간
            </NavLink>
            <NavLink to="/reservation" className="user-nav-link">
              예약
            </NavLink>
          </nav>

          <div className="user-auth">
            <button className="btn-text">로그인</button>
            <button className="btn-text">회원가입</button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="user-layout-main">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© Independent Movie</span>
          <span>프라이빗 영화관 예약 서비스</span>
        </div>
      </footer>
    </div>
  );
}
