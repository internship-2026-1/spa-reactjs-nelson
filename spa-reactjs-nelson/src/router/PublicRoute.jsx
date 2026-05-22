import { Navigate } from "react-router-dom";

import { useAuth } from "./providers/AuthProvider.jsx";

export function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  if (user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/orders" replace />;
}