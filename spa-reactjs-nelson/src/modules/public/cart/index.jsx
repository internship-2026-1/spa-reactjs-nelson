import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, InfoCard, Sumador } from "lib-components-react";

import { Navbar, Footer } from "../../../layouts";

import {
  removeItem,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
} from "../../../store/slices/cartSlice.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value || 0));
}

function TrashIcon() {
  return (
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function ProductPlaceholder() {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-slate-200">
      <span className="text-xs font-extrabold text-slate-400">TECH</span>
    </div>
  );
}

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Navbar showSearch />

      <section className="mx-auto max-w-[1110px] px-6 py-10">
        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            TECHSPEC Checkout
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em]">
            Tu carrito de compra
          </h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {items.length === 0 && (
              <div className="rounded-xl border border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-slate-950">
                  Tu carrito está vacío
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Explora el catálogo y agrega componentes a tu compra.
                </p>

                <Link to="/">
                  <Button
                    type="button"
                    variant="primary"
                    className="mt-6 !h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
                  >
                    Ir al catálogo
                  </Button>
                </Link>
              </div>
            )}

            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-5 rounded-xl border border-slate-300 bg-white p-5 md:flex-row md:items-center"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded object-cover"
                  />
                ) : (
                  <ProductPlaceholder />
                )}

                <div className="flex-1">
                  <h2 className="font-semibold text-slate-950">{item.name}</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.reference} · {item.category}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Sumador
                    value={item.quantity}
                    min={1}
                    max={item.stock || 99}
                    onChange={(quantity) =>
                      dispatch(updateQuantity({ id: item.id, quantity }))
                    }
                  />

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => dispatch(removeItem(item.id))}
                    className="!h-9 !rounded-md !border !border-red-200 !bg-red-50 !px-3 !text-xs !font-bold !normal-case !text-red-600"
                  >
                    <span className="inline-flex items-center gap-2">
                      <TrashIcon />
                      Eliminar
                    </span>
                  </Button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-xl border border-slate-300 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-950">
              Resumen del pedido
            </h2>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({count} producto{count !== 1 ? "s" : ""})</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Envío estimado</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
            </div>

            <div className="my-6 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-slate-950">
                {formatCurrency(total)}
              </span>
            </div>

            <Button
  type="button"
  variant="primary"
  size="full"
  disabled={items.length === 0}
  onClick={() => navigate("/checkout")}
>
  Proceder al pago
</Button>

            <div className="mt-5">
              <InfoCard
                title="Pago simulado"
                description=""
              />
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}