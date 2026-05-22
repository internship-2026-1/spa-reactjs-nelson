import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar, Table } from "lib-components-react";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";

import {
  fetchOrders,
  selectAllOrders,
  selectMyOrders,
  selectOrdersError,
  selectOrdersLoading,
} from "../../../store/slices/ordersSlice.js";

const STATUS_LABELS = {
  pending: "Pendiente",
  paid: "Pagado",
  cancelled: "Cancelado",
};

const STATUS_COLORS = {
  pending: {
    background: "#fffbeb",
    color: "#b45309",
  },
  paid: {
    background: "#dcfce7",
    color: "#15803d",
  },
  cancelled: {
    background: "#fee2e2",
    color: "#dc2626",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value || 0));
}

function StatusBadge({ status }) {
  const style = STATUS_COLORS[status] || {
    background: "#f3f4f6",
    color: "#6b7280",
  };

  return (
    <span
      style={{
        ...style,
        padding: "3px 9px",
        borderRadius: "99px",
        fontSize: "12px",
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export default function Orders() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [query, setQuery] = useState("");

  const allOrders = useSelector(selectAllOrders);
  const myOrders = useSelector(selectMyOrders(user?.email));
  const loading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const visibleOrders = user?.role === "admin" ? allOrders : myOrders;

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return visibleOrders;
    }

    return visibleOrders.filter((order) => {
      return (
        String(order.id).toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.status.toLowerCase().includes(q)
      );
    });
  }, [visibleOrders, query]);

  const columns =
    user?.role === "admin"
      ? [
          {
            key: "id",
            header: "# Pedido",
            render: (row) => (
              <span className="font-mono text-xs font-semibold text-blue-600">
                {String(row.id).slice(0, 8)}
              </span>
            ),
          },
          { key: "customer", header: "Cliente" },
          { key: "date", header: "Fecha" },
          { key: "itemsCount", header: "Ítems" },
          {
            key: "total",
            header: "Total",
            render: (row) => formatCurrency(row.total),
          },
          {
            key: "status",
            header: "Estado",
            render: (row) => <StatusBadge status={row.status} />,
          },
        ]
      : [
          {
            key: "id",
            header: "# Pedido",
            render: (row) => (
              <span className="font-mono text-xs font-semibold text-blue-600">
                {String(row.id).slice(0, 8)}
              </span>
            ),
          },
          { key: "date", header: "Fecha" },
          { key: "itemsCount", header: "Ítems" },
          {
            key: "total",
            header: "Total",
            render: (row) => formatCurrency(row.total),
          },
          {
            key: "status",
            header: "Estado",
            render: (row) => <StatusBadge status={row.status} />,
          },
        ];

  return (
    <section className="mx-auto max-w-[1180px]">
      <header className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            {user?.role === "admin" ? "Administración" : "Mi cuenta"}
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            {user?.role === "admin" ? "Pedidos" : "Mis pedidos"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {user?.role === "admin"
              ? "Pedidos obtenidos desde el backend."
              : "Pedidos asociados a tu correo de usuario."}
          </p>
        </div>

        <div className="w-full md:w-[320px]">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => {}}
            placeholder="Buscar…"
            buttonText="Buscar"
          />
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-300 bg-white px-6 py-10 text-sm text-slate-500">
          Cargando pedidos...
        </div>
      ) : (
        <Table
          data={filteredOrders}
          columns={columns}
          keyField="id"
          emptyMessage={
            query ? "No se encontraron pedidos." : "Aún no hay pedidos."
          }
          itemsPerPage={10}
        />
      )}
    </section>
  );
}