import { Link, useLocation } from "react-router-dom";
import { Button } from "lib-components-react";

import { Navbar, Footer } from "../../../../layouts";

export default function CheckoutSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || "—";

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Navbar showSearch />

      <section className="mx-auto flex max-w-[760px] items-center justify-center px-6 py-20">
        <div className="w-full rounded-xl border border-slate-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
            <svg
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.05em]">
            ¡Pedido confirmado!
          </h1>

          <p className="mx-auto mt-3 max-w-[520px] text-sm leading-relaxed text-slate-500">
            Gracias por tu compra. La orden fue creada en el backend y el pago
            fue simulado correctamente.
          </p>

          <div className="mx-auto mt-8 max-w-[420px] rounded-lg bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Número de pedido
            </p>
            <p className="mt-2 break-all font-mono text-sm font-semibold text-blue-600">
              {orderId}
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/">
              <Button
                type="button"
                variant="primary"
                className="!h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
              >
                Seguir comprando
              </Button>
            </Link>

            <Link to="/orders">
              <Button
                type="button"
                variant="secondary"
                className="!h-11 !rounded-md !border !border-slate-300 !bg-white !px-6 !text-sm !font-bold !normal-case !text-slate-700"
              >
                Ver mis pedidos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}