import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fb] text-slate-950">
      <Navbar />

      <main role="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}