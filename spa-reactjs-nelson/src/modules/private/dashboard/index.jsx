import { Button, Input, Table } from "lib-components-react";

import rtx4080Image from "../../../assets/rtx4080.jpg";
import coreI9Image from "../../../assets/corei9.jpg";
import ddr5Image from "../../../assets/32GBDDR5.jpg";

const stats = [
  {
    id: 1,
    title: "VENTAS TOTALES",
    value: "€142,590",
    change: "+12.4%",
    changeType: "positive",
    icon: "money",
  },
  {
    id: 2,
    title: "STOCK DISPONIBLE",
    value: "1,240 UDS",
    change: "-4.2%",
    changeType: "negative",
    icon: "box",
  },
  {
    id: 3,
    title: "PEDIDOS PENDIENTES",
    value: "38",
    change: "+8.1%",
    changeType: "positive",
    icon: "basket",
  },
  {
    id: 4,
    title: "VALOR INVENTARIO",
    value: "€582K",
    change: "ESTABLE",
    changeType: "neutral",
    icon: "trend",
  },
];

const products = [
  {
    id: 1,
    product: {
      name: "RTX 4090 OC Edition",
      description: "24GB GDDR6X",
      image: rtx4080Image,
    },
    category: "GPU",
    sku: "TS-GPU-4090-01",
    stock: 12,
    price: "€1,849.00",
    status: "Activo",
    statusType: "active",
  },
  {
    id: 2,
    product: {
      name: "AMD Ryzen 9 7950X",
      description: "16 Cores / 32 Threads",
      image: coreI9Image,
    },
    category: "CPU",
    sku: "TS-CPU-R979-50",
    stock: 4,
    price: "€599.00",
    status: "Stock Bajo",
    statusType: "low",
  },
  {
    id: 3,
    product: {
      name: "Dominator Platinum DDR5",
      description: "32GB (2x16GB) 6000MHz",
      image: ddr5Image,
    },
    category: "RAM",
    sku: "TS-RAM-DOMI-32",
    stock: 0,
    price: "€224.00",
    status: "Desactivado",
    statusType: "disabled",
  },
];

const StatIcon = ({ type }) => {
  const commonProps = {
    className: "h-5 w-5 text-blue-600",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (type === "money") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    );
  }

  if (type === "box") {
    return (
      <svg {...commonProps}>
        <path d="M21 8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
      </svg>
    );
  }

  if (type === "basket") {
    return (
      <svg {...commonProps}>
        <path d="m6 8 6-5 6 5" />
        <path d="M3 8h18l-2 12H5L3 8Z" />
        <path d="M9 13v3M15 13v3" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  );
};

const DownloadIcon = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

const PlusIcon = () => (
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
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

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

const FilterIcon = () => (
  <svg
    className="h-5 w-5 text-slate-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 5h18" />
    <path d="M6 12h12" />
    <path d="M10 19h4" />
  </svg>
);

const EditIcon = () => (
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
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const EyeIcon = ({ disabled = false }) => (
  <svg
    className={`h-4 w-4 ${disabled ? "text-blue-500" : "text-slate-400"}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function StockBar({ stock }) {
  const percentage = Math.min((stock / 20) * 100, 100);
  const color = stock <= 4 ? "bg-red-500" : "bg-blue-600";

  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-slate-700">{stock}</span>
      <div className="h-1 w-20 rounded-full bg-slate-100">
        <div
          className={`h-1 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ type, label }) {
  const config = {
    active: "bg-green-500 text-slate-700",
    low: "bg-red-500 text-slate-700",
    disabled: "bg-slate-300 text-slate-400",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${config[type].split(" ")[0]}`} />
      <span className={config[type].split(" ").slice(1).join(" ")}>
        {label}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const columns = [
    {
      key: "product",
      header: "PRODUCTO",
      render: (row) => (
        <div className="flex items-center gap-4">
          <img
            src={row.product.image}
            alt={row.product.name}
            className="h-10 w-10 rounded object-cover"
          />
          <div>
            <p className="font-medium text-slate-900">{row.product.name}</p>
            <p className="text-xs text-slate-400">{row.product.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "CATEGORÍA",
      render: (row) => (
        <span className="rounded bg-blue-50 px-2 py-1 text-[11px] font-bold text-slate-500">
          {row.category}
        </span>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      render: (row) => (
        <span className="font-mono text-xs text-slate-500">{row.sku}</span>
      ),
    },
    {
      key: "stock",
      header: "STOCK",
      render: (row) => <StockBar stock={row.stock} />,
    },
    {
      key: "price",
      header: "PRECIO",
    },
    {
      key: "status",
      header: "ESTADO",
      render: (row) => <StatusBadge type={row.statusType} label={row.status} />,
    },
    {
      key: "actions",
      header: "ACCIONES",
      render: (row) => (
        <div className="flex items-center gap-5">
          <button type="button" aria-label="Editar producto">
            <EditIcon />
          </button>
          <button type="button" aria-label="Ver producto">
            <EyeIcon disabled={row.statusType === "disabled"} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-[#f4f7fb] px-6 py-10">
      <div className="mx-auto max-w-[1110px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <h1 className="text-[46px] font-extrabold leading-none tracking-[-0.05em] text-slate-950">
              Panel de Control
            </h1>
            <p className="mt-3 text-base text-slate-500">
              Gestión de inventario y métricas de rendimiento en tiempo real.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              className="!h-14 !rounded !border !border-slate-300 !bg-slate-200 !px-6 !text-sm !font-medium !normal-case !text-slate-900"
            >
              <span className="inline-flex items-center gap-2">
                <DownloadIcon />
                EXPORTAR
              </span>
            </Button>

            <Button
              type="button"
              variant="primary"
              className="!h-14 !rounded !px-6 !text-sm !font-medium !normal-case"
            >
              <span className="inline-flex items-center gap-2">
                <PlusIcon />
                NUEVO PRODUCTO
              </span>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.id}
              className="rounded-lg border border-slate-300 bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <StatIcon type={stat.icon} />

                <span
                  className={[
                    "rounded px-2 py-1 text-xs font-extrabold",
                    stat.changeType === "positive" &&
                      "bg-green-50 text-green-600",
                    stat.changeType === "negative" && "bg-red-50 text-red-600",
                    stat.changeType === "neutral" &&
                      "bg-slate-100 text-slate-400",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-base font-medium uppercase tracking-wide text-slate-500">
                {stat.title}
              </p>
              <p className="mt-3 text-lg text-slate-950">{stat.value}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 overflow-hidden rounded-lg border border-slate-300 bg-white">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-300 px-6 py-5 md:flex-row md:items-center">
            <h2 className="text-lg font-medium text-slate-900">
              Gestión de Inventario
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-[260px] items-center gap-2 rounded bg-slate-100 px-3">
                <SearchIcon />
                <Input
                  placeholder="Buscar producto..."
                  className="!h-auto !w-full !border-0 !bg-transparent !p-0 !text-sm !outline-none"
                />
              </div>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-slate-300 bg-white"
                aria-label="Filtrar"
              >
                <FilterIcon />
              </button>
            </div>
          </div>

          <Table
            data={products}
            columns={columns}
            keyField="id"
            itemsPerPage={3}
            emptyMessage="No hay productos disponibles."
          />
        </section>
      </div>
    </section>
  );
}