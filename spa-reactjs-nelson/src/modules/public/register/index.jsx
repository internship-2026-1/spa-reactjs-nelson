import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormField, Input } from "lib-components-react";

import {
  clearRegisterState,
  registerUser,
  selectRegisterError,
  selectRegisterLoading,
  selectRegisterSuccess,
} from "../../../store/slices/usersSlice.js";

function ErrorBox({ error }) {
  if (!error) return null;

  return (
    <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <p className="font-bold">{error.message}</p>

      {error.data && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {Object.entries(error.data).map(([field, messages]) => (
            <li key={field}>
              <span className="font-semibold">{field}: </span>
              {Array.isArray(messages) ? messages.join(", ") : String(messages)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectRegisterLoading);
  const error = useSelector(selectRegisterError);
  const success = useSelector(selectRegisterSuccess);

  useEffect(() => {
    dispatch(clearRegisterState());

    return () => {
      dispatch(clearRegisterState());
    };
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      username: String(formData.get("username") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      first_name: String(formData.get("first_name") || "").trim(),
      last_name: String(formData.get("last_name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      role: String(formData.get("role") || "b2c"),
    };

    try {
      await dispatch(registerUser(payload)).unwrap();

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (requestError) {
      console.error("Error al registrar usuario:", requestError);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6 py-12">
      <section className="w-full max-w-[760px] rounded-xl border border-slate-300 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
            TECHSPEC Access
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
            Solicitar acceso
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Crea tu cuenta para acceder al catálogo y a las herramientas de
            gestión.
          </p>
        </div>

        {success && (
          <div className="mb-6 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        <ErrorBox error={error} />

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <FormField label="Nombre de usuario" name="username">
            <Input
              id="username"
              name="username"
              placeholder="usuario"
              autoComplete="username"
              required
            />
          </FormField>

          <FormField label="Correo electrónico" name="email">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@techspec.com"
              autoComplete="email"
              required
            />
          </FormField>

          <FormField label="Nombres" name="first_name">
            <Input
              id="first_name"
              name="first_name"
              placeholder="nombre"
              autoComplete="given-name"
              required
            />
          </FormField>

          <FormField label="Apellidos" name="last_name">
            <Input
              id="last_name"
              name="last_name"
              placeholder="apellido"
              autoComplete="family-name"
              required
            />
          </FormField>

          <FormField label="Teléfono" name="phone">
            <Input
              id="phone"
              name="phone"
              placeholder="+50255555555"
              autoComplete="tel"
              required
            />
          </FormField>

          <FormField label="Tipo de cuenta" name="role">
            <select
              id="role"
              name="role"
              defaultValue="b2c"
              className="h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-600"
            >
              <option value="b2c">Cliente B2C</option>
              <option value="b2b">Cliente B2B</option>
            </select>
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Contraseña" name="password">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres, mayúscula, número y símbolo"
                autoComplete="new-password"
                required
              />
            </FormField>
          </div>

          <div className="mt-2 flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Ya tengo una cuenta
            </Link>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="!h-12 !rounded !px-8 !text-sm !font-bold !normal-case"
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}