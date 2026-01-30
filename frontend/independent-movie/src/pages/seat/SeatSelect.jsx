import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../api";
import "./SeatSelect.css";

export default function SeatSelect() {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 ReservePage에서 전달받은 인원
  const peopleCount = location.state?.peopleCount || 2;

  const [schedule, setSchedule] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showSelectError, setShowSelectError] = useState(false);

  /* =========================
     시간 슬롯 조회
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
     인원 기준 방 조회
  ========================= */
  useEffect(() => {
    if (!scheduleId) return;
    fetchAvailableRooms();
  }, [scheduleId, peopleCount]);

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
      setShowSelectError(true);
      setTimeout(() => setShowSelectError(false), 2000);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const res = await api.post("/reservations", {
        scheduleId: Number(scheduleId),
        roomId: selectedRoom.roomId,
        peopleCount,
        userId: Number(userId),
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

      {/* ===== Summary ===== */}
      <div className="uSS-summary-card">
        <div className="uSS-summary-row">
          <span className="uSS-label">상영 시간</span>
          <span>{schedule.startTime} ~ {schedule.endTime}</span>
        </div>

        <div className="uSS-summary-row">
          <span className="uSS-label">이용 인원</span>
          <strong>{peopleCount}명</strong>
        </div>
      </div>


      {/* ===== Guide ===== */}
      <div className="uSS-guide-box">
        ℹ️ <strong>{peopleCount}명 이용이 가능한 공간</strong>만 표시됩니다.
      </div>

      {/* ===== Image Placeholder Section (for future) ===== */}
      <div className="uSS-image-placeholder">
        <div className="uSS-image-placeholder-title">
          {peopleCount}명에게 어울리는 공간
        </div>

        <div className="uSS-image-placeholder-list">
          <div className="uSS-image-placeholder-card">
            이미지가 들어갈 공간
          </div>
          <div className="uSS-image-placeholder-card">
            이미지가 들어갈 공간
          </div>
          <div className="uSS-image-placeholder-card">
            이미지가 들어갈 공간
          </div>
          <div className="uSS-image-placeholder-card">
            이미지가 들어갈 공간
          </div>
        </div>
      </div>

      {/* ===== Room Selection Warning ===== */}
      {/* ===== Room Selection Error (Triggered) ===== */}
      {showSelectError && (
        <div className="uSS-select-warning">
          ⚠ 공간을 먼저 선택해주세요.
        </div>
      )}



      {/* ===== Room List ===== */}
      {loading ? (
        <div className="uSS-loading">공간을 불러오는 중입니다…</div>
      ) : rooms.length === 0 ? (
        <div className="uSS-empty">선택 가능한 공간이 없습니다.</div>
      ) : (
        <div className={`uSS-room-list ${showSelectError ? "uSS-room-list-error" : ""}`}>
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
          onClick={handleReserve}
        >
          예약하기
        </button>

      </div>
    </div>
  );
}
