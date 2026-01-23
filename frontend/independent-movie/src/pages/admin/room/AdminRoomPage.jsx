import { useEffect, useState } from "react";
import api from "../../../api";
import "./AdminRoomPage.css";

export default function AdminRoomPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    roomCode: "",
    roomName: "",
    roomType: "",
    capacityMin: "",
    capacityMax: "",
    basePrice: "",
    theme: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/rooms");
      setRooms(res.data || []);
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "방 목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    const {
      roomCode,
      roomName,
      roomType,
      capacityMin,
      capacityMax,
      basePrice,
      theme,
      description,
      imageUrl,
    } = form;

    if (!roomCode || !roomName || !roomType || !capacityMin || !capacityMax || !basePrice) {
      alert("필수값(roomCode, roomName, roomType, 최소/최대 인원, 기본가격)을 입력해주세요.");
      return;
    }

    const payload = {
      roomCode: roomCode.trim(),
      roomName: roomName.trim(),
      roomType: roomType.trim(),
      capacityMin: Number(capacityMin),
      capacityMax: Number(capacityMax),
      basePrice: Number(basePrice),
      theme: theme?.trim() || null,
      description: description?.trim() || null,
      imageUrl: imageUrl?.trim() || null,
    };

    if (payload.capacityMin > payload.capacityMax) {
      alert("최소 인원은 최대 인원보다 클 수 없습니다.");
      return;
    }

    try {
      await api.post("/admin/rooms", payload);
      setForm({
        roomCode: "",
        roomName: "",
        roomType: "",
        capacityMin: "",
        capacityMax: "",
        basePrice: "",
        theme: "",
        description: "",
        imageUrl: "",
      });
      fetchRooms();
      alert("방 등록 완료");
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "방 등록 실패");
    }
  };

  const toggleActive = async (roomId, currentIsActive) => {
    const next = currentIsActive === 1 ? 0 : 1;
    try {
      await api.patch(`/admin/rooms/${roomId}/active`, null, {
        params: { isActive: next },
      });
      fetchRooms();
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "활성/비활성 변경 실패");
    }
  };

  return (
    <div className="aRP-page">
      <h1 className="aRP-title">Room 관리</h1>

      {/* 등록 폼 */}
      <div className="aRP-form">
        <input
          className="aRP-input"
          name="roomCode"
          placeholder="방 코드 (예: R-CP-A)"
          value={form.roomCode}
          onChange={handleChange}
        />
        <input
          className="aRP-input"
          name="roomName"
          placeholder="방 이름 (예: 커플룸 A)"
          value={form.roomName}
          onChange={handleChange}
        />
        <input
          className="aRP-input"
          name="roomType"
          placeholder="방 타입 (예: COUPLE / FAMILY)"
          value={form.roomType}
          onChange={handleChange}
        />

        <input
          className="aRP-input"
          name="capacityMin"
          type="number"
          placeholder="최소 인원"
          value={form.capacityMin}
          onChange={handleChange}
        />
        <input
          className="aRP-input"
          name="capacityMax"
          type="number"
          placeholder="최대 인원"
          value={form.capacityMax}
          onChange={handleChange}
        />
        <input
          className="aRP-input"
          name="basePrice"
          type="number"
          placeholder="기본 가격"
          value={form.basePrice}
          onChange={handleChange}
        />

        <input
          className="aRP-input"
          name="theme"
          placeholder="테마 (선택)"
          value={form.theme}
          onChange={handleChange}
        />
        <input
          className="aRP-input"
          name="imageUrl"
          placeholder="이미지 URL (선택)"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <input
          className="aRP-input aRP-input-wide"
          name="description"
          placeholder="설명 (선택)"
          value={form.description}
          onChange={handleChange}
        />

        <button className="aRP-btn primary" onClick={handleCreate}>
          방 등록
        </button>
      </div>

      {/* 목록 */}
      <div className="aRP-list">
        {loading && <p className="aRP-empty">불러오는 중...</p>}

        {!loading && rooms.length === 0 && (
          <p className="aRP-empty">등록된 방이 없습니다.</p>
        )}

        {rooms.map((room) => (
          <div
            key={room.roomId}
            className={`aRP-card ${room.isActive !== 1 ? "inactive" : ""}`}
          >
            <div className="aRP-card-info">
              <h3>
                {room.roomName} <span className="aRP-code">({room.roomCode})</span>
              </h3>
              <p>
                {room.capacityMin}~{room.capacityMax}인 /{" "}
                {(room.basePrice ?? 0).toLocaleString()}원
              </p>
              <p className="aRP-sub">
                {room.roomType}
                {room.theme ? ` · ${room.theme}` : ""}
              </p>

              <span className={`aRP-status ${room.isActive === 1 ? "active" : "inactive"}`}>
                {room.isActive === 1 ? "사용 중" : "비활성"}
              </span>
            </div>

            <div className="aRP-card-actions">
              <button
                className={`aRP-btn ${room.isActive === 1 ? "danger" : "primary"}`}
                onClick={() => toggleActive(room.roomId, room.isActive)}
              >
                {room.isActive === 1 ? "비활성" : "활성"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
