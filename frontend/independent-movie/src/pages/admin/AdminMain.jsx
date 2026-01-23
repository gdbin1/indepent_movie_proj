import { useNavigate } from "react-router-dom";
import "./AdminMain.css";

export default function AdminMain() {
  const navigate = useNavigate();

  return (
    <div className="aM-page">
      <h1 className="aM-title">관리자 대시보드</h1>

      <div className="aM-grid">
        <button onClick={() => navigate("/admin/movie/add")}>
          🎬 영화 등록
        </button>
        <button onClick={() => navigate("/admin/movie")}>
          📋 영화 관리
        </button>
        <button onClick={() => navigate("/admin/room")}>
          🏠 방 관리
        </button>
        <button onClick={() => navigate("/admin/schedule")}>
          ⏰ 스케줄 관리
        </button>
      </div>
    </div>
  );
}
