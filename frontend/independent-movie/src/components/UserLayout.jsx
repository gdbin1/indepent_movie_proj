import "./UserLayout.css";

export default function UserLayout({ children }) {
    return (
        <div className="user-layout">
            {/* ================= HEADER ================= */}
            <header className="user-header">
                <div className="container user-header-inner">
                    <h1 className="user-logo">Independent Movie</h1>

                    <nav className="user-nav">
                        <span>영화</span>
                        <span>공간</span>
                        <span>예약</span>
                    </nav>

                    <div className="user-auth">
                        <button className="btn-text">로그인</button>
                        <button className="btn-text">회원가입</button>
                    </div>
                </div>
            </header>


            {/* ================= MAIN ================= */}
            <main className="user-layout-main">
                {children}
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="footer">
                <div className="container footer-inner">
                    <span>© Independent Movie</span>
                    <span>프라이빗 영화관 예약 서비스</span>
                </div>
            </footer>
        </div>
    );
}
