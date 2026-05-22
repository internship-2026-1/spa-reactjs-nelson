import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "lib-components-react";

import { useAuth } from "../router/providers/AuthProvider.jsx";

function getLinkClass(pathname, path) {
  const isActive = pathname === path;

  return [
    "rounded-md px-3 py-1.5 text-sm font-medium transition",
    isActive
      ? "bg-slate-100 text-blue-600"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

function getRoleLabel(role) {
  const labels = {
    admin: "Administrador",
    b2b: "Cliente B2B",
    b2c: "Cliente B2C",
  };

  return labels[role] || "Usuario";
}

export function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, menu, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-slate-200 bg-white"
    >
      <div className="mx-auto flex h-[60px] max-w-[1180px] items-center gap-4 px-6">
        <Link
          to={user?.role === "admin" ? "/dashboard" : "/orders"}
          className="mr-4 whitespace-nowrap text-[15px] font-extrabold tracking-[-0.02em] text-slate-950"
        >
          TECHSPEC Admin
        </Link>

        <nav
          aria-label="Navegación administrativa"
          className="hidden items-center gap-1 md:flex"
        >
          {menu?.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={getLinkClass(location.pathname, item.path)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {user && (
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-700">
                {user.name || user.email}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
                {getRoleLabel(user.role)}
              </p>
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handleLogout}
            className="!h-9 !rounded-md !border !border-slate-300 !bg-white !px-4 !text-sm !font-medium !normal-case !text-slate-700 hover:!bg-slate-100"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  );
}