import { Link } from "react-router-dom";
import { Button } from "lib-components-react";

export default function B2CDashboard({ user }) {
  const cards = [
    {
      title: "Catálogo disponible",
      value: "Explorar",
      description: "Revisa productos, componentes y accesorios TECHSPEC.",
      path: "/",
    },
    {
      title: "Mis pedidos",
      value: "0",
      description: "Consulta el estado de tus compras realizadas.",
      path: "/dashboard",
    },
    {
      title: "Soporte",
      value: "Activo",
      description: "Solicita ayuda sobre productos o compras.",
      path: "/perfil",
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]">
      <header className="mb-8 overflow-hidden rounded-xl border border-slate-300 bg-white p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Panel cliente B2C
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
          Hola, {user?.name || user?.email || "cliente"}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
          Desde este panel puedes explorar el catálogo, revisar tus compras y
          consultar tu información de perfil.
        </p>

        <Link to="/">
          <Button
            type="button"
            variant="primary"
            className="mt-6 !h-11 !rounded-md !px-5 !text-sm !font-bold !normal-case"
          >
            Explorar catálogo
          </Button>
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="block text-3xl font-bold tracking-[-0.04em] text-slate-950">
              {card.value}
            </span>
            <span className="mt-3 block text-sm font-semibold text-slate-900">
              {card.title}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-slate-500">
              {card.description}
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-lg border border-slate-300 bg-white p-6">
        <h2 className="text-lg font-medium text-slate-900">
          Actividad reciente
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Todavía no hay pedidos registrados para esta cuenta.
        </p>
      </section>
    </section>
  );
}