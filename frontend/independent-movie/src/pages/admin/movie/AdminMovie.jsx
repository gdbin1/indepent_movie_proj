import { useEffect, useMemo, useState } from "react";
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

  /** 상영(노출) 토글 */
  const toggleActive = async (movieId, currentIsActive) => {
    const next = currentIsActive === 1 ? false : true;
    try {
      const res = await fetch(
        `/api/admin/movie/${movieId}/active?isActive=${next}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("토글 실패");

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

  /** ✅ BASIC 영화 삭제 */
  const deleteMovie = async (movieId) => {
    const ok = window.confirm("정말로 이 영화를 삭제하시겠습니까?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/movie/${movieId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "삭제 실패");
      }

      setMovies((prev) => prev.filter((m) => m.movieId !== movieId));
    } catch (e) {
      console.error(e);
      setMsg(e.message || "영화 삭제 중 오류가 발생했습니다.");
    }
  };

  const premiumMovies = useMemo(
    () => movies.filter((m) => m.priceGrade === "PREMIUM"),
    [movies]
  );

  const basicMovies = useMemo(
    () => movies.filter((m) => m.priceGrade === "BASIC"),
    [movies]
  );

  const renderSection = (title, list, isBasicSection = false) => (
    <section className="adM-section">
      <h2 className="adM-section-title">{title}</h2>

      <div className="adM-grid">
        {list.map((m) => (
          <div key={m.movieId} className="adM-card">
            <div className="adM-poster">
              {m.posterUrl ? (
                <img src={m.posterUrl} alt={m.title} />
              ) : (
                <div className="adM-poster-empty">NO POSTER</div>
              )}
            </div>

            <div className="adM-info">
              <div className="adM-row-top">
                <h3 className="adM-title">{m.title}</h3>

                <span
                  className={`adM-badge ${m.isActive === 1 ? "on" : "off"
                    }`}
                >
                  {m.isActive === 1 ? "상영중" : "미상영"}
                </span>
              </div>

              <div className="adM-meta">
                <span>{m.openDate || "-"}</span>
                <span>{m.runtimeMin ? `${m.runtimeMin}분` : "-"}</span>
              </div>

              <div className="adM-actions">
                <button
                  className={`adM-btn ${m.isActive === 1 ? "danger" : ""}`}
                  onClick={() => toggleActive(m.movieId, m.isActive)}
                >
                  {m.isActive === 1 ? "상영 종료" : "상영 시작"}
                </button>

                {/* ✅ BASIC 영화만 삭제 버튼 노출 */}
                {isBasicSection && (
                  <button
                    className="adM-btn danger-outline"
                    onClick={() => deleteMovie(m.movieId)}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {!loading && list.length === 0 && (
          <div className="adM-empty">해당 영화가 없습니다.</div>
        )}
      </div>
    </section>
  );

  return (
    <div className="adM-page">
      <div className="adM-head">
        <h1 className="adM-title-page">상영 영화 관리</h1>
        <button className="adM-btn-outline" onClick={fetchMovies}>
          새로고침
        </button>
      </div>

      {msg && <div className="adM-msg">{msg}</div>}

      {renderSection("PREMIUM 영화 (박스오피스)", premiumMovies, false)}

      <div className="adM-divider" />

      {renderSection("BASIC 영화 (수동 등록)", basicMovies, true)}
    </div>
  );
}
