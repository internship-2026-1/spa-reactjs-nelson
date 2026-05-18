import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <p>Esta es la página pública de inicio de sesión.</p>

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}