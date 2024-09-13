import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./guards.js";

// Authentication
import AuthPage from "../common/auth/AuthPage.js";

// Admin
import AdminHomePage from "../pages/admin/AdminHomePage.js";
import AdminProductPage from "../pages/admin/product/AdminProductPage.js";
import AdminCategoryPage from "../pages/admin/category/AdminCategoryPage.js";
import CategoryEditPage from "../pages/admin/category/CategoryEditPage.js";

// User
import HomePage from "../pages/home/HomePage.js";

export default function InitRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      {/* <Route path="/" element={<HomePage />} /> */}

      <Route path="/" element={<HomePage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminHomePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/product"
        element={
          <ProtectedRoutes>
            <AdminProductPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/category"
        element={
          <ProtectedRoutes>
            <AdminCategoryPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/category/create"
        element={
          <ProtectedRoutes>
            <CategoryEditPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/category/:id"
        element={
          <ProtectedRoutes>
            <CategoryEditPage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
