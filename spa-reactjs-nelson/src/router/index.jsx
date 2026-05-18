import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../modules/public/home";
import Login from "../modules/public/login";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}