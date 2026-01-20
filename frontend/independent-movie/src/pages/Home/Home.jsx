import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import api from "../../api";
import UserLayout from "../../components/UserLayout";

export default function Home() {
  const [premiumMovies, setPremiumMovies] = useState([]);
  const navigate = useNavigate();

  /* ================= PREMIUM BOX OFFICE ================= */
  useEffect(() => {
    fetchPremiumMovies();
  }, []);

  const fetchPremiumMovies = async () => {
    try {
      const res = await api.get("/movie/active");
      setPremiumMovies(res.data);
    } catch (e) {
      console.error("박스오피스(PREMIUM) 영화 조회 실패", e);
    }
  };

  return (
    <UserLayout>
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
              <button className="btn-outline">영화 둘러보기</button>
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
            <h2 className="section-title">박스오피스 상영 Premium</h2>
            <span className="section-sub">지금 가장 인기 있는 영화</span>
          </div>

          <div className="boxoffice-grid">
            {premiumMovies.map((movie) => (
              <div
                key={movie.movieId}
                className="boxoffice-card"
                onClick={() => navigate(`/movie/${movie.movieId}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="boxoffice-poster">
                  {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} />
                  ) : null}
                </div>

                <div className="boxoffice-info">
                  <span className="movie-badge premium">PREMIUM</span>
                  <h3>{movie.title}</h3>
                  <p>오늘 상영 가능</p>
                </div>
              </div>
            ))}
          </div>

          {premiumMovies.length === 0 && (
            <p className="empty-text">
              현재 박스오피스 상영 영화가 없습니다.
            </p>
          )}
        </div>
      </section>

      {/* ================= Movies (BASIC / 가데이터 유지) ================= */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">현재 상영 중인 영화</h2>

          <div className="movie-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="movie-card">
                <div className="movie-poster" />
                <div className="movie-info">
                  <span className="movie-badge premium">PREMIUM</span>
                  <h3>영화 제목 {i}</h3>
                  <p>러닝타임 120분</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Rooms ================= */}
      <section className="section gray">
        <div className="container">
          <h2 className="section-title">프라이빗 공간</h2>

          <div className="room-grid">
            <div className="room-card">
              <h3>커플룸</h3>
              <p>2인 전용 프라이빗 공간</p>
            </div>

            <div className="room-card">
              <h3>프라이빗룸</h3>
              <p>4~5인 소규모 관람</p>
            </div>

            <div className="room-card">
              <h3>단체룸</h3>
              <p>6인 이상 단체 관람</p>
            </div>
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
    </UserLayout>
  );
}
