import { useEffect, useState } from "react";
import api from "../../api";
import "./MyPage.css";

export default function MyPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const res = await api.get("/mypage/reservations", {
                params: { userId },
            });
            setReservations(res.data || []);
        } catch (e) {
            console.error("마이페이지 예약 조회 실패", e);
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       예약 취소
    ========================= */
    const handleCancel = async (reservationId) => {
        const ok = window.confirm("예약을 취소하시겠습니까?");
        if (!ok) return;

        try {
            await api.patch(
                `/reservations/${reservationId}/cancel`,
                null,
                { params: { userId } }
            );
            fetchReservations(); // 취소 후 재조회
        } catch (e) {
            alert("예약 취소 중 오류가 발생했습니다.");
            console.error(e);
        }
    };


    if (loading) {
        return <div className="uMP-loading">불러오는 중...</div>;
    }

    return (
        <div className="uMP-page">
            <h1 className="uMP-title">마이페이지</h1>

            <section className="uMP-section">
                <h2 className="uMP-section-title">내 예약 내역</h2>

                {reservations.length === 0 && (
                    <div className="uMP-empty">예약 내역이 없습니다.</div>
                )}

                <ul className="uMP-list">
                    {reservations.map((r) => (
                        <li
                            key={r.reservationId}
                            className={`uMP-card ${r.status === "CANCELLED" ? "uMP-cancelled" : ""
                                }`}
                        >
                            <div className="uMP-card-header">
                                <span className="uMP-movie-title">{r.movieTitle}</span>
                                <span className={`uMP-status uMP-${r.status.toLowerCase()}`}>
                                    {r.status}
                                </span>
                            </div>

                            <div className="uMP-card-body">
                                <div>상영일: {r.displayDate}</div>
                                <div>
                                    시간: {r.startAt.slice(11, 16)} ~ {r.endAt.slice(11, 16)}
                                </div>
                                <div>룸: {r.roomName}</div>
                                <div>인원: {r.peopleCount}명</div>
                                <div className="uMP-price">
                                    결제 금액: {r.priceTotal.toLocaleString()}원
                                </div>
                            </div>

                            {/* ===== Footer / Action ===== */}
                            {r.status === "RESERVED" && (
                                <div className="uMP-card-footer">
                                    <button
                                        className="uMP-cancel-btn"
                                        onClick={() => handleCancel(r.reservationId)}
                                    >
                                        예약 취소
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
