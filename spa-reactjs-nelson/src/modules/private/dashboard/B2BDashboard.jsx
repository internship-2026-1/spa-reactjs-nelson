import { Link } from "react-router-dom";
import { Button } from "lib-components-react";

export default function B2BDashboard({ user }) {
  const cards = [
    {
      title: "Catálogo empresarial",
      value: "B2B",
      description: "Consulta productos disponibles para compras empresariales.",
      path: "/",
      color: "border-blue-600",
    },
    {
      title: "Órdenes empresariales",
      value: "0",
      description: "Gestiona compras por volumen y solicitudes pendientes.",
      path: "/dashboard",
      color: "border-orange-500",
    },
    {
      title: "Perfil de empresa",
      value: "Activo",
      description: "Revisa los datos asociados a tu cuenta B2B.",
      path: "/perfil",
      color: "border-green-600",
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]">
      <header className="mb-8 overflow-hidden rounded-xl border border-slate-300 bg-slate-950 p-8 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
          Panel cliente B2B
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em]">
          Bienvenido, {user?.name || user?.email || "empresa"}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          Accede a herramientas de compra empresarial, catálogo técnico y
          gestión de solicitudes comerciales.
        </p>

        <Link to="/">
          <Button
            type="button"
            variant="primary"
            className="mt-6 !h-11 !rounded-md !px-5 !text-sm !font-bold !normal-case"
          >
            Ver catálogo empresarial
          </Button>
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className={[
              "rounded-lg border border-slate-200 border-l-4 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
              card.color,
            ].join(" ")}
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
          Solicitudes recientes
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Todavía no hay solicitudes empresariales registradas.
        </p>
      </section>
    </section>
  );
}