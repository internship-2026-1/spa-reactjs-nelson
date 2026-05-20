import { Link } from "react-router-dom";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <main>
      <h1>Página de inicio</h1>

      <p>Esta es una página pública accesible sin autenticación.</p>

      {isAuthenticated ? (
        <>
          <p>Sesión activa: {user?.email || user?.name || "Usuario autenticado"}</p>

          <button type="button" onClick={logout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <p>No hay sesión activa.</p>

          <Link to="/login">Ir a Login</Link>
        </>
      )}
    </main>
  );
}