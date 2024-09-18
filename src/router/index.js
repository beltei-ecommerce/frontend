import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./guards.js";

// Authentication
import AuthPage from "../common/auth/AuthPage.js";

// Admin
import AdminHomePage from "../pages/admin/AdminHomePage.js";
import AdminProductPage from "../pages/admin/product/AdminProductPage.js";
import ProductEditPage from "../pages/admin/product/ProductEditPage.js";
import AdminCategoryPage from "../pages/admin/category/AdminCategoryPage.js";
import CategoryEditPage from "../pages/admin/category/CategoryEditPage.js";

// User
import HomePage from "../pages/home/HomePage.js";
import CartPage from "../pages/home/CartPage.js";

export default function InitRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      {/* USER ---------------------- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* ADMIN ---------------------- */}
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
        path="/admin/product/:id"
        element={
          <ProtectedRoutes>
            <ProductEditPage />
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
