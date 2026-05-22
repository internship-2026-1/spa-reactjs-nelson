import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, SearchBar, Table } from "lib-components-react";

import {
  fetchUsers,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from "../../../store/slices/usersSlice.js";

function RoleBadge({ role }) {
  const classes = {
    admin: "bg-blue-50 text-blue-700",
    b2b: "bg-purple-50 text-purple-700",
    b2c: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase",
        classes[role] || classes.b2c,
      ].join(" ")}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const active = status === "Activo";

  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-bold",
        active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return users;

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q) ||
        user.status.toLowerCase().includes(q)
      );
    });
  }, [users, query]);

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
    { key: "name", header: "Nombre" },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Rol",
      render: (row) => <RoleBadge role={row.role} />,
    },
    {
      key: "status",
      header: "Estado",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "createdAt", header: "Alta" },
  ];

  return (
    <section className="mx-auto max-w-[1180px]" aria-labelledby="users-title">
      <header className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Administración
          </p>

          <h1
            id="users-title"
            className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950"
          >
            Usuarios
          </h1>
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
            className="!h-11 !rounded-md !px-5 !text-sm !font-medium !normal-case"
          >
            Nuevo usuario
          </Button>
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-slate-300 bg-white px-6 py-10 text-sm text-slate-500">
          Cargando usuarios...
        </div>
      ) : (
        <Table
          data={filteredUsers}
          columns={columns}
          keyField="id"
          emptyMessage="No hay usuarios."
          itemsPerPage={10}
        />
      )}
    </section>
  );
}