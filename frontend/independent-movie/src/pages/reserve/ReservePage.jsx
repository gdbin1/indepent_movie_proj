import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import api from "../../api";
import "./ReservePage.css";

export default function ReservePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  /* ================= Movie Info ================= */
  const [movie, setMovie] = useState(null);

  /* ================= 날짜 목록 ================= */
  const dateList = useMemo(() => {
    const result = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      result.push({
        key: d.toISOString().slice(0, 10),
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        day: d.toLocaleDateString("ko-KR", { weekday: "short" }),
      });
    }
    return result;
  }, []);

  /* ================= State ================= */
  const [selectedDate, setSelectedDate] = useState(dateList[0].key);
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= API ================= */
  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  useEffect(() => {
    fetchSchedules();
    setSelectedScheduleId(null);
  }, [selectedDate]);

  const fetchMovieDetail = async () => {
    try {
      const res = await api.get(`/movie/${movieId}`);
      setMovie(res.data);
    } catch (e) {
      console.error("영화 정보 조회 실패", e);
    }
  };

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await api.get("/schedules", {
        params: { movieId, date: selectedDate },
      });
      setSchedules(res.data || []);
    } catch (e) {
      console.error("상영 일정 조회 실패", e);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="uRP-page">
        {/* ================= Header ================= */}
        <div className="uRP-header">
          <button className="uRP-btn-back" onClick={() => navigate(-1)}>
            ←
          </button>
          <h1 className="uRP-title">영화 예매</h1>
        </div>

        {/* ================= Movie Info ================= */}
        {movie && (
          <div className="uRP-movie-box">
            <h2 className="uRP-movie-title">{movie.title}</h2>
            <p className="uRP-movie-desc">{movie.description}</p>
          </div>
        )}

        {/* ================= Date ================= */}
        <div className="uRP-section">
          <h3 className="uRP-section-title">날짜 선택</h3>

          <div className="uRP-date-list">
            {dateList.map((date) => (
              <button
                key={date.key}
                className={`uRP-date-btn ${
                  selectedDate === date.key ? "active" : ""
                }`}
                onClick={() => setSelectedDate(date.key)}
              >
                <span className="uRP-date-day">{date.day}</span>
                <span className="uRP-date-label">{date.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= Schedule ================= */}
        <div className="uRP-section">
          <h3 className="uRP-section-title">시간표 선택</h3>

          {loading ? (
            <div className="uRP-empty">상영 일정을 불러오는 중입니다…</div>
          ) : schedules.length === 0 ? (
            <div className="uRP-empty">
              선택한 날짜에는 상영 일정이 없습니다.
            </div>
          ) : (
            <div className="uRP-schedule-list">
              {schedules.map((s) => (
                <button
                  key={s.scheduleId}
                  className={`uRP-schedule-btn ${
                    selectedScheduleId === s.scheduleId ? "active" : ""
                  }`}
                  onClick={() => setSelectedScheduleId(s.scheduleId)}
                >
                  <span className="uRP-schedule-theater">{s.roomName}</span>
                  <span className="uRP-schedule-time">
                    {s.startTime} ~ {s.endTime}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= CTA ================= */}
        <div className="uRP-footer">
          <button
            className="uRP-btn-next"
            disabled={!selectedScheduleId}
            onClick={() =>
              navigate(`/reserve/seat/${selectedScheduleId}`)
            }
          >
            공간 선택
          </button>
        </div>
      </section>
    </div>
  );
}
