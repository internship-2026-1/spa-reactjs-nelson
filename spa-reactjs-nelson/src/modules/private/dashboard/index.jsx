import { Link } from "react-router-dom";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Bienvenido, {user?.name || "Usuario"}.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">Estado</h2>
            <p className="mt-2 text-sm text-slate-600">Sesión activa</p>
          </article>

          <article className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">Correo</h2>
            <p className="mt-2 text-sm text-slate-600">{user?.email}</p>
          </article>

          <article className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">Rol</h2>
            <p className="mt-2 text-sm text-slate-600">{user?.role}</p>
          </article>
        </div>

        <div className="mt-8">
          <Link className="text-blue-600 hover:underline" to="/perfil">
            Ir a mi perfil
          </Link>
        </div>
      </div>
    </section>
  );
}