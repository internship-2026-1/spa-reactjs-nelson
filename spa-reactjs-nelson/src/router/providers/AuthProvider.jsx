import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { sessionStorageService } from "../../services/index.js";

const AuthContext = createContext(null);

const AUTH_USER_KEY = "auth_user";
const AUTH_TOKEN_KEY = "jwt";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorageService.get(AUTH_USER_KEY, null);
    const storedToken = sessionStorageService.get(AUTH_TOKEN_KEY, null);

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setIsAuthReady(true);
  }, []);

  const login = (jwt, userData) => {
    sessionStorageService.set(AUTH_TOKEN_KEY, jwt);
    sessionStorageService.set(AUTH_USER_KEY, userData);

    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    sessionStorageService.remove(AUTH_TOKEN_KEY);
    sessionStorageService.remove(AUTH_USER_KEY);

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isAuthReady,
      login,
      logout,
    }),
    [user, token, isAuthReady]
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