import { Outlet } from "react-router-dom";

import { AdminNavbar } from "./AdminNavbar.jsx";
import { Footer } from "./Footer.jsx";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7fb] text-slate-950">
      <AdminNavbar />

      <main role="main" className="flex-1 px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}