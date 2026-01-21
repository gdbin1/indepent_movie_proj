import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./MovieDetail.css";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  const fetchMovieDetail = async () => {
    try {
      const res = await api.get(`/movie/${movieId}`);
      setMovie(res.data);
    } catch (e) {
      console.error("영화 상세 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="uMD-loading">로딩 중...</div>;
  }

  if (!movie) {
    return <div className="uMD-error">영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="page">
      <section className="uMD-detail">
        {/* ===== Top Back Navigation ===== */}
        <div className="uMD-top-nav">
          <button className="uMD-btn-top-nav" onClick={() => navigate(-1)}>
            <span className="uMD-icon">←</span>
            <span>영화 목록으로</span>
          </button>
        </div>

        <div className="container uMD-inner">
          {/* ================= POSTER ================= */}
          <div className="uMD-poster-area">
            {movie.posterUrl ? (
              <img src={movie.posterUrl} alt={movie.title} />
            ) : (
              <div className="uMD-poster-placeholder">
                <span>NO POSTER</span>
                <p>{movie.title}</p>
              </div>
            )}
          </div>

          {/* ================= INFO ================= */}
          <div className="uMD-info-area">
            <span
              className={`uMD-grade ${
                movie.priceGrade === "PREMIUM" ? "premium" : "basic"
              }`}
            >
              {movie.priceGrade}
            </span>

            <h1 className="uMD-title">{movie.title}</h1>

            <div className="uMD-meta">
              <span>개봉일: {movie.openDate}</span>
              <span>
                러닝타임:{" "}
                {movie.runtimeMin && movie.runtimeMin > 0
                  ? `${movie.runtimeMin}분`
                  : "정보 없음"}
              </span>
            </div>

            {/* ===== INFO CARDS ===== */}
            <div className="uMD-info-cards">
              <div className="uMD-info-card">
                <label>관람 등급</label>
                <strong>{movie.priceGrade}</strong>
              </div>
              <div className="uMD-info-card">
                <label>관람 요금</label>
                <strong>
                  {movie.priceGrade === "PREMIUM"
                    ? "35,000원"
                    : "일반 요금"}
                </strong>
              </div>
              <div className="uMD-info-card">
                <label>상영 상태</label>
                <strong>상영 중</strong>
              </div>
            </div>

            {/* ===== DESCRIPTION ===== */}
            <div className="uMD-description">
              <h3>영화 소개</h3>

              {movie.description ? (
                <p>{movie.description}</p>
              ) : movie.priceGrade === "PREMIUM" ? (
                <div className="uMD-premium-notice">
                  <h4>박스오피스 프리미엄 영화 안내</h4>
                  <p>
                    본 영화는 현재 주간 박스오피스 상위권 작품으로,
                    상영 기간 중 <b>Premium 이용료</b>가 적용됩니다.
                  </p>
                  <p>
                    보다 쾌적한 환경과 프라이빗한 관람 경험을 위해
                    <b> 35,000원의 Premium 요금</b>으로 제공됩니다.
                  </p>
                </div>
              ) : (
                <p className="uMD-empty-desc">
                  현재 줄거리 정보는 준비 중입니다.
                </p>
              )}
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="uMD-actions">
              <button className="uMD-btn-primary" disabled>
                예매 준비 중
              </button>
              <button className="uMD-btn-outline">관심 영화</button>
              <button className="uMD-btn-back" onClick={() => navigate(-1)}>
                ← 뒤로 가기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
