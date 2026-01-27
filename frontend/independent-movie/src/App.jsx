import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= Layout ================= */
import UserLayout from "./components/UserLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

/* ================= Auth ================= */
import AuthPage from "./pages/auth/AuthPage.jsx";
import { AdminGuard } from "./router/AuthGuard";

/* ================= USER Pages ================= */
import Home from "./pages/Home/Home.jsx";
import MovieList from "./pages/movie/MovieList.jsx";
import MovieDetail from "./pages/movie/MovieDetail.jsx";
import ReservePage from "./pages/reserve/ReservePage.jsx";
import SeatSelect from "./pages/seat/SeatSelect.jsx";
import ReservationComplete from "./pages/reserve/ReservationComplete";
import MyPage from "./pages/mypage/MyPage.jsx";
/* ================= ADMIN Pages ================= */
import AdminMain from "./pages/admin/AdminMain.jsx";
import AdminHome from "./pages/admin/home/AdminHome.jsx";
import AdminMovie from "./pages/admin/movie/AdminMovie.jsx";
import AdminRoomPage from "./pages/admin/room/AdminRoomPage.jsx";
import AdminSchedule from "./pages/admin/schedule/AdminSchedule.jsx";
import AdminReservationPage from "./pages/admin/reservation/AdminReservationPage.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 / 회원가입 */}
        <Route path="/login" element={<AuthPage />} />

        {/* ================= USER (공개 영역) ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/reserve/:movieId" element={<ReservePage />} />
          <Route path="/reserve/seat/:scheduleId" element={<SeatSelect />} />
          <Route path="/reserve/complete/:reservationId" element={<ReservationComplete />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* ================= ADMIN (제한 영역) ================= */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminMain />} />
            <Route path="movie/add" element={<AdminHome />} />
            <Route path="movie" element={<AdminMovie />} />
            <Route path="room" element={<AdminRoomPage />} />
            <Route path="schedule" element={<AdminSchedule />} />
            <Route path="/admin/reservations" element={<AdminReservationPage />} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
