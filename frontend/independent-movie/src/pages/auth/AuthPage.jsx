import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./AuthPage.css";

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup

  // common
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup only
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= 이미 로그인된 경우 접근 차단 ================= */
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") navigate("/admin", { replace: true });
    if (role === "USER") navigate("/", { replace: true });
  }, [navigate]);

  /* ================= 로그인 ================= */
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { userId, role, name } = res.data;

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", name);

      if (role === "ADMIN") navigate("/admin", { replace: true });
      else navigate("/", { replace: true });
    } catch (e) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= 회원가입 ================= */
  const handleSignup = async () => {
    setError("");

    if (!email || !password || !name || !phone) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/signup", {
        email,
        password,
        name,
        phone,
      });

      setMode("login");
      setPassword("");
      setError("회원가입이 완료되었습니다. 로그인해주세요.");
    } catch (e) {
      setError(
        e?.response?.data || "회원가입 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= submit handler ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    if (mode === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="aP-wrap">
      <div className="aP-card">
        <h2 className="aP-title">
          {mode === "login" ? "로그인" : "회원가입"}
        </h2>

        {/* 🔥 form으로 감싸서 Enter 지원 */}
        <form className="aP-form" onSubmit={handleSubmit}>
          <input
            className="aP-input"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="aP-input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mode === "signup" && (
            <>
              <input
                className="aP-input"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="aP-input"
                type="tel"
                placeholder="휴대폰 번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </>
          )}

          {error && <p className="aP-error">{error}</p>}

          <button
            className="aP-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? mode === "login"
                ? "로그인 중..."
                : "가입 중..."
              : mode === "login"
              ? "로그인"
              : "회원가입"}
          </button>
        </form>

        <div className="aP-switch">
          {mode === "login" ? (
            <>
              계정이 없으신가요?
              <button type="button" onClick={() => setMode("signup")}>
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?
              <button type="button" onClick={() => setMode("login")}>
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
