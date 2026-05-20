// src/router/index.jsx

import { Routes, Route } from "react-router-dom";

import { SimpleLayout } from "../layouts/SimpleLayout.jsx";

import Home from "../modules/public/home";
import Login from "../modules/public/login";
import NotFound from "../modules/public/not-found";

import Dashboard from "../modules/private/dashboard";
import Perfil from "../modules/private/perfil";

import { PrivateRoute } from "./PrivateRoute.jsx";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas sin navbar/footer global */}
      <Route element={<SimpleLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Rutas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}