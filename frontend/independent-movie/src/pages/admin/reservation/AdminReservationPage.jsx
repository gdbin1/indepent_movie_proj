import { useEffect, useState } from "react";
import api from "../../../api";
import "./AdminReservationPage.css";

export default function AdminReservationPage() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 필터
    const [status, setStatus] = useState("ALL");
    const [keyword, setKeyword] = useState("");

    // 페이징
    const [page, setPage] = useState(1);
    const size = 20;
    const [totalPages, setTotalPages] = useState(0);

    const fetchReservations = async (targetPage = page) => {
        setLoading(true);
        try {
            const params = {
                page: targetPage,
                size,
            };
            if (status !== "ALL") params.status = status;
            if (keyword.trim()) params.keyword = keyword;

            const res = await api.get("/admin/reservations", { params });


            setList(res.data.list || []);
            setPage(res.data.page);
            setTotalPages(res.data.totalPages);
        } catch (e) {
            console.error("ADMIN 예약 목록 조회 실패", e);
            alert("예약 목록 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchReservations(1);
    }, [status]);

    const handleSearch = () => {
        setPage(1);
        fetchReservations(1);
    };

    const handleCancel = async (reservationId) => {
        if (!window.confirm("이 예약을 강제 취소하시겠습니까?")) return;

        try {
            await api.post(`/admin/reservations/${reservationId}/cancel`);

            alert("예약이 취소되었습니다.");
            fetchReservations(page);
        } catch (e) {
            alert(e.response?.data?.message || "취소 실패");
        }
    };

    return (
        <div className="aRP-page">
            <h1 className="aRP-title">예약 관리</h1>

            {/* ===== 필터 ===== */}
            <div className="aRP-filter">
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="ALL">전체</option>
                    <option value="RESERVED">예약됨</option>
                    <option value="CANCELLED">취소됨</option>
                </select>

                <input
                    type="text"
                    placeholder="예약번호 / 이메일 / 이름"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button onClick={handleSearch}>검색</button>
            </div>

            {/* ===== 테이블 ===== */}
            <div className="aRP-table-wrap">
                <table className="aRP-table">
                    <thead>
                        <tr>
                            <th>예약번호</th>
                            <th>회원</th>
                            <th>룸</th>
                            <th>상영일</th>
                            <th>시간</th>
                            <th>인원</th>
                            <th>금액</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="center">로딩 중...</td>
                            </tr>
                        ) : list.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="center">예약이 없습니다.</td>
                            </tr>
                        ) : (
                            list.map((r) => (
                                <tr key={r.reservationId}>
                                    <td>{r.reservationNo}</td>
                                    <td>{r.userName || "탈퇴 회원"}</td>
                                    <td>{r.roomName}</td>
                                    <td>{r.displayDate}</td>
                                    <td>
                                        {r.startAt?.slice(11, 16)} ~ {r.endAt?.slice(11, 16)}
                                    </td>
                                    <td>{r.peopleCount}</td>
                                    <td>{r.priceTotal.toLocaleString()}원</td>
                                    <td>
                                        <span className={`status ${r.reservationStatus}`}>
                                            {r.reservationStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {r.reservationStatus === "RESERVED" && (
                                            <button
                                                className="cancel-btn"
                                                onClick={() => handleCancel(r.reservationId)}
                                            >
                                                강제 취소
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== 페이징 ===== */}
            {totalPages > 1 && (
                <div className="aRP-pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => fetchReservations(page - 1)}
                    >
                        이전
                    </button>

                    <span>
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => fetchReservations(page + 1)}
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}
