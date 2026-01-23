import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./SeatSelect.css";

export default function SeatSelect() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState(null);
  const [peopleCount, setPeopleCount] = useState(2);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     초기: 시간 슬롯 조회
  ========================= */
  useEffect(() => {
    if (!scheduleId) return;
    fetchScheduleDetail();
  }, [scheduleId]);

  const fetchScheduleDetail = async () => {
    try {
      const res = await api.get(`/schedules/${scheduleId}`);
      setSchedule(res.data);
    } catch (e) {
      console.error("상영 일정 조회 실패", e);
    }
  };

  /* =========================
     인원 변경 → 방 조회
  ========================= */
  useEffect(() => {
    if (!scheduleId) return;
    fetchAvailableRooms();
  }, [peopleCount, scheduleId]);

  const fetchAvailableRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get("/rooms/available", {
        params: {
          scheduleId,
          peopleCount,
        },
      });
      setRooms(res.data || []);
      setSelectedRoom(null);
    } catch (e) {
      console.error("예약 가능한 방 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     예약 생성
  ========================= */
  const handleReserve = async () => {
    if (!selectedRoom) {
      alert("공간을 선택해주세요.");
      return;
    }

    try {
      const res = await api.post("/reservations", {
        scheduleId: Number(scheduleId),
        roomId: selectedRoom.roomId,
        peopleCount,
        userId: 1, // TODO 로그인 연동
      });


      navigate(`/reserve/complete/${res.data.reservationId}`);
    } catch (e) {
      alert("예약 생성 중 오류가 발생했습니다.");
      console.error(e);
    }
  };

  if (!schedule) {
    return <div className="uSS-loading">상영 정보를 불러오는 중입니다…</div>;
  }

  return (
    <div className="uSS-page">
      {/* ===== Header ===== */}
      <div className="uSS-header">
        <button className="uSS-back" onClick={() => navigate(-1)}>←</button>
        <h2 className="uSS-title">공간 선택</h2>
      </div>

      {/* ===== Schedule Summary ===== */}
      <div className="uSS-summary-card">
        <div className="uSS-summary-row">
          <span className="uSS-label">상영 시간</span>
          <span>{schedule.startTime} ~ {schedule.endTime}</span>
        </div>
      </div>

      {/* ===== People Count ===== */}
      <div className="uSS-people-card">
        <label className="uSS-people-label">이용 인원</label>
        <select
          className="uSS-people-select"
          value={peopleCount}
          onChange={(e) => setPeopleCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n}명</option>
          ))}
        </select>
      </div>

      {/* ===== Room List ===== */}
      {loading ? (
        <div className="uSS-loading">공간을 불러오는 중입니다…</div>
      ) : rooms.length === 0 ? (
        <div className="uSS-empty">선택 가능한 공간이 없습니다.</div>
      ) : (
        <div className="uSS-room-list">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className={`uSS-room-card ${selectedRoom?.roomId === room.roomId ? "active" : ""
                }`}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="uSS-room-title">{room.roomName}</div>
              <div className="uSS-room-meta">
                {room.capacityMin}~{room.capacityMax}명 · {room.roomType}
              </div>
              <div className="uSS-room-price">
                {room.basePrice.toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== Footer ===== */}
      <div className="uSS-footer">
        <div className="uSS-footer-price">
          {selectedRoom
            ? `총 ${selectedRoom.basePrice.toLocaleString()}원`
            : "공간을 선택해주세요"}
        </div>
        <button
          className="uSS-next-btn"
          disabled={!selectedRoom}
          onClick={handleReserve}
        >
          예약하기
        </button>
      </div>
    </div>
  );
}
