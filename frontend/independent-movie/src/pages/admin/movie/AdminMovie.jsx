import { useEffect, useMemo, useState } from "react";
import "./AdminMovie.css";

export default function AdminMovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  /* ===== 수정 모달 ===== */
  const [editMovie, setEditMovie] = useState(null);
  const [runtimeMin, setRuntimeMin] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/movie");
      if (!res.ok) throw new Error("목록 조회 실패");
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch {
      setMsg("영화 목록 조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  /* ===== 상영 토글 ===== */
  const toggleActive = async (movieId, currentIsActive) => {
    const next = currentIsActive === 1 ? false : true;
    try {
      const res = await fetch(
        `/api/admin/movie/${movieId}/active?isActive=${next}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error();

      setMovies((prev) =>
        prev.map((m) =>
          m.movieId === movieId ? { ...m, isActive: next ? 1 : 0 } : m
        )
      );
    } catch {
      alert("상영 상태 변경 실패");
    }
  };

  /* ===== 삭제 (PREMIUM 경고) ===== */
  const deleteMovie = async (movie) => {
    if (movie.priceGrade === "PREMIUM") {
      alert("박스오피스(PREMIUM) 영화는 삭제할 수 없습니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/admin/movie/${movie.movieId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      setMovies((prev) => prev.filter((m) => m.movieId !== movie.movieId));
    } catch (e) {
      alert(e.message || "삭제 실패");
    }
  };

  /* ===== 수정 ===== */
  const openEdit = (movie) => {
    setEditMovie(movie);
    setRuntimeMin(movie.runtimeMin || "");
    setDescription(movie.description || "");
    setPosterUrl(movie.posterUrl || "");
  };

  const saveEdit = async () => {
    if (!runtimeMin || runtimeMin <= 0) {
      alert("러닝타임은 필수입니다.");
      return;
    }

    try {
      const res = await fetch(`/api/admin/movie/${editMovie.movieId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runtimeMin,
          description,
          posterUrl,
          priceGrade: editMovie.priceGrade,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      setEditMovie(null);
      fetchMovies();
    } catch (e) {
      alert(e.message || "수정 실패");
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

  const renderSection = (title, list) => (
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
                <span className={`adM-badge ${m.isActive ? "on" : "off"}`}>
                  {m.isActive ? "상영중" : "미상영"}
                </span>
              </div>

              <div className="adM-meta">
                <span>{m.openDate || "-"}</span>
                <span>{m.runtimeMin ? `${m.runtimeMin}분` : "-"}</span>
              </div>

              <div className="adM-actions">
                {/* 삭제 */}
                <button
                  className="adM-btn danger-outline"
                  onClick={() => deleteMovie(m)}
                >
                  삭제
                </button>

                {/* 수정 */}
                <button className="adM-btn" onClick={() => openEdit(m)}>
                  수정
                </button>

                {/* 상영 토글 */}
                <button
                  className={`adM-btn ${m.isActive ? "danger" : ""}`}
                  onClick={() => toggleActive(m.movieId, m.isActive)}
                >
                  {m.isActive ? "상영 종료" : "상영 시작"}
                </button>
              </div>
            </div>
          </div>
        ))}
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

      {renderSection("PREMIUM 영화 (박스오피스)", premiumMovies)}
      <div className="adM-divider" />
      {renderSection("BASIC 영화 (수동 등록)", basicMovies)}

      {/* ===== 수정 모달 ===== */}
      {editMovie && (
        <div className="adM-modal-bg">
          <div className="adM-modal">
            <h3>영화 정보 수정</h3>

            <label>러닝타임(분) *</label>
            <input
              type="number"
              value={runtimeMin}
              onChange={(e) => setRuntimeMin(e.target.value)}
            />

            <label>설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>포스터 URL</label>
            <input
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
            />

            <div className="adM-modal-actions">
              <button className="adM-btn" onClick={saveEdit}>
                저장
              </button>
              <button
                className="adM-btn danger-outline"
                onClick={() => setEditMovie(null)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
