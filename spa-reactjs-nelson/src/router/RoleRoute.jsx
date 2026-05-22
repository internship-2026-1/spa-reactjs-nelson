import { Navigate } from "react-router-dom";

import { useAuth } from "./providers/AuthProvider.jsx";

export function RoleRoute({ allowedRoles = [], children }) {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">
        <p className="text-sm text-slate-500">Validando permisos...</p>
      </div>
    );
  }

  if (!allowedRoles.includes(user?.role)) {
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/orders" replace />;
  }

  return children;
}