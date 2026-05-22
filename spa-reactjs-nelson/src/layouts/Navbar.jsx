import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input } from "lib-components-react";

import { useAuth } from "../router/providers/AuthProvider.jsx";
import { selectCartCount } from "../store/slices/cartSlice.js";

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

const LogoutIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

function getLinkClass(pathname, targetPath) {
  const isActive =
    pathname === targetPath ||
    (targetPath === "/dashboard" && pathname.startsWith("/dashboard")) ||
    (targetPath === "/perfil" && pathname.startsWith("/perfil"));

  return [
    "flex h-full items-center border-b-2 px-1 text-sm transition",
    isActive
      ? "border-blue-600 font-bold text-blue-600"
      : "border-transparent text-slate-600 hover:text-blue-600",
  ].join(" ");
}

function getRoleLabel(role) {
  const labels = {
    admin: "Admin",
    b2b: "B2B",
    b2c: "B2C",
  };

  return labels[role] || "Usuario";
}

function getUserDisplayName(user) {
  if (!user) return "";

  return (
    user.name ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    user.username ||
    user.email ||
    "Usuario"
  );
}

export function Navbar({ showSearch = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const cartCount = useSelector(selectCartCount);

  const handleProfileClick = () => {
    if (user) {
      navigate("/perfil");
      return;
    }

    navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

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
            to="/"
            className="text-2xl font-extrabold tracking-[-0.05em] text-slate-950"
          >
            TECHSPEC
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden h-full items-center gap-9 md:flex"
          >
            <Link
              to="/dashboard"
              className={getLinkClass(location.pathname, "/dashboard")}
            >
              Sistemas
            </Link>

            <Link to="/" className={getLinkClass(location.pathname, "/")}>
              Componentes
            </Link>

            <Link
              to="/promociones"
              className={getLinkClass(location.pathname, "/promociones")}
            >
              Promociones
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="hidden h-9 w-[270px] items-center gap-3 rounded border border-slate-300 bg-white px-4 lg:flex">
              <SearchIcon />

              <Input
                type="text"
                placeholder="Buscar hardware..."
                className="!h-auto !w-full !border-0 !bg-transparent !p-0 !text-xs !text-slate-600 !outline-none placeholder:!text-slate-400"
              />
            </div>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handleCartClick}
            aria-label="Carrito"
            className="!relative !flex !h-9 !w-9 !items-center !justify-center !rounded !border-0 !bg-transparent !p-0 !text-slate-700 hover:!bg-transparent hover:!text-blue-600"
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleProfileClick}
            aria-label={user ? "Perfil de usuario" : "Iniciar sesión"}
            className={[
              "!inline-flex !h-9 !items-center !gap-2 !rounded !px-3 !text-slate-700 hover:!text-blue-600",
              user
                ? "!border !border-slate-200 !bg-white"
                : "!border-0 !bg-transparent !p-0 hover:!bg-transparent",
            ].join(" ")}
          >
            <UserIcon />

            {user && (
              <span className="hidden items-center gap-2 text-sm font-medium text-slate-700 sm:inline-flex">
                <span>{getUserDisplayName(user)}</span>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                  {getRoleLabel(user.role)}
                </span>
              </span>
            )}
          </Button>

          {user && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleLogout}
              className="!inline-flex !h-9 !items-center !gap-2 !rounded !border !border-slate-300 !bg-white !px-4 !text-xs !font-bold !normal-case !text-slate-700 hover:!text-blue-600"
            >
              <LogoutIcon />
              <span className="hidden lg:inline">Cerrar sesión</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}