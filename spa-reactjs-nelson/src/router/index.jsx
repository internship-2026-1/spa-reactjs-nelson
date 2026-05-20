import { Routes, Route } from "react-router-dom";

import { SimpleLayout, MainLayout } from "../layouts";

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

      {/* Rutas privadas con navbar + footer */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}