import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, FormField, Input } from "lib-components-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  loginUser,
  selectAuthError,
  selectAuthLoading,
} from "../../../store/slices/authSlice.js";

import { useAuth } from "../../../router/providers/AuthProvider.jsx";
import "./login.css";

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16v16H4z" />
    <path d="m4 6 8 7 8-7" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 14v3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const TerminalIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m8 9 3 3-3 3" />
    <path d="M13 15h4" />
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    dispatch(clearAuthError());

    try {
      await dispatch(
        loginUser({
          email,
          password,
        }),
      ).unwrap();

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="login-brand">
          <Link to="/">TECHSPEC</Link>
        </div>

        <div className="login-hero-content">
          <h1 className="login-hero-title">
            Ingeniería para el
            <br />
            rendimiento extremo.
          </h1>

          <p className="login-hero-text">
            Accede a tu panel de configuración técnica y gestiona tus
            componentes con precisión quirúrgica.
          </p>
        </div>

        <div className="login-hero-meta">
          <span>© TECHNICAL</span>
          <span>SLK-11 SECURITY</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-form-wrapper">
          <div className="login-card">
            <h1 className="login-title">Iniciar Sesión</h1>

            <p className="login-subtitle">
              Introduce tus credenciales para acceder a tu cuenta profesional.
            </p>

            {authError && (
              <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {authError}
              </div>
            )}

            <form className="login-form" onSubmit={handleLogin}>
              <FormField label="Correo Electrónico" name="email">
                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    <MailIcon />
                  </span>

                  <Input
                    className="login-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nombre@techspec.com"
                    autoComplete="email"
                  />
                </div>
              </FormField>

              <FormField
                name="password"
                label={
                  <div className="login-field-row">
                    <span>Contraseña</span>
                    <Link className="login-forgot-link" to="/forgot-password">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                }
              >
                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    <LockIcon />
                  </span>

                  <Input
                    className="login-input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
              </FormField>

              <label className="login-remember-row">
                <input className="login-checkbox" type="checkbox" />
                <span>Mantener sesión iniciada</span>
              </label>

              <Button
                type="submit"
                size="full"
                variant="primary"
                disabled={loading}
                className="login-submit-button"
              >
                <span className="login-submit-content">
                  {loading ? "Validando..." : "Entrar al Sistema"}
                  {!loading && <ArrowRightIcon />}
                </span>
              </Button>
            </form>

            <div className="login-divider">O continuar con</div>

            <div className="login-social-row">
              <Button
                type="button"
                size="full"
                variant="secondary"
                className="login-social-button"
              >
                <span className="login-social-content">
                  <span className="login-google-icon">
                    <span>G</span>
                    <span>o</span>
                    <span>o</span>
                  </span>
                  Google
                </span>
              </Button>

              <Button
                type="button"
                size="full"
                variant="secondary"
                className="login-social-button"
              >
                <span className="login-social-content">
                  <span className="login-ssh-icon">
                    <TerminalIcon />
                  </span>
                  SSH Key
                </span>
              </Button>
            </div>

            <p className="login-register-text">
              ¿No tienes una cuenta?{" "}
              <Link className="login-request-link" to="/register">
                Solicitar acceso
              </Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="login-footer">
        <div>
          <div className="login-footer-brand">TECHSPEC</div>
          <div className="login-footer-copy">
            © 2024 TECHSPEC. ENGINEERED FOR PERFORMANCE.
          </div>
        </div>

        <div>
          <div className="login-footer-title">Legal</div>
          <div className="login-footer-list">
            <Link className="login-footer-link" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="login-footer-link" to="/terms">
              Terms of Service
            </Link>
          </div>
        </div>

        <div>
          <div className="login-footer-title">Soporte</div>
          <div className="login-footer-list">
            <Link className="login-footer-link" to="/technical-specs">
              Technical Specs
            </Link>
            <Link className="login-footer-link" to="/support">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
