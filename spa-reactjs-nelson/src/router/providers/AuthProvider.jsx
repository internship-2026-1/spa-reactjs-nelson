import { createContext, useContext, useMemo, useState } from "react";

import { sessionStorageService } from "../../services/index.js";

const AuthContext = createContext(null);

const AUTH_TOKEN_KEY = "jwt";
const AUTH_USER_KEY = "user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = sessionStorageService.get(AUTH_TOKEN_KEY, null);
    const storedUser = sessionStorageService.get(AUTH_USER_KEY, null);

    if (!token) {
      return null;
    }

    return storedUser || { token };
  });

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),

      login: (token, userData = null) => {
        const authenticatedUser = userData || { token };

        sessionStorageService.set(AUTH_TOKEN_KEY, token);
        sessionStorageService.set(AUTH_USER_KEY, authenticatedUser);

        setUser(authenticatedUser);
      },

      logout: () => {
        sessionStorageService.remove(AUTH_TOKEN_KEY);
        sessionStorageService.remove(AUTH_USER_KEY);

        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return ctx;
}