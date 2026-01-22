import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api";
import "./SeatSelect.css";

export default function SeatSelect() {
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedDate = searchParams.get("date"); // yyyy-MM-dd

  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, [movieId, selectedDate]);

  const fetchSchedules = async () => {
    try {
      const res = await api.get(
        `/schedules?movieId=${movieId}&date=${selectedDate}`
      );
      setSchedules(res.data || []);
    } catch (e) {
      console.error("상영 방 목록 조회 실패", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (scheduleId) => {
    setSelectedScheduleId(scheduleId);
  };

  const handleNext = () => {
    if (!selectedScheduleId) return;

    // 다음 단계: reservation 생성
    // navigate(`/reserve/confirm/${selectedScheduleId}`);
    alert("다음 단계 (예약 생성)는 다음 단계에서 진행합니다.");
  };

  if (loading) {
    return <div className="uSS-loading">상영 공간 불러오는 중...</div>;
  }

  return (
    <div className="uSS-page">
      <h2 className="uSS-title">공간 선택</h2>

      <div className="uSS-room-list">
        {schedules.length === 0 && (
          <div className="uSS-empty">
            선택한 날짜에 예약 가능한 공간이 없습니다.
          </div>
        )}

        {schedules.map((item) => (
          <div
            key={item.scheduleId}
            className={`uSS-room-card
              ${
                selectedScheduleId === item.scheduleId
                  ? "uSS-room-card--selected"
                  : ""
              }
            `}
            onClick={() => handleSelect(item.scheduleId)}
          >
            <div className="uSS-room-name">{item.roomName}</div>
            <div className="uSS-room-type">{item.roomType}</div>

            <div className="uSS-room-info">
              <span>
                인원 {item.capacityMin}~{item.capacityMax}명
              </span>
              <span>
                {item.startAt} ~ {item.endAt}
              </span>
            </div>

            <div className="uSS-room-price">
              {item.priceFinal.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      <div className="uSS-footer">
        <button
          className="uSS-next-btn"
          disabled={!selectedScheduleId}
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}
