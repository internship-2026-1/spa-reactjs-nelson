import { Routes, Route } from "react-router-dom";

import Home from "../modules/public/home";
import Login from "../modules/public/login";
import NotFound from "../modules/public/not-found"

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}