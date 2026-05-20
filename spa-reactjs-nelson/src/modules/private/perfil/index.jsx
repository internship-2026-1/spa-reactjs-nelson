import { Link } from "react-router-dom";
import { Button } from "lib-components-react";
import { useAuth } from "../../../router/providers/AuthProvider.jsx";

export default function Perfil() {
  const { user, token, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Perfil</h1>
            <p className="mt-2 text-slate-600">
              Información del usuario autenticado.
            </p>
          </div>

          <Button type="button" variant="secondary" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-500">Nombre</p>
            <p className="mt-1 text-slate-900">{user?.name}</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-500">Correo</p>
            <p className="mt-1 text-slate-900">{user?.email}</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-500">Rol</p>
            <p className="mt-1 text-slate-900">{user?.role}</p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-500">JWT</p>
            <p className="mt-1 break-all text-slate-900">{token}</p>
          </div>
        </div>

        <div className="mt-8">
          <Link className="text-blue-600 hover:underline" to="/dashboard">
            Volver al dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}