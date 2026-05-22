import { useDispatch, useSelector } from "react-redux";
import { Button } from "lib-components-react";

import {
  selectIntegrationError,
  selectIntegrationLoading,
  selectIntegrationMessage,
  selectIntegrationResult,
  selectIntegrationStatus,
  syncProductsIntegration,
} from "../../../store/slices/integrationSlice.js";

const ENDPOINT = "/core/api/v1/integracion/products/";

export default function Integration() {
  const dispatch = useDispatch();

  const status = useSelector(selectIntegrationStatus);
  const loading = useSelector(selectIntegrationLoading);
  const error = useSelector(selectIntegrationError);
  const message = useSelector(selectIntegrationMessage);
  const result = useSelector(selectIntegrationResult);

  const handleSync = () => {
    dispatch(syncProductsIntegration());
  };

  return (
    <section
      className="mx-auto max-w-[1180px]"
      aria-labelledby="integration-title"
    >
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
          Administración
        </p>

        <h1
          id="integration-title"
          className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950"
        >
          Integración
        </h1>
      </header>

      <div className="grid gap-6 rounded-xl border border-slate-300 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            Sincronización de productos
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
            Ejecuta la sincronización de productos contra el backend. El proceso
            importa o actualiza el catálogo completo de productos desde la
            fuente de datos configurada.
          </p>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              Endpoint
            </p>

            <code className="mt-2 block break-all text-sm font-semibold text-blue-600">
              {ENDPOINT}
            </code>
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="primary"
            onClick={handleSync}
            disabled={loading}
            className="!h-11 !rounded-md !px-5 !text-sm !font-medium !normal-case"
          >
            {loading ? "Sincronizando..." : "Ejecutar sincronización"}
          </Button>
        </div>

        {status !== "idle" && (
          <div
            className={[
              "md:col-span-2 rounded-lg border px-4 py-3 text-sm",
              status === "success" &&
                "border-green-200 bg-green-50 text-green-700",
              status === "error" && "border-red-200 bg-red-50 text-red-700",
              status === "loading" &&
                "border-slate-200 bg-slate-50 text-slate-500",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <p className="font-medium">
              {loading ? "Conectando con el servidor…" : message}
            </p>

            {error && <p className="mt-1">{error}</p>}

            {result && (
              <div className="mt-4 grid gap-3 sm:grid-cols-5">
                {Object.entries(result).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded bg-white px-3 py-2 text-center"
                  >
                    <p className="text-xs font-bold uppercase text-slate-400">
                      {key}
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}