import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./ReservationComplete.css";

export default function ReservationComplete() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchReservation();
    // eslint-disable-next-line
  }, []);

  const fetchReservation = async () => {
    try {
      const res = await api.get(`/reservations/${reservationId}`);
      setReservation(res.data);
    } catch (e) {
      setErrorMsg("예약 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("예약을 취소하시겠습니까?")) return;

    try {
      await api.patch(`/reservations/${reservationId}/cancel`);
      alert("예약이 취소되었습니다.");
      fetchReservation(); // 상태 다시 조회
    } catch (e) {
      if (e.response?.status === 409) {
        alert(e.response.data.message);
      } else {
        alert("예약 취소 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <div className="uRC-wrap">로딩 중...</div>;
  if (errorMsg) return <div className="uRC-wrap uRC-error">{errorMsg}</div>;
  if (!reservation) return null;

  const isCancelled = reservation.status === "CANCELLED";

  return (
    <div className="uRC-wrap">
      <h2 className="uRC-title">예약 완료</h2>

      <div className="uRC-card">
        <div className="uRC-row">
          <span>예약 번호</span>
          <strong>{reservation.reservationNo}</strong>
        </div>

        <div className="uRC-row">
          <span>인원</span>
          <strong>{reservation.peopleCount}명</strong>
        </div>

        <div className="uRC-row">
          <span>결제 금액</span>
          <strong>{reservation.priceTotal.toLocaleString()}원</strong>
        </div>

        <div className="uRC-row">
          <span>예약 상태</span>
          <strong className={isCancelled ? "uRC-cancelled" : "uRC-active"}>
            {reservation.status}
          </strong>
        </div>

        <div className="uRC-row">
          <span>예약 시간</span>
          <strong>
            {reservation.createdAt?.replace("T", " ")}
          </strong>
        </div>
      </div>

      <div className="uRC-actions">
        <button
          className="uRC-btn secondary"
          onClick={() => navigate("/")}
        >
          홈으로
        </button>

        <button
          className="uRC-btn danger"
          onClick={handleCancel}
          disabled={isCancelled}
        >
          예약 취소
        </button>
      </div>
    </div>
  );
}
