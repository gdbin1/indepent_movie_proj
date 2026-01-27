import { useEffect, useMemo, useState } from "react";
import api from "../../../api";
import "./AdminUserManagePage.css";

export default function AdminUserManagePage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 검색/필터
    const [keyword, setKeyword] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL"); // ALL | USER | ADMIN

    // 🔒 로그인한 관리자 ID (본인 권한 변경 방지용)
    const loginUserId = Number(localStorage.getItem("userId"));


    // 권한 변경 UI 상태
    const [roleDraft, setRoleDraft] = useState({}); // { [userId]: "USER" | "ADMIN" }
    const [savingUserId, setSavingUserId] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get("/admin/users"); // => /api/admin/users
            const list = Array.isArray(res.data) ? res.data : [];
            setUsers(list);

            // 초기 draft 채우기
            const init = {};
            for (const u of list) init[u.userId] = u.role;
            setRoleDraft(init);
        } catch (e) {
            console.error("회원 목록 조회 실패", e);
            alert("회원 목록 조회에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        let result = [...users];

        if (roleFilter !== "ALL") {
            result = result.filter((u) => u.role === roleFilter);
        }

        if (keyword.trim()) {
            const k = keyword.trim().toLowerCase();
            result = result.filter(
                (u) =>
                    String(u.userId).includes(k) ||
                    (u.email || "").toLowerCase().includes(k) ||
                    (u.name || "").toLowerCase().includes(k) ||
                    (u.phone || "").toLowerCase().includes(k)
            );
        }

        return result;
    }, [users, keyword, roleFilter]);

    const formatDateTime = (iso) => {
        if (!iso) return "-";
        // "2026-01-27T12:51:30" 형태
        return iso.replace("T", " ");
    };

    const handleChangeDraft = (userId, nextRole) => {
        setRoleDraft((prev) => ({ ...prev, [userId]: nextRole }));
    };

    const handleApplyRole = async (user) => {
        const userId = user.userId;
        const nextRole = roleDraft[userId];

        if (!nextRole || (nextRole !== "USER" && nextRole !== "ADMIN")) {
            alert("권한 값이 올바르지 않습니다.");
            return;
        }

        if (nextRole === user.role) {
            alert("변경된 내용이 없습니다.");
            return;
        }

        const ok = window.confirm(
            `정말로 [${user.email}] 권한을 ${user.role} → ${nextRole} 로 변경하시겠습니까?`
        );
        if (!ok) return;

        setSavingUserId(userId);
        try {
            await api.put(`/admin/users/${userId}/role`, { role: nextRole });
            // 반영: 서버 재조회(안전)
            await fetchUsers();
            alert("권한이 변경되었습니다.");
        } catch (e) {
            console.error("권한 변경 실패", e);
            alert("권한 변경에 실패했습니다.");
        } finally {
            setSavingUserId(null);
        }
    };

    const roleBadgeClass = (role) => {
        if (role === "ADMIN") return "aUM-badge aUM-badge--admin";
        return "aUM-badge aUM-badge--user";
    };

    return (
        <div className="aUM-page">
            <div className="aUM-head">
                <div>
                    <h1 className="aUM-title">회원 관리</h1>
                    <p className="aUM-sub">
                        전체 회원을 조회하고 권한(USER / ADMIN)을 변경할 수 있습니다.
                    </p>
                </div>

                <button className="aUM-btn aUM-btn--ghost" onClick={fetchUsers}>
                    새로고침
                </button>
            </div>

            <div className="aUM-toolbar">
                <div className="aUM-toolbar-left">
                    <div className="aUM-field">
                        <label className="aUM-label">권한 필터</label>
                        <select
                            className="aUM-select"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="ALL">전체</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    <div className="aUM-field">
                        <label className="aUM-label">검색</label>
                        <input
                            className="aUM-input"
                            placeholder="ID / 이메일 / 이름 / 전화번호"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="aUM-toolbar-right">
                    <div className="aUM-count">
                        총 <b>{filteredUsers.length}</b>명
                    </div>
                </div>
            </div>

            <div className="aUM-card">
                {loading ? (
                    <div className="aUM-empty">불러오는 중...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="aUM-empty">조회 결과가 없습니다.</div>
                ) : (
                    <div className="aUM-table-wrap">
                        <table className="aUM-table">
                            <thead>
                                <tr>
                                    <th className="aUM-th aUM-th--id">ID</th>
                                    <th className="aUM-th">이메일</th>
                                    <th className="aUM-th">이름</th>
                                    <th className="aUM-th">전화번호</th>
                                    <th className="aUM-th aUM-th--role">현재 권한</th>
                                    <th className="aUM-th aUM-th--change">권한 변경</th>
                                    <th className="aUM-th aUM-th--btn">적용</th>
                                    <th className="aUM-th aUM-th--date">가입일</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((u) => {
                                    const draft = roleDraft[u.userId] || u.role;
                                    const isSaving = savingUserId === u.userId;
                                    const isChanged = draft !== u.role;
                                    const isSelf = u.userId === loginUserId;


                                    return (
                                        <tr key={u.userId} className="aUM-tr">
                                            <td className="aUM-td aUM-td--mono">{u.userId}</td>
                                            <td className="aUM-td">{u.email}</td>
                                            <td className="aUM-td">{u.name}</td>
                                            <td className="aUM-td aUM-td--mono">{u.phone || "-"}</td>

                                            <td className="aUM-td">
                                                <span className={roleBadgeClass(u.role)}>{u.role}</span>
                                            </td>

                                            <td className="aUM-td">
                                                <select
                                                    className="aUM-select aUM-select--inline"
                                                    value={draft}
                                                    onChange={(e) =>
                                                        handleChangeDraft(u.userId, e.target.value)
                                                    }
                                                    disabled={isSaving || isSelf}
                                                >

                                                    <option value="USER">USER</option>
                                                    <option value="ADMIN">ADMIN</option>
                                                </select>
                                                {isChanged && (
                                                    <span className="aUM-changed">변경됨</span>
                                                )}
                                            </td>

                                            <td className="aUM-td">
                                                <button
                                                    className="aUM-btn aUM-btn--primary"
                                                    onClick={() => handleApplyRole(u)}
                                                    disabled={isSaving || !isChanged}
                                                    title={!isChanged ? "변경된 내용이 없습니다" : ""}
                                                >
                                                    {isSaving ? "적용 중..." : "적용"}
                                                </button>
                                            </td>

                                            <td className="aUM-td aUM-td--mono">
                                                {formatDateTime(u.createdAt)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="aUM-footnote">
                <div className="aUM-note-title">주의</div>
                <ul className="aUM-note-list">
                    <li>권한 변경은 즉시 DB에 반영됩니다.</li>
                    <li>나중에 JWT를 붙이면, 이 API는 ROLE_ADMIN으로 보호하면 됩니다.</li>
                </ul>
            </div>
        </div>
    );
}
