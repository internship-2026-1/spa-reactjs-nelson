import { Link } from "react-router-dom";
import { Button } from "lib-components-react";

const WarningIcon = () => (
  <svg
    className="h-12 w-12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6 py-12">
      <section className="w-full max-w-[880px] overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-blue-600 p-8 text-white">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-[-80px] top-[-80px] h-64 w-64 rounded-full border border-white" />
              <div className="absolute bottom-[-110px] right-[-90px] h-80 w-80 rounded-full border border-white" />
              <div className="absolute bottom-20 left-20 h-28 w-28 rounded-full border border-white" />
            </div>

            <div className="relative z-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-100">
                TECHSPEC SYSTEM
              </p>

              <h1 className="mt-10 text-[92px] font-extrabold leading-none tracking-[-0.08em]">
                404
              </h1>
            </div>

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                Ruta no encontrada
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <WarningIcon />
            </div>

            <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-[-0.05em] text-slate-950">
              Página no encontrada.
            </h2>

            <p className="mt-4 max-w-[440px] text-base leading-relaxed text-slate-600">
              La ruta que intentaste abrir no existe o fue movida. Puedes volver
              al catálogo público o iniciar sesión.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/">
                <Button
                  type="button"
                  variant="primary"
                  className="!h-12 !rounded !px-6 !text-sm !font-bold !normal-case"
                >
                  <span className="inline-flex items-center gap-2">
                    <ArrowLeftIcon />
                    Volver al inicio
                  </span>
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  type="button"
                  variant="secondary"
                  className="!h-12 !rounded !px-6 !text-sm !font-bold !normal-case"
                >
                  Iniciar sesión
                </Button>
              </Link>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Error code: route_not_found
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}