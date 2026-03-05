import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BikeDetails from "./pages/BikeDetails";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import MyBooking from "./pages/MyBooking";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bike/:id" element={<BikeDetails />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            userInfo?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
