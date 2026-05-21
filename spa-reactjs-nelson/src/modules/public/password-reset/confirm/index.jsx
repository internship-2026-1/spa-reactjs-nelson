import { useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormField, Input } from "lib-components-react";

import {
  clearPasswordResetState,
  confirmPasswordReset,
  selectNewPasswordError,
  selectNewPasswordLoading,
  selectNewPasswordSuccess,
} from "../../../../store/slices/usersSlice.js";

export default function PasswordResetConfirm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const loading = useSelector(selectNewPasswordLoading);
  const error = useSelector(selectNewPasswordError);
  const success = useSelector(selectNewPasswordSuccess);

  useEffect(() => {
    dispatch(clearPasswordResetState());

    return () => {
      dispatch(clearPasswordResetState());
    };
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newPassword = String(formData.get("new_password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await dispatch(
        confirmPasswordReset({
          token,
          newPassword,
        })
      ).unwrap();

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (requestError) {
      console.error("Error confirmando reset:", requestError);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6 py-12">
      <section className="w-full max-w-[540px] rounded-xl border border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
          Seguridad
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
          Nueva contraseña
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Define una nueva contraseña para tu cuenta. Debe cumplir las reglas de
          seguridad del backend.
        </p>

        {!token && (
          <div className="mt-6 rounded border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
            No se encontró token en la URL. Abre el enlace recibido en tu correo.
          </div>
        )}

        {success && (
          <div className="mt-6 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p className="font-bold">{error.message}</p>

            {error.data && (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {Object.entries(error.data).map(([field, messages]) => (
                  <li key={field}>
                    <span className="font-semibold">{field}: </span>
                    {Array.isArray(messages)
                      ? messages.join(", ")
                      : String(messages)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <FormField label="Nueva contraseña" name="new_password">
            <Input
              id="new_password"
              name="new_password"
              type="password"
              placeholder="Nueva contraseña"
              autoComplete="new-password"
              required
              disabled={!token}
            />
          </FormField>

          <FormField label="Confirmar contraseña" name="confirm_password">
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirma la contraseña"
              autoComplete="new-password"
              required
              disabled={!token}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            disabled={loading || !token}
            className="!h-12 !w-full !rounded !text-sm !font-bold !normal-case"
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
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