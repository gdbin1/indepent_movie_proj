import { useState } from "react";
import "./AdminHome.css";

export default function AdminHome() {
  const [targetDt, setTargetDt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [runtimeMin, setRuntimeMin] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [createMsg, setCreateMsg] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

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
        { method: "POST" }
      );
      if (!res.ok) throw new Error("서버 오류");

      const text = await res.text();
      setResultMsg(text);
    } catch (e) {
      console.error(e);
      setResultMsg("박스오피스 데이터 갱신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async () => {
    if (!title || !openDate) {
      alert("제목과 개봉일은 필수 입력입니다.");
      return;
    }
    if (createLoading) return;

    setCreateLoading(true);
    setCreateMsg("");

    try {
      const res = await fetch("/api/admin/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          runtimeMin: runtimeMin ? Number(runtimeMin) : null,
          openDate,
          posterUrl,
        }),
      });

      if (!res.ok) throw new Error("등록 실패");

      const text = await res.text();
      setCreateMsg(text || "영화 등록 완료");

      setTitle("");
      setDescription("");
      setRuntimeMin("");
      setOpenDate("");
      setPosterUrl("");
    } catch (e) {
      console.error(e);
      setCreateMsg("영화 등록 중 오류가 발생했습니다.");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="adH-page">
      <h1 className="adH-title">관리자 홈</h1>

      <section className="adH-card">
        <h2 className="adH-card-title">박스오피스 데이터 관리</h2>

        <p className="adH-desc">
          영화진흥위원회(KOBIS) 주간 박스오피스 데이터를 불러와
          <br />
          <strong>movie 테이블에 저장</strong>합니다.
          <br />
          USER 화면에는 <strong>즉시 노출되지 않습니다.</strong>
        </p>

        <div className="adH-form-row">
          <label className="adH-label">기준 날짜 (yyyyMMdd)</label>
          <input
            type="text"
            className="adH-input"
            placeholder="예) 20260120"
            value={targetDt}
            onChange={(e) => setTargetDt(e.target.value)}
          />
        </div>

        <button
          className="adH-btn"
          onClick={handleUpdateBoxOffice}
          disabled={loading}
        >
          {loading ? "박스오피스 갱신 중..." : "박스오피스 데이터 갱신"}
        </button>

        {resultMsg && <p className="adH-result">{resultMsg}</p>}
      </section>

      <section className="adH-card">
        <h2 className="adH-card-title">현재 상영중인 영화 등록 (BASIC)</h2>

        <p className="adH-desc">
          ADMIN이 직접 선택한 영화를 등록합니다.
          <br />
          해당 영화는 <strong>BASIC 등급</strong>으로 저장되며,
          <br />
          상영 여부는 영화 관리 화면에서 제어합니다.
        </p>

        <div className="adH-form-row">
          <label className="adH-label">영화 제목 *</label>
          <input
            type="text"
            className="adH-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="adH-form-row">
          <label className="adH-label">영화 설명</label>
          <textarea
            className="adH-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="adH-form-row">
          <label className="adH-label">상영 시간 (분)</label>
          <input
            type="number"
            className="adH-input"
            value={runtimeMin}
            onChange={(e) => setRuntimeMin(e.target.value)}
          />
        </div>

        <div className="adH-form-row">
          <label className="adH-label">개봉일 *</label>

          <div className="adH-date-wrap">
            {/* 수기 입력 */}
            <input
              type="text"
              className="adH-input"
              placeholder="YYYY-MM-DD (예: 2018-02-28)"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />

            {/* 날짜 선택 */}
            <input
              type="date"
              className="adH-input adH-date-picker"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />
          </div>
        </div>


        <div className="adH-form-row">
          <label className="adH-label">포스터 URL</label>
          <input
            type="text"
            className="adH-input"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
          />
        </div>

        <button
          className="adH-btn"
          onClick={handleCreateMovie}
          disabled={createLoading}
        >
          {createLoading ? "영화 등록 중..." : "영화 등록"}
        </button>

        {createMsg && <p className="adH-result">{createMsg}</p>}
      </section>
    </div>
  );
}
