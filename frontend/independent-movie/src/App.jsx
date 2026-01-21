import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= Layout ================= */
import UserLayout from "./components/UserLayout.jsx";

/* ================= USER Pages ================= */
import Home from "./pages/Home/Home.jsx";
import MovieList from "./pages/movie/MovieList.jsx";
import MovieDetail from "./pages/movie/MovieDetail.jsx";

/* ================= ADMIN Pages ================= */
import AdminHome from "./pages/admin/home/AdminHome.jsx";
import AdminMovie from "./pages/admin/movie/AdminMovie.jsx";

/* ================= ADMIN ROUTE GUARD ================= */
function AdminRoute({ children }) {
  const role = localStorage.getItem("role")?.trim().toUpperCase();

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/space" element={<Home />} />
          <Route path="/reservation" element={<Home />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/home"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/movie"
          element={
            <AdminRoute>
              <AdminMovie />
            </AdminRoute>
          }
        />

        {/* ================= NOT FOUND ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
