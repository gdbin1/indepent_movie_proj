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

  const getStatusLabel = (status) => {
    switch (status) {
      case "RESERVED":
        return "예약 완료";
      case "CANCELLED":
        return "예약 취소";
      default:
        return "예약 실패";
    }
  };


  const handleCancel = async () => {
    if (!window.confirm("예약을 취소하시겠습니까?")) return;

    try {
      await api.patch(`/reservations/${reservationId}/cancel`);
      alert("예약이 취소되었습니다.");
      fetchReservation();
    } catch (e) {
      if (e.response?.status === 409) {
        alert(e.response.data.message);
      } else {
        alert("예약 취소 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) {
    return <div className="uRC-wrap uRC-center">예약 정보를 불러오는 중입니다…</div>;
  }

  if (errorMsg) {
    return <div className="uRC-wrap uRC-error">{errorMsg}</div>;
  }

  if (!reservation) return null;

  const isCancelled = reservation.status === "CANCELLED";

  return (
    <div className="uRC-wrap">
      {/* ===== Success Header ===== */}
      <div className="uRC-success">
        <div className="uRC-check">✓</div>
        <h2 className="uRC-title">
          {isCancelled ? "예약이 취소되었습니다" : "예약이 완료되었습니다"}
        </h2>
        <p className="uRC-sub">
          {isCancelled
            ? "예약 내역은 아래에서 확인할 수 있습니다."
            : "선택하신 내용으로 예약이 정상 처리되었습니다."}
        </p>
      </div>

      {/* ===== Summary Card ===== */}
      <div className="uRC-summary-card">
        <div className="uRC-summary-row">
          <span>예약 번호</span>
          <strong>{reservation.reservationNo}</strong>
        </div>

        <div className="uRC-summary-row">
          <span>예약 상태</span>
          <span
            className={`uRC-badge ${isCancelled ? "cancelled" : "active"}`}
          >
            {getStatusLabel(reservation.status)}
          </span>

        </div>
      </div>

      {/* ===== Detail Card ===== */}
      <div className="uRC-card">
        <div className="uRC-row">
          <span>이용 인원</span>
          <strong>{reservation.peopleCount}명</strong>
        </div>

        <div className="uRC-row">
          <span>결제 금액</span>
          <strong>{reservation.priceTotal.toLocaleString()}원</strong>
        </div>

        <div className="uRC-row">
          <span>예약 일시</span>
          <strong>
            {reservation.createdAt?.replace("T", " ")}
          </strong>
        </div>
      </div>

      {/* ===== Actions ===== */}
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
