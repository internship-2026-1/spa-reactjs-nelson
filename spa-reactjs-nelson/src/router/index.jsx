import { Routes, Route } from "react-router-dom";
import Products from "../modules/private/products";
import { SimpleLayout, MainLayout } from "../layouts";
import Register from "../modules/public/register";
import PasswordResetRequest from "../modules/public/password-reset/request";
import PasswordResetConfirm from "../modules/public/password-reset/confirm";

import Home from "../modules/public/home";
import Login from "../modules/public/login";
import NotFound from "../modules/public/not-found";

import Dashboard from "../modules/private/dashboard";
import Perfil from "../modules/private/perfil";

import { PrivateRoute } from "./PrivateRoute.jsx";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<SimpleLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<PasswordResetRequest />} />
        <Route path="/new-password" element={<PasswordResetConfirm />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/productos" element={<Products />} />
      </Route>
    </Routes>
  );
}
