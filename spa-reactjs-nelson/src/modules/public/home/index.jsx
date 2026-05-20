import { useState } from "react";
import { Button, Card, CardGrid, InfoCard } from "lib-components-react";
import { Navbar, Footer } from "../../../layouts";
import heroImage from "../../../assets/IngenieriaAlLimite.png";
import coreI9Image from "../../../assets/corei9.jpg";
import rtx4080Image from "../../../assets/rtx4080.jpg";
import ddr5Image from "../../../assets/32GBDDR5.jpg";
import z790Image from "../../../assets/z790.jpg";
import mouseImage from "../../../assets/mousePrecision.jpg";
import ssdImage from "../../../assets/2TBGen5.jpg";
import hydroImage from "../../../assets/HydroElite.jpg";
import powerImage from "../../../assets/1200WTitanium.jpg";

const categories = [
  "Todos",
  "Tarjetas Gráficas",
  "Procesadores",
  "Placas Base",
  "Memoria RAM",
];

const products = [
  {
    id: 1,
    name: "Core i9-14900K",
    category: "Procesadores",
    label: "PROCESADOR",
    badge: "EN STOCK",
    image: coreI9Image,
    price: "589,00€",
    specs: [
      ["Núcleos", "24 Núcleos"],
      ["Frecuencia", "6.0 GHz Turbo"],
      ["TDP", "125W"],
    ],
  },
  {
    id: 2,
    name: "RTX 4080 Super",
    category: "Tarjetas Gráficas",
    label: "TARJETA GRÁFICA",
    badge: "OFERTA",
    image: rtx4080Image,
    oldPrice: "1.199,00€",
    price: "1.049,00€",
    specs: [
      ["Memoria", "16GB GDDR6X"],
      ["DLSS", "DLSS 3.5 Ready"],
      ["Puerto", "PCIe 4.0"],
    ],
  },
  {
    id: 3,
    name: "32GB DDR5 6400MHz",
    category: "Memoria RAM",
    label: "MEMORIA RAM",
    image: ddr5Image,
    price: "145,00€",
    specs: [
      ["Kit", "2 x 16GB"],
      ["Latencia", "CL32"],
      ["Voltaje", "1.4V"],
    ],
  },
  {
    id: 4,
    name: "Z790 Master X",
    category: "Placas Base",
    label: "PLACA BASE",
    image: z790Image,
    price: "620,00€",
    specs: [
      ["Socket", "LGA 1700"],
      ["Factor", "E-ATX"],
      ["Red", "Wi-Fi 7 / 10GbE"],
    ],
  },
  {
    id: 5,
    name: "Mouse Precision X1",
    category: "Periférico",
    label: "PERIFÉRICO",
    image: mouseImage,
    price: "129,00€",
    specs: [
      ["DPI", "32,000 DPI"],
      ["Conexión", "Wireless 2.4GHz"],
      ["Peso", "58g"],
    ],
  },
  {
    id: 6,
    name: "2TB Gen5 SSD",
    category: "Almacenamiento",
    label: "ALMACENAMIENTO",
    image: ssdImage,
    price: "299,00€",
    specs: [
      ["Lectura", "12,400 MB/s"],
      ["Escritura", "11,800 MB/s"],
      ["Formato", "M.2 2280"],
    ],
  },
  {
    id: 7,
    name: "Hydro Elite 360",
    category: "Refrigeración",
    label: "REFRIGERACIÓN",
    image: hydroImage,
    price: "189,00€",
    specs: [
      ["Radiador", "360mm Aluminium"],
      ["Pantalla", '2.1" LCD Pump'],
      ["Ventiladores", "3x 120mm PWM"],
    ],
  },
  {
    id: 8,
    name: "1200W Titanium",
    category: "Fuente de Alimentación",
    label: "FUENTE DE ALIMENTACIÓN",
    image: powerImage,
    price: "345,00€",
    specs: [
      ["Eficiencia", "80+ Titanium"],
      ["Cables", "Totalmente Modular"],
      ["Garantía", "10 Años"],
    ],
  },
];

const ShieldIcon = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);


function ProductCard({ product }) {
  const footer = (
    <div className="flex w-full items-end justify-between">
      <div>
        {product.oldPrice && (
          <p className="text-sm text-slate-400 line-through">
            {product.oldPrice}
          </p>
        )}
        <p className="text-lg font-medium text-slate-950">{product.price}</p>
      </div>

      <Button
        type="button"
        variant="primary"
        aria-label={`Agregar ${product.name} al carrito`}
        className="!h-10 !w-10 !rounded !p-0"
      >
        <CartIcon className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <Card
      image={product.image}
      imageAlt={product.name}
      badge={product.badge}
      footer={footer}
      className="!flex !min-h-[420px] !flex-col !overflow-hidden !rounded-lg !border !border-slate-300 !bg-white"
    >
      <p className="text-[11px] font-extrabold uppercase text-blue-600">
        {product.label}
      </p>

      <h3 className="mt-2 min-h-[64px] text-[27px] font-medium leading-[1.08] tracking-[-0.04em] text-slate-950">
        {product.name}
      </h3>

      <div className="mt-2 space-y-0">
        {product.specs.map(([label, value]) => (
          <div
            key={`${product.id}-${label}`}
            className="flex items-center justify-between border-b border-slate-200 py-1 text-[12px]"
          >
            <span className="text-slate-500">{label}</span>
            <span className="font-bold text-slate-950">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

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

        <CardGrid
          columns={4}
          gap={24}
          className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CardGrid>
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
