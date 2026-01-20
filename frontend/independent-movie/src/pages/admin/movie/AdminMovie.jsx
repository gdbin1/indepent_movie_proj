import { useEffect, useState } from "react";
import "./AdminMovie.css";

export default function AdminMovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/movie");
      if (!res.ok) throw new Error("목록 조회 실패");

      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setMsg("영화 목록 조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const toggleActive = async (movieId, currentIsActive) => {
    const next = currentIsActive === 1 ? false : true;

    try {
      const res = await fetch(
        `/api/admin/movie/${movieId}/active?isActive=${next}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("토글 실패");

      const text = await res.text();
      setMsg(text || "변경 완료");

      // UI 즉시 반영
      setMovies((prev) =>
        prev.map((m) =>
          m.movieId === movieId ? { ...m, isActive: next ? 1 : 0 } : m
        )
      );
    } catch (e) {
      console.error(e);
      setMsg("상영(노출) 상태 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1 className="admin-title">상영 영화 관리</h1>
        <button className="admin-btn-outline" onClick={fetchMovies} disabled={loading}>
          {loading ? "불러오는 중..." : "새로고침"}
        </button>
      </div>

      <p className="admin-desc">
        movie 테이블에 저장된 영화 목록입니다. <br />
        <strong>is_active = 1</strong> 인 영화만 USER 화면에 노출(=상영)됩니다.
      </p>

      {msg && <div className="admin-msg">{msg}</div>}

      <div className="admin-grid">
        {movies.map((m) => (
          <div key={m.movieId} className="admin-card">
            <div className="poster">
              {m.posterUrl ? (
                <img src={m.posterUrl} alt={m.title} />
              ) : (
                <div className="poster-empty">NO POSTER</div>
              )}
            </div>

            <div className="info">
              <div className="row-top">
                <h3 className="title">{m.title}</h3>
                <span className={m.isActive === 1 ? "badge on" : "badge off"}>
                  {m.isActive === 1 ? "상영중" : "미상영"}
                </span>
              </div>

              <div className="meta">
                <span>source: {m.source || "-"}</span>
                <span>open: {m.openDate || "-"}</span>
                <span>runtime: {m.runtimeMin ? `${m.runtimeMin}분` : "-"}</span>
              </div>

              <div className="actions">
                <button
                  className={m.isActive === 1 ? "admin-btn danger" : "admin-btn"}
                  onClick={() => toggleActive(m.movieId, m.isActive)}
                >
                  {m.isActive === 1 ? "상영 종료(OFF)" : "상영 시작(ON)"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && movies.length === 0 && (
          <div className="empty">영화 데이터가 없습니다. 박스오피스 저장부터 진행해 주세요.</div>
        )}
      </div>
    </div>
  );
}
