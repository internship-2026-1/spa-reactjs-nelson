import { createContext, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  logoutSession,
  selectAuth,
  setSession,
} from "../../store/slices/authSlice.js";

const AuthContext = createContext(null);

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

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.accessToken,
      refreshToken: auth.refreshToken,
      isAuthenticated: auth.isAuthenticated,
      isAuthReady: auth.isAuthReady,
      loading: auth.loading,
      error: auth.error,
      login,
      logout,
    }),
    [auth]
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