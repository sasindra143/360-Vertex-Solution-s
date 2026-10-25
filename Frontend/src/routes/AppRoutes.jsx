import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "../pages/Home";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Web Development Pages
import WebDevelopment from "../pages/WebDevelopment/WebDevelopment";
import Consultation from "../pages/WebDevelopment/Consultation";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Web Development Service */}
      <Route path="/web-development" element={<WebDevelopment />} />
      <Route
        path="/web-development/consultation"
        element={<Consultation />}
      />
    </Routes>
  );
}
