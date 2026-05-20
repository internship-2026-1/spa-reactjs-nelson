import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "lib-components-react";

import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../../store/slices/productsSlice.js";

const SearchIcon = () => (
  <svg
    className="h-4 w-4 text-slate-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const RefreshIcon = () => (
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
    <path d="M21 12a9 9 0 0 1-15.6 6" />
    <path d="M3 12a9 9 0 0 1 15.6-6" />
    <path d="M3 3v6h6" />
    <path d="M21 21v-6h-6" />
  </svg>
);

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

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.reference.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [products, query]);

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
      render: (row) =>
        new Intl.NumberFormat("es-GT", {
          style: "currency",
          currency: "GTQ",
        }).format(row.price),
    },
    {
      key: "status",
      header: "ESTADO",
      render: (row) => <StatusBadge stock={row.stock} />,
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]">
      <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Administración
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
            Productos
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Gestión de inventario sincronizada con el backend.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => dispatch(fetchProducts())}
          disabled={loading}
          className="!h-11 !rounded-md !border !border-slate-300 !bg-white !px-5 !text-sm !font-medium !normal-case !text-slate-700"
        >
          <span className="inline-flex items-center gap-2">
            <RefreshIcon />
            {loading ? "Actualizando..." : "Actualizar"}
          </span>
        </Button>
      </header>

      <section className="overflow-hidden rounded-lg border border-slate-300 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-300 px-6 py-5 md:flex-row md:items-center">
          <h2 className="text-lg font-medium text-slate-900">
            Gestión de Inventario
          </h2>

          <div className="flex h-10 w-full items-center gap-2 rounded bg-slate-100 px-3 md:w-[300px]">
            <SearchIcon />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar producto..."
              className="!h-auto !w-full !border-0 !bg-transparent !p-0 !text-sm !outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="px-6 py-10 text-sm text-slate-500">
            Cargando productos...
          </div>
        ) : (
          <Table
            data={filteredProducts}
            columns={columns}
            keyField="id"
            itemsPerPage={10}
            emptyMessage="No hay productos disponibles."
          />
        )}
      </section>
    </section>
  );
}