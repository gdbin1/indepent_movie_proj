import { useEffect, useState } from "react";
import api from "../../../api";
import "./AdminSchedule.css";

export default function AdminSchedule() {
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [form, setForm] = useState({
    date: "",
    movieId: "",
    roomId: "",
    startTime: "",
  });

  /* =========================
     초기 데이터 로딩
  ========================= */
  useEffect(() => {
    fetchMovies();
    fetchRooms();
  }, []);

  const fetchMovies = async () => {
    const res = await api.get("/movie/active");
    setMovies(res.data || []);
  };

  const fetchRooms = async () => {
    const res = await api.get("/admin/rooms");
    // 활성 방만 사용
    setRooms((res.data || []).filter((r) => r.isActive === 1));
  };

  const fetchSchedules = async (date) => {
    if (!date) return;
    const res = await api.get("/admin/schedules", {
      params: { date },
    });
    setSchedules(res.data || []);
  };

  /* =========================
     핸들러
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "date") {
      fetchSchedules(value);
    }
  };

  const handleCreate = async () => {
    const { date, movieId, roomId, startTime } = form;

    if (!date || !movieId || !roomId || !startTime) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    try {
      await api.post("/admin/schedules", {
        movieId,
        roomId,
        displayDate: date,
        startTime,
      });

      fetchSchedules(date);
      setForm({ ...form, startTime: "" });
    } catch (e) {
      alert(e.response?.data?.message || "스케줄 생성 실패");
    }
  };

  return (
    <div className="aSP-page">
      <h1 className="aSP-title">상영 스케줄 관리</h1>

      {/* 생성 폼 */}
      <div className="aSP-form">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <select name="movieId" value={form.movieId} onChange={handleChange}>
          <option value="">영화 선택</option>
          {movies.map((m) => (
            <option key={m.movieId} value={m.movieId}>
              {m.title}
            </option>
          ))}
        </select>

        <select name="roomId" value={form.roomId} onChange={handleChange}>
          <option value="">방 선택</option>
          {rooms.map((r) => (
            <option key={r.roomId} value={r.roomId}>
              {r.roomName}
            </option>
          ))}
        </select>

        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
        />

        <button onClick={handleCreate}>스케줄 생성</button>
      </div>

      {/* 스케줄 목록 */}
      <div className="aSP-list">
        {schedules.length === 0 && (
          <p className="aSP-empty">등록된 스케줄이 없습니다.</p>
        )}

        {schedules.map((s) => (
          <div key={s.scheduleId} className="aSP-card">
            <div>
              <strong>{form.date}</strong>
              <p>{s.movieTitle}</p>
              <span>{s.roomName}</span>
            </div>
            <div className="aSP-time">
              {s.startTime} ~ {s.endTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
