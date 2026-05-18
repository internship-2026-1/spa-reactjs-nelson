import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h1>Página de inicio</h1>
      <p>Esta es una página pública accesible sin autenticación.</p>

      <Link to="/login">Ir a Login</Link>
    </main>
  );
}