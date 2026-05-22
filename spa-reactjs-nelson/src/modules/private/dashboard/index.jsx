import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";

import {
  fetchProducts,
  selectProducts,
} from "../../../store/slices/productsSlice.js";

import {
  fetchCategories,
  selectCategories,
} from "../../../store/slices/categoriesSlice.js";

import {
  fetchOrders,
  selectAllOrders,
  selectOrdersError,
  selectOrdersLoading,
} from "../../../store/slices/ordersSlice.js";

const mockUsersCount = 3;

const STATUS_LABELS = {
  pending: "Pendiente",
  paid: "Pagado",
  cancelled: "Cancelado",
};

const STATUS_COLORS = {
  pending: "bg-orange-50 text-orange-700",
  paid: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value || 0));
}

function StatusBadge({ status }) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-bold",
        STATUS_COLORS[status] || "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const orders = useSelector(selectAllOrders);
  const ordersLoading = useSelector(selectOrdersLoading);
  const ordersError = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
  }, [dispatch]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [orders]);

  const stats = [
    {
      label: "Productos",
      value: products.length,
      sub: "en catálogo",
      path: "/productos",
      mod: "border-blue-600",
    },
    {
      label: "Categorías",
      value: categories.length,
      sub: "registradas",
      path: "/categorias",
      mod: "border-purple-600",
    },
    {
      label: "Pedidos",
      value: orders.length,
      sub: "en total",
      path: "/pedidos",
      mod: "border-orange-500",
    },
    {
      label: "Usuarios",
      value: mockUsersCount,
      sub: "registrados",
      path: "/usuarios",
      mod: "border-green-600",
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Panel principal
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            Bienvenido, {user?.name || user?.email}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Resumen general de la plataforma.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.path}
            to={stat.path}
            className={[
              "rounded-lg border border-slate-200 border-l-4 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
              stat.mod,
            ].join(" ")}
          >
            <span className="block text-3xl font-bold tracking-[-0.04em] text-slate-950">
              {stat.value}
            </span>

            <span className="mt-3 block text-sm font-semibold text-slate-900">
              {stat.label}
            </span>

            <span className="mt-1 block text-xs text-slate-500">
              {stat.sub}
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-10 overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="flex items-center justify-between border-b border-slate-300 px-6 py-5">
          <h2 className="text-lg font-medium text-slate-900">
            Pedidos recientes
          </h2>

          <Link
            to="/pedidos"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {ordersError && (
          <div className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm font-medium text-red-600">
            {ordersError}
          </div>
        )}

        {ordersLoading ? (
          <div className="px-6 py-10 text-sm text-slate-500">
            Cargando pedidos...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4"># Pedido</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Ítems</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="bg-white">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-blue-600">
                      {String(order.id).slice(0, 8)}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {order.customer}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {order.date || "Sin fecha"}
                    </td>

                    <td className="px-6 py-4 text-slate-700">
                      {order.itemsCount}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}

                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No hay pedidos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}