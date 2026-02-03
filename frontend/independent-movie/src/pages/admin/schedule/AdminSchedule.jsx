import { useEffect, useMemo, useState } from "react";
import api from "../../../api";
import "./AdminSchedule.css";

export default function AdminSchedule() {
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [updatingId, setUpdatingId] = useState(null);

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
     status 유틸 (응답 필드명이 다를 수도 있어 방어)
     - 백엔드 기준: OPEN / CLOSED
  ========================= */
  const getScheduleStatus = (s) => {
    // 가능한 필드명들을 넓게 커버 (DTO에 맞게 자동 대응)
    const raw =
      s?.status ??
      s?.scheduleStatus ??
      s?.scheduleStatusCd ??
      s?.sttsCd ??
      s?.openStatus ??
      s?.exposureStatus;

    // raw가 없으면 기본값(노출중)으로 처리
    const normalized = String(raw || "OPEN").toUpperCase();
    return normalized === "CLOSED" ? "CLOSED" : "OPEN";
  };

  const getStatusMeta = (status) => {
    if (status === "OPEN") {
      return {
        badgeText: "노출중",
        badgeClass: "aSP-badge aSP-badge--open",
        actionText: "비노출로 변경",
        nextStatus: "CLOSED",
      };
    }
    return {
      badgeText: "비노출",
      badgeClass: "aSP-badge aSP-badge--closed",
      actionText: "노출로 변경",
      nextStatus: "OPEN",
    };
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

  const handleToggleExposure = async (scheduleId, currentStatus) => {
    if (!form.date) {
      alert("먼저 날짜를 선택해주세요.");
      return;
    }

    const { nextStatus } = getStatusMeta(currentStatus);

    try {
      setUpdatingId(scheduleId);

      await api.patch(`/admin/schedules/${scheduleId}/status`, {
        status: nextStatus,
      });

      // 최신 상태 다시 조회
      await fetchSchedules(form.date);
    } catch (e) {
      alert(e.response?.data?.message || "노출 상태 변경 실패");
    } finally {
      setUpdatingId(null);
    }
  };

  const selectedDateText = useMemo(() => {
    return form.date ? form.date : "날짜를 선택해주세요";
  }, [form.date]);

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

        <button className="aSP-btn aSP-btn--primary" onClick={handleCreate}>
          스케줄 생성
        </button>
      </div>

      {/* 스케줄 목록 */}
      <div className="aSP-list">
        {!form.date && (
          <p className="aSP-empty">날짜를 선택하면 스케줄이 표시됩니다.</p>
        )}

        {form.date && schedules.length === 0 && (
          <p className="aSP-empty">등록된 스케줄이 없습니다.</p>
        )}

        {schedules.map((s) => {
          const status = getScheduleStatus(s);
          const meta = getStatusMeta(status);
          const isUpdating = updatingId === s.scheduleId;

          return (
            <div key={s.scheduleId} className="aSP-card">
              <div className="aSP-left">
                <div className="aSP-topRow">
                  <strong className="aSP-date">{selectedDateText}</strong>
                  <span className={meta.badgeClass}>{meta.badgeText}</span>
                </div>

                <p className="aSP-movieTitle">{s.movieTitle}</p>
                <span className="aSP-roomName">{s.roomName}</span>
              </div>

              <div className="aSP-right">
                <div className="aSP-time">
                  {s.startTime} ~ {s.endTime}
                </div>

                <button
                  className={`aSP-btn aSP-btn--ghost ${
                    status === "OPEN" ? "aSP-btn--danger" : "aSP-btn--success"
                  }`}
                  onClick={() => handleToggleExposure(s.scheduleId, status)}
                  disabled={isUpdating}
                  title="스케줄 노출 상태 변경"
                >
                  {isUpdating ? "변경중..." : meta.actionText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
