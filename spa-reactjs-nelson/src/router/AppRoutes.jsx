import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../modules/public/login/index.jsx";
import Dashboard from "../modules/private/dashboard/index.jsx";
import Perfil from "../modules/private/perfil/index.jsx";

import { PrivateRoute } from "./PrivateRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />

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

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}