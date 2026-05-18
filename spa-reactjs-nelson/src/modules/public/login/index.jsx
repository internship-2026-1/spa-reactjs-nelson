import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();

  const handleLogin = () => {
    login("fake-jwt-token", {
      id: 1,
      name: "Usuario Demo",
      email: "demo@email.com",
      token: "fake-jwt-token",
    });

    navigate("/");
  };

  return (
    <main>
      <h1>Login</h1>

      <p>Esta es la página pública de inicio de sesión.</p>

      {isAuthenticated ? (
        <p>Usuario autenticado: {user?.email || "Sin correo"}</p>
      ) : (
        <p>No hay sesión activa.</p>
      )}

      <button type="button" onClick={handleLogin}>
        Iniciar sesión mock
      </button>

      <br />
      <br />

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}