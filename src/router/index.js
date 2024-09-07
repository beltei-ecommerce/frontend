import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./guards.js";

// Authentication
import AuthPage from "../common/auth/AuthPage.js";

// Admin
import AdminHomePage from "../pages/admin/AdminHomePage.js";

// User
import HomePage from "../pages/home/HomePage.js";

export default function InitRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route path="/" element={<HomePage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminHomePage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
