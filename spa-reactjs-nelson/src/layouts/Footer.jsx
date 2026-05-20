import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-slate-200 bg-[#f4f7fb]"
    >
      <div className="mx-auto grid max-w-[1110px] gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-[-0.04em] text-slate-950">
            TECHSPEC
          </h2>

          <p className="mt-5 max-w-[230px] text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-slate-400">
            © 2024 TECHSPEC. ENGINEERED FOR PERFORMANCE.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">
            Productos
          </h3>

          <nav
            aria-label="Enlaces de productos"
            className="mt-5 flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
          >
            <Link className="transition hover:text-blue-600" to="/">
              Componentes
            </Link>

            <Link className="transition hover:text-blue-600" to="/">
              Sistemas Pre-Built
            </Link>

            <Link className="transition hover:text-blue-600" to="/">
              Technical Specs
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">
            Soporte
          </h3>

          <nav
            aria-label="Enlaces de soporte"
            className="mt-5 flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
          >
            <Link className="transition hover:text-blue-600" to="/support">
              Support
            </Link>

            <Link className="transition hover:text-blue-600" to="/returns">
              Returns
            </Link>

            <Link className="transition hover:text-blue-600" to="/shipping">
              Shipping
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-600">
            Legal
          </h3>

          <nav
            aria-label="Enlaces legales"
            className="mt-5 flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
          >
            <Link className="transition hover:text-blue-600" to="/privacy">
              Privacy Policy
            </Link>

            <Link className="transition hover:text-blue-600" to="/terms">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}