// src/modules/public/home/index.jsx

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardGrid, InfoCard } from "lib-components-react";

import { Navbar, Footer } from "../../../layouts";
import heroImage from "../../../assets/IngenieriaAlLimite.png";

import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../../store/slices/productsSlice.js";

const defaultCategories = ["Todos"];

const ShieldIcon = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SpeedIcon = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 0 0-18 0" />
    <path d="M12 12 17 7" />
    <path d="M7 12h.01" />
    <path d="M12 6h.01" />
    <path d="M17 12h.01" />
  </svg>
);

const SupportIcon = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 13a8 8 0 0 1 16 0" />
    <path d="M18 19a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1v7z" />
    <path d="M6 19a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1v7z" />
    <path d="M12 19v2" />
    <path d="M9 21h6" />
  </svg>
);

const CartIcon = ({ className = "h-5 w-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);

function formatCurrency(value) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value || 0));
}

function getProductSpecs(product) {
  return [
    ["Referencia", product.reference || "SIN-REF"],
    ["Stock", `${product.stock || 0} unidades`],
    ["Categoría", product.category || "Sin categoría"],
  ];
}

function getProductBadge(product) {
  if (Number(product.stock || 0) <= 0) {
    return "AGOTADO";
  }

  return "EN STOCK";
}

function ProductImagePlaceholder() {
  return (
    <div className="flex h-[190px] w-full items-center justify-center bg-slate-200">
      <span className="text-3xl font-extrabold tracking-[-0.08em] text-slate-400">
        TECHSPEC
      </span>
    </div>
  );
}

function ProductCard({ product }) {
  const specs = getProductSpecs(product);
  const badge = getProductBadge(product);
  const price = formatCurrency(product.price);
  const isOutOfStock = Number(product.stock || 0) <= 0;

  const footer = (
    <div className="flex w-full items-end justify-between">
      <div>
        <p className="text-lg font-medium text-slate-950">{price}</p>
        <p className="mt-1 text-xs text-slate-400">
          {product.reference || "Sin referencia"}
        </p>
      </div>

      <Button
        type="button"
        variant="primary"
        disabled={isOutOfStock}
        aria-label={`Agregar ${product.name} al carrito`}
        className="!h-10 !w-10 !rounded !p-0 disabled:!cursor-not-allowed disabled:!opacity-50"
      >
        <CartIcon className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <Card
      image={product.image || undefined}
      imageAlt={product.name}
      badge={badge}
      footer={footer}
      className="!flex !min-h-[420px] !flex-col !overflow-hidden !rounded-lg !border !border-slate-300 !bg-white"
    >
      {!product.image && (
        <div className="-mx-6 -mt-6 mb-5">
          <ProductImagePlaceholder />
        </div>
      )}

      <p className="text-[11px] font-extrabold uppercase text-blue-600">
        {product.category || "PRODUCTO"}
      </p>

      <h3 className="mt-2 min-h-[64px] text-[27px] font-medium leading-[1.08] tracking-[-0.04em] text-slate-950">
        {product.name}
      </h3>

      <p className="mb-3 mt-1 line-clamp-2 min-h-[40px] text-sm leading-relaxed text-slate-500">
        {product.description || "Producto disponible en catálogo TECHSPEC."}
      </p>

      <div className="mt-2 space-y-0">
        {specs.map(([label, value]) => (
          <div
            key={`${product.id}-${label}`}
            className="flex items-center justify-between border-b border-slate-200 py-1 text-[12px]"
          >
            <span className="text-slate-500">{label}</span>
            <span className="max-w-[145px] truncate text-right font-bold text-slate-950">
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Home() {
  const dispatch = useDispatch();

  const backendProducts = useSelector(selectProducts);
  const productsLoading = useSelector(selectProductsLoading);
  const productsError = useSelector(selectProductsError);

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    const backendCategories = backendProducts
      .map((product) => product.category)
      .filter(Boolean);

    return [...defaultCategories, ...new Set(backendCategories)];
  }, [backendProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Todos") {
      return backendProducts;
    }

    return backendProducts.filter(
      (product) => product.category === selectedCategory
    );
  }, [backendProducts, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Navbar showSearch />

      <section className="mx-auto max-w-[1110px] px-6 py-8">
        <div className="grid overflow-hidden rounded-lg border border-slate-300 bg-[#e5e9ee] md:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col justify-center px-10 py-16">
            <span className="mb-5 w-fit bg-blue-600 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
              Novedad
            </span>

            <h1 className="max-w-[560px] text-[48px] font-extrabold leading-none tracking-[-0.06em] text-slate-950">
              Ingeniería al Límite.
            </h1>

            <p className="mt-5 max-w-[560px] text-xl leading-relaxed text-slate-600">
              Presentamos la nueva serie de procesadores y GPUs optimizados para
              estaciones de trabajo de alto rendimiento.
            </p>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="mt-9 !h-12 !rounded !px-8 !text-sm !font-bold !normal-case"
            >
              Explorar Catálogo
            </Button>
          </div>

          <div className="min-h-[320px]">
            <img
              src={heroImage}
              alt="Tarjeta gráfica de alto rendimiento"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1110px] px-6 pb-10">
        <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded px-5 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-500">
            <span>Ordenar por:</span>
            <button
              type="button"
              className="flex min-w-[150px] items-center justify-between gap-8 font-bold text-slate-950"
            >
              Más recientes
              <span className="text-slate-500">⌄</span>
            </button>
          </div>
        </div>

        {productsError && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {productsError}
          </div>
        )}

        {productsLoading && (
          <div className="mb-6 rounded border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            Cargando productos...
          </div>
        )}

        {!productsLoading && !productsError && filteredProducts.length === 0 && (
          <div className="rounded border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
            No hay productos disponibles para esta categoría.
          </div>
        )}

        {filteredProducts.length > 0 && (
          <CardGrid
            columns={4}
            gap={24}
            className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CardGrid>
        )}
      </section>

      <section className="mx-auto max-w-[1110px] px-6 py-14">
        <div className="border-t border-slate-300 pt-14">
          <h2 className="text-[36px] font-extrabold leading-none tracking-[-0.05em] text-slate-950">
            Excelencia Técnica
          </h2>

          <p className="mt-2 text-base text-slate-600">
            ¿Por qué los profesionales eligen TECHSPEC?
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <InfoCard
              icon={<ShieldIcon />}
              title="Validación de Fábrica"
              description="Cada componente pasa por un riguroso test de estrés de 48 horas antes de ser enviado, asegurando el máximo tiempo de actividad."
              className="!rounded-lg !border !border-slate-300 !bg-slate-100 !p-7"
            />

            <InfoCard
              icon={<SpeedIcon />}
              title="Rendimiento Optimizado"
              description="Nuestros componentes están diseñados para operar en los límites térmicos más exigentes sin pérdida de frecuencia."
              className="!rounded-lg !border !border-slate-300 !bg-slate-100 !p-7"
            />

            <InfoCard
              icon={<SupportIcon />}
              title="Soporte Prioritario"
              description="Acceso directo a ingenieros de hardware para resolución de problemas complejos y optimización de flujos de trabajo."
              className="!rounded-lg !border !border-slate-300 !bg-slate-100 !p-7"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}