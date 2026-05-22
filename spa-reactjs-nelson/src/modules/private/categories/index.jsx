import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormField, Input, SearchBar, Table } from "lib-components-react";

import {
  createCategory,
  fetchCategories,
  selectCategories,
  selectCategoriesError,
  selectCategoriesLoading,
  selectCategoriesMessage,
} from "../../../store/slices/categoriesSlice.js";

function Modal({ title, children, onClose, onConfirm, confirmLabel = "Guardar" }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4">
      <section className="w-full max-w-[520px] rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <header className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </header>

        <div className="space-y-4">{children}</div>

        <footer className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="!h-10 !rounded-md !border !border-slate-300 !bg-white !px-4 !text-sm !font-medium !normal-case !text-slate-700"
          >
            Cancelar
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={onConfirm}
            className="!h-10 !rounded-md !px-4 !text-sm !font-medium !normal-case"
          >
            {confirmLabel}
          </Button>
        </footer>
      </section>
    </div>
  );
}

export default function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const message = useSelector(selectCategoriesMessage);

  const [query, setQuery] = useState("");
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return categories;
    }

    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(q) ||
        category.description.toLowerCase().includes(q) ||
        category.status.toLowerCase().includes(q)
      );
    });
  }, [categories, query]);

  const openCreate = () => {
    setForm({
      name: "",
      description: "",
    });
    setMode("create");
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("El nombre de la categoría es requerido.");
      return;
    }

    try {
      await dispatch(
        createCategory({
          name: form.name.trim(),
          description: form.description.trim(),
        })
      ).unwrap();

      setMode(null);
    } catch (requestError) {
      console.error("Error al crear categoría:", requestError);
    }
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      render: (row) => (
        <span className="font-mono text-xs text-slate-500">
          {String(row.id).slice(0, 8)}
        </span>
      ),
    },
    {
      key: "name",
      header: "Nombre",
    },
    {
      key: "description",
      header: "Descripción",
    },
    {
      key: "productsCount",
      header: "Productos",
    },
    {
      key: "status",
      header: "Estado",
      render: (row) => (
        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      render: () => (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="!h-8 !rounded !border !border-slate-300 !bg-white !px-3 !text-xs !font-medium !normal-case !text-slate-700"
          >
            Editar
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="!h-8 !rounded !border !border-red-200 !bg-red-50 !px-3 !text-xs !font-medium !normal-case !text-red-600"
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]" aria-labelledby="categories-title">
      <header className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Administración
          </p>

          <h1
            id="categories-title"
            className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950"
          >
            Categorías
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Catálogos de producto obtenidos desde el backend.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => {}}
            placeholder="Buscar…"
            buttonText="Buscar"
          />

          <Button
            type="button"
            variant="primary"
            onClick={openCreate}
            className="!h-11 !rounded-md !px-5 !text-sm !font-medium !normal-case"
          >
            Nueva categoría
          </Button>
        </div>
      </header>

      {message && (
        <div className="mb-4 rounded border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-300 bg-white px-6 py-10 text-sm text-slate-500">
          Cargando categorías...
        </div>
      ) : (
        <Table
          data={filteredCategories}
          columns={columns}
          keyField="id"
          emptyMessage="No hay categorías."
          itemsPerPage={10}
        />
      )}

      {mode === "create" && (
        <Modal
          title="Nueva categoría"
          onClose={() => setMode(null)}
          onConfirm={handleSave}
          confirmLabel="Crear categoría"
        >
          <FormField label="Nombre" name="name">
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Ej. Procesadores"
            />
          </FormField>

          <FormField label="Descripción" name="description">
            <Input
              id="description"
              name="description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Descripción breve"
            />
          </FormField>
        </Modal>
      )}
    </section>
  );
}