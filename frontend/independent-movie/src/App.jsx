import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import AdminHome from "./pages/admin/home/AdminHome.jsx";
import AdminMovie from "./pages/admin/movie/AdminMovie.jsx";


import NavigationUser from "./components/NavigationUser.jsx";
import NavigationAdmin from "./components/NavigationAdmin.jsx";

import MovieDetail from "./pages/movie/MovieDetail";

export default function App() {
  // ✅ role 정규화 (공백 / 대소문자 문제 방지)
  const role = localStorage.getItem("role")?.trim().toUpperCase();
  console.log("ROLE =", JSON.stringify(role));

  return (
    <BrowserRouter>
      {/* ================= Navigation ================= */}
      {role === "ADMIN" ? <NavigationAdmin /> : <NavigationUser />}

      {/* ================= Routes ================= */}
      <Routes>
        {/* ===== USER ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/reservation" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />

        {/* ===== ADMIN ROUTES ===== */}
        <Route
          path="/admin"
          element={
            role === "ADMIN" ? (
              <Navigate to="/admin/home" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/movie"
          element={role === "ADMIN" ? <AdminMovie /> : <Navigate to="/" replace />}
        />

        <Route
          path="/admin/home"
          element={role === "ADMIN" ? <AdminHome /> : <Navigate to="/" replace />}
        />

        {/* ===== NOT FOUND ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
