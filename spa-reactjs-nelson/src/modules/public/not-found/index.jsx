import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main>
            <h1>404 - Página no encontrada</h1>
            <Link to="/">Regresar al inicio</Link>
        </main>
    );
}