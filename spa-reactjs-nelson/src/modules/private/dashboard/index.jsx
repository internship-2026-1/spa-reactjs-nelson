// src/modules/private/dashboard/index.jsx

import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "lib-components-react";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../../store/slices/productsSlice.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value || 0));
}

function StatusBadge({ stock }) {
  const isAvailable = stock > 0;

  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-bold",
        isAvailable
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700",
      ].join(" ")}
    >
      {isAvailable ? "Activo" : "Agotado"}
    </span>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const availableStock = products.reduce(
      (total, product) => total + Number(product.stock || 0),
      0
    );
    const inventoryValue = products.reduce(
      (total, product) =>
        total + Number(product.price || 0) * Number(product.stock || 0),
      0
    );
    const outOfStock = products.filter((product) => product.stock <= 0).length;

    return [
      {
        label: "Productos",
        value: totalProducts,
        sub: "en catálogo",
        path: "/productos",
        color: "border-blue-600",
      },
      {
        label: "Stock disponible",
        value: availableStock,
        sub: "unidades",
        path: "/productos",
        color: "border-green-600",
      },
      {
        label: "Sin stock",
        value: outOfStock,
        sub: "productos agotados",
        path: "/productos",
        color: "border-red-600",
      },
      {
        label: "Valor inventario",
        value: formatCurrency(inventoryValue),
        sub: "estimado",
        path: "/productos",
        color: "border-orange-500",
      },
    ];
  }, [products]);

  const columns = [
    {
      key: "name",
      header: "PRODUCTO",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-900">{row.name}</p>
          <p className="text-xs text-slate-400">{row.description}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "CATEGORÍA",
      render: (row) => (
        <span className="rounded bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700">
          {row.category}
        </span>
      ),
    },
    {
      key: "reference",
      header: "REFERENCIA",
      render: (row) => (
        <span className="font-mono text-xs text-slate-500">
          {row.reference}
        </span>
      ),
    },
    {
      key: "stock",
      header: "STOCK",
    },
    {
      key: "price",
      header: "PRECIO",
      render: (row) => formatCurrency(row.price),
    },
    {
      key: "status",
      header: "ESTADO",
      render: (row) => <StatusBadge stock={row.stock} />,
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          Panel principal
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
          Bienvenido, {user?.name || user?.email || "Admin"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Resumen general del inventario y productos disponibles.
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.path}
            className={[
              "rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
              "border-l-4",
              stat.color,
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
          <div>
            <h2 className="text-lg font-medium text-slate-900">
              Gestión de Inventario
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Productos obtenidos desde el backend.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => dispatch(fetchProducts())}
              disabled={loading}
              className="!h-10 !rounded-md !border !border-slate-300 !bg-white !px-4 !text-sm !font-medium !normal-case !text-slate-700"
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </Button>

            <Link to="/productos">
              <Button
                type="button"
                variant="primary"
                className="!h-10 !rounded-md !px-4 !text-sm !font-medium !normal-case"
              >
                Ver productos
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-sm text-slate-500">
            Cargando productos...
          </div>
        ) : (
          <Table
            data={products.slice(0, 5)}
            columns={columns}
            keyField="id"
            itemsPerPage={5}
            emptyMessage="No hay productos disponibles."
          />
        )}
      </section>
    </section>
  );
}