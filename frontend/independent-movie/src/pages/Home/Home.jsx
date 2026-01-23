import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";
import api from "../../api";

/* ================= CONFIG ================= */
const LIMIT_COUNT = 6;
const LOOP_COUNT = 6;

const PREMIUM_SLIDE_WIDTH = 280;
const MOVIE_SLIDE_WIDTH = 220;

export default function Home() {
  const navigate = useNavigate();

  const [premiumMovies, setPremiumMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  // PREMIUM은 무한 슬라이드 전제
  const [premiumIndex, setPremiumIndex] = useState(LOOP_COUNT);
  // BASIC은 개수에 따라 달라지므로 0부터 시작
  const [movieIndex, setMovieIndex] = useState(0);

  /* ================= MOVIE FETCH ================= */
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const premiumRes = await api.get("/movie/active/premium");
        const basicRes = await api.get("/movie/active/basic");

        setPremiumMovies(premiumRes.data || []);
        setMovies(basicRes.data || []);
      } catch (e) {
        console.error("영화 목록 조회 실패", e);
      }
    };
    fetchMovies();
  }, []);

  /* ================= 6개 제한 ================= */
  const basePremium = premiumMovies.slice(0, LIMIT_COUNT);
  const baseMovies = movies.slice(0, LIMIT_COUNT);

  const isPremiumLoop = basePremium.length === LIMIT_COUNT;
  const isMovieLoop = baseMovies.length === LIMIT_COUNT;

  /* ================= 슬라이드 배열 ================= */
  const premiumLoop = isPremiumLoop
    ? [
      ...basePremium.slice(-LOOP_COUNT),
      ...basePremium,
      ...basePremium.slice(0, LOOP_COUNT),
    ]
    : basePremium;

  const movieLoop = isMovieLoop
    ? [
      ...baseMovies.slice(-LOOP_COUNT),
      ...baseMovies,
      ...baseMovies.slice(0, LOOP_COUNT),
    ]
    : baseMovies;

  /* ================= PREMIUM 순간이동 ================= */
  useEffect(() => {
    if (!isPremiumLoop) return;

    if (premiumIndex === basePremium.length + LOOP_COUNT) {
      setTimeout(() => setPremiumIndex(LOOP_COUNT), 400);
    }
    if (premiumIndex === 0) {
      setTimeout(() => setPremiumIndex(basePremium.length), 400);
    }
  }, [premiumIndex, basePremium.length, isPremiumLoop]);

  /* ================= BASIC 순간이동 ================= */
  useEffect(() => {
    if (!isMovieLoop) return;

    if (movieIndex === baseMovies.length + LOOP_COUNT) {
      setTimeout(() => setMovieIndex(LOOP_COUNT), 400);
    }
    if (movieIndex === 0) {
      setTimeout(() => setMovieIndex(baseMovies.length), 400);
    }
  }, [movieIndex, baseMovies.length, isMovieLoop]);

  return (
    <div className="uH">
      {/* ================= Hero ================= */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-badge">Private Cinema</span>
            <h1>
              좌석이 아닌 <br />
              <strong>공간을 예약하는 영화관</strong>
            </h1>
            <p>
              커플룸, 프라이빗룸, 단체룸까지 <br />
              당신만을 위한 독립 영화관을 예약하세요.
            </p>

            <div className="hero-actions">
              <button className="btn-primary">지금 예약하기</button>
              <button
                className="btn-outline"
                onClick={() => navigate("/movies")}
              >
                영화 둘러보기
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-placeholder">MOVIE SCREEN</div>
          </div>
        </div>
      </section>

      {/* ================= Box Office (PREMIUM) ================= */}
      <section className="section boxoffice">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">박스오피스 상영 Premium</h2>
              <span className="section-sub">지금 가장 인기 있는 영화</span>
            </div>
            <NavLink to="/movies" className="section-more">
              전체 리스트 보러가기 →
            </NavLink>
          </div>

          <div className="slider-wrapper">
            <button
              className="slider-btn left"
              onClick={() => setPremiumIndex((p) => p - 1)}
            >
              ‹
            </button>

            <div className="slider-viewport">
              <div
                className="slider-track"
                style={{
                  transform: `translateX(-${premiumIndex * PREMIUM_SLIDE_WIDTH
                    }px)`,
                }}
              >
                {premiumLoop.map((movie, idx) => (
                  <div
                    key={`${movie.movieId}-${idx}`}
                    className="boxoffice-card slider-item"
                    onClick={() => navigate(`/movie/${movie.movieId}`)}
                  >
                    <div className="boxoffice-poster">
                      {movie.posterUrl && (
                        <img src={movie.posterUrl} alt={movie.title} />
                      )}
                    </div>
                    <div className="boxoffice-info">
                      <span className="movie-badge premium">PREMIUM</span>
                      <h3>{movie.title}</h3>
                      <p>오늘 상영 가능</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="slider-btn right"
              onClick={() => setPremiumIndex((p) => p + 1)}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ================= Movies (BASIC) ================= */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">현재 상영 중인 영화</h2>
            <NavLink to="/movies" className="section-more">
              전체 리스트 보러가기 →
            </NavLink>
          </div>

          <div className="slider-wrapper">
            {isMovieLoop && (
              <button
                className="slider-btn left"
                onClick={() => setMovieIndex((p) => p - 1)}
              >
                ‹
              </button>
            )}

            <div className="slider-viewport">
              <div
                className="slider-track"
                style={{
                  transform: `translateX(-${movieIndex * MOVIE_SLIDE_WIDTH
                    }px)`,
                }}
              >
                {movieLoop.map((movie, idx) => (
                  <div
                    key={`${movie.movieId}-${idx}`}
                    className="movie-card slider-item"
                    onClick={() => navigate(`/movie/${movie.movieId}`)}
                  >
                    <div className="movie-poster">
                      {movie.posterUrl && (
                        <img src={movie.posterUrl} alt={movie.title} />
                      )}
                    </div>
                    <div className="movie-info">
                      <span className="movie-badge basic">BASIC</span>
                      <h3>{movie.title}</h3>
                      <p>러닝타임 {movie.runtimeMin || "-"}분</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isMovieLoop && (
              <button
                className="slider-btn right"
                onClick={() => setMovieIndex((p) => p + 1)}
              >
                ›
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= Guide / FAQ / Notice ================= */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">이용 안내</h2>
            <a className="section-link" href="#">
              전체 보기
            </a>
          </div>

          <div className="help-grid">
            {/* GUIDE */}
            <div className="help-card">
              <div className="help-card__top">
                <span className="help-pill">GUIDE</span>
                <h3 className="help-title">예약은 이렇게 진행돼요</h3>
                <p className="help-desc">
                  좌석 선택 없이 <b>공간(Room)</b>과 <b>시간</b>만 선택하면 끝.
                </p>
              </div>

              <ol className="steps">
                <li className="step">
                  <span className="step-num">1</span>
                  <div className="step-body">
                    <div className="step-title">영화 선택</div>
                    <div className="step-sub">
                      박스오피스(PREMIUM) / 일반(BASIC)
                    </div>
                  </div>
                </li>
                <li className="step">
                  <span className="step-num">2</span>
                  <div className="step-body">
                    <div className="step-title">공간 & 시간 선택</div>
                    <div className="step-sub">
                      커플룸 · 프라이빗룸 · 단체룸
                    </div>
                  </div>
                </li>
                <li className="step">
                  <span className="step-num">3</span>
                  <div className="step-body">
                    <div className="step-title">예약 완료</div>
                    <div className="step-sub">
                      마이페이지에서 확인/취소
                    </div>
                  </div>
                </li>
              </ol>

              <div className="help-actions">
                <button className="btn-primary">예약하러 가기</button>
                <button className="btn-outline small">
                  이용 방법 자세히
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div className="help-card">
              <div className="help-card__top">
                <span className="help-pill">FAQ</span>
                <h3 className="help-title">자주 묻는 질문</h3>
                <p className="help-desc">
                  가장 많이 물어보시는 내용만 먼저 보여드려요.
                </p>
              </div>

              <div className="faq-mini">
                <details className="faq-item">
                  <summary>취소/환불 규정은 어떻게 되나요?</summary>
                  <p>
                    현재는 예약 취소 기능만 제공하며, 운영 정책은 공지로
                    안내됩니다.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>인원 수는 어떻게 선택하나요?</summary>
                  <p>
                    공간 유형별 최소/최대 인원 범위 안에서 예약 시
                    선택합니다.
                  </p>
                </details>

                <details className="faq-item">
                  <summary>공간 이용 시간은 얼마나 되나요?</summary>
                  <p>
                    상영 스케줄 기준으로 운영되며, 준비/정리 시간은 운영
                    정책에 따릅니다.
                  </p>
                </details>
              </div>

              <div className="help-actions">
                <button className="btn-outline">FAQ 전체보기</button>
              </div>
            </div>

            {/* NOTICE */}
            <div className="help-card">
              <div className="help-card__top">
                <span className="help-pill">NOTICE</span>
                <h3 className="help-title">공지사항</h3>
                <p className="help-desc">
                  최근 공지를 확인하고 불편 없이 이용하세요.
                </p>
              </div>

              <ul className="notice-mini">
                <li className="notice-row">
                  <span className="notice-date">07.15</span>
                  <span className="notice-title">운영 시간 변경 안내</span>
                </li>
                <li className="notice-row">
                  <span className="notice-date">07.10</span>
                  <span className="notice-title">프라이빗룸 리뉴얼 안내</span>
                </li>
                <li className="notice-row">
                  <span className="notice-date">07.03</span>
                  <span className="notice-title">예약 취소 정책 공지</span>
                </li>
              </ul>

              <div className="help-actions">
                <button className="btn-outline">공지 전체보기</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
