import { createContext, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  logoutSession,
  selectAuth,
  setSession,
} from "../../store/slices/authSlice.js";

const AuthContext = createContext(null);

const menusByRole = {
  admin: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Productos", path: "/productos" },
    { name: "Categorías", path: "/categorias" },
    { name: "Pedidos", path: "/pedidos" },
    { name: "Usuarios", path: "/usuarios" },
    { name: "Integración", path: "/integracion" },
  ],
  b2c: [{ name: "Mis pedidos", path: "/orders" }],
  b2b: [{ name: "Mis pedidos", path: "/orders" }],
};

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const login = (accessToken, userData, refreshToken = null) => {
    dispatch(
      setSession({
        accessToken,
        refreshToken,
        user: userData,
      })
    );
  };

  const logout = () => {
    dispatch(logoutSession());
  };

  const role = auth.user?.role || null;
  const menu = role ? menusByRole[role] || menusByRole.b2c : null;

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.accessToken,
      refreshToken: auth.refreshToken,
      role,
      menu,
      isAuthenticated: auth.isAuthenticated,
      isAuthReady: auth.isAuthReady,
      loading: auth.loading,
      error: auth.error,
      login,
      logout,
    }),
    [auth, role, menu]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}