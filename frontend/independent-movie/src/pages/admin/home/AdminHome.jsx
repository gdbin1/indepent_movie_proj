import { useState } from "react";
import "./AdminHome.css";

export default function AdminHome() {
  const [targetDt, setTargetDt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState("");

  /**
   * 박스오피스 데이터 갱신 (ADMIN)
   * POST /api/admin/movie/boxoffice?targetDt=yyyyMMdd
   */
  const handleUpdateBoxOffice = async () => {
    if (!targetDt) {
      alert("기준 날짜(targetDt)를 입력해주세요. (yyyyMMdd)");
      return;
    }

    if (loading) return;

    setLoading(true);
    setResultMsg("");

    try {
      const res = await fetch(
        `/api/admin/movie/boxoffice?targetDt=${targetDt}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error("서버 오류");
      }

      const text = await res.text();
      setResultMsg(text);
    } catch (error) {
      console.error(error);
      setResultMsg("박스오피스 데이터 갱신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">관리자 홈</h1>

      {/* ================= 박스오피스 관리 ================= */}
      <section className="admin-card">
        <h2 className="admin-card-title">박스오피스 데이터 관리</h2>

        <p className="admin-desc">
          영화진흥위원회(KOBIS) 주간 박스오피스 데이터를 불러와
          <br />
          <strong>movie 테이블에 저장</strong>합니다.
          <br />
          USER 화면에는 <strong>즉시 반영되지 않습니다.</strong>
        </p>

        {/* 기준 날짜 입력 */}
        <div className="admin-form-row">
          <label className="admin-label">기준 날짜 (yyyyMMdd)</label>
          <input
            type="text"
            className="admin-input"
            placeholder="예) 20260120"
            value={targetDt}
            onChange={(e) => setTargetDt(e.target.value)}
          />
        </div>

        {/* 실행 버튼 */}
        <button
          className="admin-btn"
          onClick={handleUpdateBoxOffice}
          disabled={loading}
        >
          {loading ? "박스오피스 갱신 중..." : "박스오피스 데이터 갱신"}
        </button>

        {/* 결과 메시지 */}
        {resultMsg && <p className="admin-result">{resultMsg}</p>}
      </section>
    </div>
  );
}
