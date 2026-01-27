import { useEffect, useState } from "react";
import api from "../../../api";
import "./AdminReservationPage.css";

export default function AdminReservationPage() {
    const today = new Date().toISOString().slice(0, 10);

    const [date, setDate] = useState(today);
    const [status, setStatus] = useState("ALL");
    const [keyword, setKeyword] = useState("");

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const size = 10;
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const [selected, setSelected] = useState(null);

    const fetchReservations = async (targetPage = 1) => {
        setLoading(true);
        try {
            const res = await api.get("/admin/reservations", {
                params: {
                    date,
                    page: targetPage,
                    size,
                    status: status !== "ALL" ? status : undefined,
                    keyword: keyword.trim() || undefined,
                },
            });

            setList(res.data.list || []);
            setPage(res.data.page);
            setTotalPage(res.data.totalPage);
        } catch {
            alert("예약 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchReservations(1);
    }, [date, status]);

    const handleSearch = () => {
        setPage(1);
        fetchReservations(1);
    };

    return (
        <div className="aRP-page">
            <h1 className="aRP-title">예약 관리</h1>

            {/* ===== 필터 ===== */}
            <div className="aRP-filter">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="ALL">전체</option>
                    <option value="RESERVED">예약됨</option>
                    <option value="CANCELLED">취소됨</option>
                </select>

                <input
                    type="text"
                    placeholder="예약번호 / 이름 / 이메일 / 전화"
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
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="8" className="center">로딩 중...</td></tr>
                        ) : list.length === 0 ? (
                            <tr><td colSpan="8" className="center">예약이 없습니다.</td></tr>
                        ) : (
                            list.map((r) => (
                                <tr key={r.reservationId} className="clickable" onClick={() => setSelected(r)}>
                                    <td>{r.reservationNo}</td>
                                    <td>{r.userName}</td>
                                    <td>{r.roomName}</td>
                                    <td>{r.displayDate}</td>
                                    <td>{r.startAt?.slice(11, 16)} ~ {r.endAt?.slice(11, 16)}</td>
                                    <td>{r.peopleCount}</td>
                                    <td>{r.priceTotal.toLocaleString()}원</td>
                                    <td>{r.reservationStatus}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== 페이징 ===== */}
            {totalPage > 1 && (
                <div className="aRP-pagination">
                    <button disabled={page === 1} onClick={() => fetchReservations(page - 1)}>이전</button>
                    <span>{page} / {totalPage}</span>
                    <button disabled={page === totalPage} onClick={() => fetchReservations(page + 1)}>다음</button>
                </div>
            )}

            {/* ===== 상세 모달 (기존 그대로) ===== */}
            {selected && (
                <div className="aRP-modal-bg" onClick={() => setSelected(null)}>
                    <div className="aRP-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>예약 상세</h2>

                        <p><b>예약번호</b> {selected.reservationNo}</p>
                        <p><b>회원명</b> {selected.userName}</p>
                        <p><b>이메일</b> {selected.userEmail}</p>
                        <p><b>전화번호</b> {selected.userPhone}</p>

                        <hr />

                        <p><b>룸</b> {selected.roomName}</p>
                        <p><b>상영일</b> {selected.displayDate}</p>
                        <p>
                            <b>시간</b>{" "}
                            {selected.startAt?.slice(11, 16)} ~ {selected.endAt?.slice(11, 16)}
                        </p>
                        <p><b>인원</b> {selected.peopleCount}</p>
                        <p><b>금액</b> {selected.priceTotal.toLocaleString()}원</p>
                        <p><b>상태</b> {selected.reservationStatus}</p>

                        <button onClick={() => setSelected(null)}>닫기</button>
                    </div>
                </div>
            )}

        </div>
    );
}
