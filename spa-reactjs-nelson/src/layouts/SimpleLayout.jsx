import { Outlet } from "react-router-dom";

export function SimpleLayout() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Outlet />
    </div>
  );
}