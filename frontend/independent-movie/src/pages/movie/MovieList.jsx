import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";
import api from "../../api";

export default function MovieList() {
  const navigate = useNavigate();

  const [premiumMovies, setPremiumMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // ✅ PREMIUM (박스오피스)
      const premiumRes = await api.get("/movie/active/premium");
      setPremiumMovies(premiumRes.data || []);

      // ✅ BASIC (현재 상영 중)
      const basicRes = await api.get("/movie/active/basic");
      setMovies(basicRes.data || []);
    } catch (e) {
      console.error("영화 목록 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="uML-page">
        <div className="uML-container">
          <p>영화 목록을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="uML-page">
      <div className="uML-container">
        {/* ================= 박스오피스 (PREMIUM) ================= */}
        <section className="uML-section uML-boxoffice">
          <div className="uML-section-head">
            <h2 className="uML-section-title">박스오피스 상영 Premium</h2>
            <span className="uML-section-sub">
              지금 가장 인기 있는 영화
            </span>
          </div>

          <div className="uML-boxoffice-grid">
            {premiumMovies.map((movie) => (
              <div
                key={movie.movieId}
                className="uML-boxoffice-card"
                onClick={() => navigate(`/movie/${movie.movieId}`)}
              >
                <div className="uML-boxoffice-poster">
                  {movie.posterUrl && (
                    <img src={movie.posterUrl} alt={movie.title} />
                  )}
                </div>

                <div className="uML-boxoffice-info">
                  <span className="uML-badge premium">PREMIUM</span>
                  <h3>{movie.title}</h3>
                  <p>오늘 상영 가능</p>
                </div>
              </div>
            ))}
          </div>

          {premiumMovies.length === 0 && (
            <p className="uML-empty-text">
              현재 박스오피스 상영 영화가 없습니다.
            </p>
          )}
        </section>

        {/* ================= 현재 상영 중 영화 (BASIC) ================= */}
        <section className="uML-section">
          <h2 className="uML-section-title">현재 상영 중인 영화</h2>

          <div className="uML-movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.movieId}
                className="uML-movie-card"
                onClick={() => navigate(`/movie/${movie.movieId}`)}
              >
                <div className="uML-movie-poster">
                  {movie.posterUrl && (
                    <img src={movie.posterUrl} alt={movie.title} />
                  )}
                </div>

                <div className="uML-movie-info">
                  <span className="uML-badge basic">BASIC</span>
                  <h3>{movie.title}</h3>
                  <p>러닝타임 {movie.runtimeMin || "-"}분</p>
                </div>
              </div>
            ))}
          </div>

          {movies.length === 0 && (
            <p className="uML-empty-text">
              현재 상영 중인 영화가 없습니다.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
