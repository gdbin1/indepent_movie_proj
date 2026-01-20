import { Link } from "react-router-dom";

export default function NavigationAdmin() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px",
        background: "#111",
      }}
    >
      <Link to="/admin/home" style={{ color: "#fff" }}>
        관리자 홈
      </Link>
      <Link to="/admin/movie" style={{ color: "#fff" }}>
        상영 영화 관리
      </Link>
    </nav>
  );
}
