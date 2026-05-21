import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormField, Input } from "lib-components-react";

import {
  clearPasswordResetState,
  requestPasswordReset,
  selectPasswordResetError,
  selectPasswordResetLoading,
  selectPasswordResetSuccess,
} from "../../../../store/slices/usersSlice.js";

export default function PasswordResetRequest() {
  const dispatch = useDispatch();

  const loading = useSelector(selectPasswordResetLoading);
  const error = useSelector(selectPasswordResetError);
  const success = useSelector(selectPasswordResetSuccess);

  useEffect(() => {
    dispatch(clearPasswordResetState());

    return () => {
      dispatch(clearPasswordResetState());
    };
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();

    try {
      await dispatch(requestPasswordReset({ email })).unwrap();
    } catch (requestError) {
      console.error("Error solicitando reset:", requestError);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6 py-12">
      <section className="w-full max-w-[520px] rounded-xl border border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
          Recuperación
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
          Restablecer contraseña
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para
          crear una nueva contraseña.
        </p>

        {success && (
          <div className="mt-6 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="!h-12 !w-full !rounded !text-sm !font-bold !normal-case"
          >
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Volver al login
          </Link>
        </div>
      </section>
    </main>
  );
}