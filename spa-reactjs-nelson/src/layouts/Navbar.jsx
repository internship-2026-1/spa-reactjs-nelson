// src/layouts/Navbar.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "lib-components-react";

import { useAuth } from "../router/providers/AuthProvider.jsx";

const CartIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="h-4 w-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

function getLinkClass(pathname, targetPath) {
  const isActive = pathname === targetPath;

  return [
    "flex h-full items-center border-b-2 px-1 text-sm transition",
    isActive
      ? "border-blue-600 font-bold text-blue-600"
      : "border-transparent text-slate-600 hover:text-blue-600",
  ].join(" ");
}

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b border-slate-200 bg-[#f4f7fb]/95 backdrop-blur"
    >
      <div className="mx-auto flex h-[58px] max-w-[1110px] items-center justify-between px-6">
        <div className="flex h-full items-center gap-12">
          <Link
            to="/dashboard"
            className="text-2xl font-extrabold tracking-[-0.05em] text-slate-950"
          >
            TECHSPEC
          </Link>

          <nav
            aria-label="Navegación principal de la aplicación"
            className="hidden h-full items-center gap-9 md:flex"
          >
            <Link
              to="/dashboard"
              className={getLinkClass(location.pathname, "/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/perfil"
              className={getLinkClass(location.pathname, "/perfil")}
            >
              Perfil
            </Link>

            <Link to="/" className={getLinkClass(location.pathname, "/")}>
              Catálogo
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden h-9 w-[270px] items-center gap-3 rounded border border-slate-300 bg-white px-4 lg:flex">
            <SearchIcon />

            <input
              type="text"
              placeholder="Buscar hardware..."
              className="w-full bg-transparent text-xs text-slate-600 outline-none placeholder:text-slate-400"
            />
          </div>

          <button
            type="button"
            className="text-slate-700 transition hover:text-blue-600"
            aria-label="Carrito"
          >
            <CartIcon />
          </button>

          <Link
            to="/perfil"
            className="text-slate-700 transition hover:text-blue-600"
            aria-label="Perfil"
            title={user?.email || "Perfil"}
          >
            <UserIcon />
          </Link>

          <Button
            type="button"
            variant="secondary"
            onClick={handleLogout}
            className="!hidden !h-9 !rounded !px-4 !text-xs !font-bold !normal-case md:!inline-flex"
          >
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}