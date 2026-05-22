import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormField, Input, RadioButton } from "lib-components-react";

import { Navbar, Footer } from "../../../layouts";
import { useAuth } from "../../../router/providers/AuthProvider.jsx";

import {
  clearCart,
  selectCartItems,
  selectCartSubtotal,
} from "../../../store/slices/cartSlice.js";

import {
  nextStep,
  prevStep,
  resetCheckout,
  selectCheckoutStep,
  selectPendingOrderId,
  selectShipping,
  setPendingOrderId,
  updatePayment,
  updateShipping,
} from "../../../store/slices/checkoutSlice.js";

import {
  createOrder,
  payOrder,
  selectOrdersCreating,
  selectOrdersError,
  selectOrdersPaying,
} from "../../../store/slices/ordersSlice.js";

const SHIPPING_OPTIONS = {
  standard: {
    label: "Estándar",
    description: "3-5 días hábiles",
    cost: 0,
  },
  express: {
    label: "Envío Express",
    description: "1-2 días hábiles",
    cost: 0,
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
  }).format(Number(value || 0));
}

function StepIndicator({ step }) {
  const steps = ["Envío", "Pago"];

  return (
    <div className="mb-8 flex items-center gap-4">
      {steps.map((label, index) => {
        const number = index + 1;
        const active = step === number;
        const done = step > number;

        return (
          <div key={label} className="flex items-center gap-3">
            <span
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                active || done
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-500",
              ].join(" ")}
            >
              {done ? "✓" : number}
            </span>

            <span
              className={[
                "text-sm font-semibold",
                active ? "text-blue-600" : "text-slate-500",
              ].join(" ")}
            >
              {label}
            </span>

            {index < steps.length - 1 && (
              <span className="h-px w-10 bg-slate-300" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderSummary({ total }) {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectShipping);
  const shippingCost = SHIPPING_OPTIONS[shipping.method]?.cost || 0;

  return (
    <aside className="h-fit rounded-xl border border-slate-300 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">
        Resumen de orden
      </h2>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-slate-200">
              <span className="text-[10px] font-bold text-slate-400">TECH</span>
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-400">
                {item.quantity} × {formatCurrency(item.price)}
              </p>
            </div>

            <span className="text-sm font-medium text-slate-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="my-6 border-t border-slate-200" />

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Envío</span>
          <span className="font-semibold text-green-600">
            {shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-slate-200" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-2xl font-bold">{formatCurrency(total)}</span>
      </div>

      <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
        Pago simulado. 
      </p>
    </aside>
  );
}

function ShippingStep() {
  const dispatch = useDispatch();
  const shipping = useSelector(selectShipping);

  return (
    <section className="rounded-xl border border-slate-300 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">
        Dirección de envío
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <FormField label="Nombre completo" name="fullName">
          <Input
            name="fullName"
            value={shipping.fullName}
            placeholder="nombre apellido"
            onChange={(event) =>
              dispatch(updateShipping({ fullName: event.target.value }))
            }
          />
        </FormField>

        <FormField label="Correo electrónico" name="email">
          <Input
            name="email"
            type="email"
            value={shipping.email}
            placeholder="correo@techspec.com"
            onChange={(event) =>
              dispatch(updateShipping({ email: event.target.value }))
            }
          />
        </FormField>
      </div>

      <div className="mt-5">
        <FormField label="Dirección" name="address">
          <Input
            name="address"
            value={shipping.address}
            placeholder="Dirección de entrega"
            onChange={(event) =>
              dispatch(updateShipping({ address: event.target.value }))
            }
          />
        </FormField>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <FormField label="Ciudad" name="city">
          <Input
            name="city"
            value={shipping.city}
            onChange={(event) =>
              dispatch(updateShipping({ city: event.target.value }))
            }
          />
        </FormField>

        <FormField label="Departamento / Provincia" name="state">
          <Input
            name="state"
            value={shipping.state}
            onChange={(event) =>
              dispatch(updateShipping({ state: event.target.value }))
            }
          />
        </FormField>

        <FormField label="Código postal" name="zip">
          <Input
            name="zip"
            value={shipping.zip}
            onChange={(event) =>
              dispatch(updateShipping({ zip: event.target.value }))
            }
          />
        </FormField>
      </div>

      <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-slate-500">
        Método de envío
      </h3>

      <div className="mt-4 grid gap-3">
        {Object.entries(SHIPPING_OPTIONS).map(([key, option]) => (
          <label
            key={key}
            className={[
              "flex cursor-pointer items-center gap-4 rounded-lg border p-4",
              shipping.method === key
                ? "border-blue-600 bg-blue-50"
                : "border-slate-300 bg-white",
            ].join(" ")}
          >
            <RadioButton
              name="shippingMethod"
              value={key}
              checked={shipping.method === key}
              onChange={() => dispatch(updateShipping({ method: key }))}
            />

            <div className="flex-1">
              <p className="font-semibold text-slate-900">{option.label}</p>
              <p className="text-sm text-slate-500">{option.description}</p>
            </div>

            <span className="text-sm font-semibold text-green-600">
              Gratis
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

function PaymentStep() {
  const dispatch = useDispatch();

  return (
    <section className="rounded-xl border border-slate-300 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">Datos de pago</h2>

      <p className="mt-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
        
      </p>

      <div className="mt-6 space-y-5">
        <FormField label="Número de tarjeta" name="cardNumber">
          <Input
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            onChange={(event) =>
              dispatch(updatePayment({ cardNumber: event.target.value }))
            }
          />
        </FormField>

        <FormField label="Nombre en la tarjeta" name="cardName">
          <Input
            name="cardName"
            placeholder="nombre apellido"
            onChange={(event) =>
              dispatch(updatePayment({ cardName: event.target.value }))
            }
          />
        </FormField>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Fecha de vencimiento" name="expiry">
            <Input
              name="expiry"
              placeholder="MM / AA"
              onChange={(event) =>
                dispatch(updatePayment({ expiry: event.target.value }))
              }
            />
          </FormField>

          <FormField label="CVV" name="cvv">
            <Input
              name="cvv"
              placeholder="123"
              onChange={(event) =>
                dispatch(updatePayment({ cvv: event.target.value }))
              }
            />
          </FormField>
        </div>
      </div>
    </section>
  );
}

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const step = useSelector(selectCheckoutStep);
  const shipping = useSelector(selectShipping);
  const pendingOrderId = useSelector(selectPendingOrderId);

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const creating = useSelector(selectOrdersCreating);
  const paying = useSelector(selectOrdersPaying);
  const error = useSelector(selectOrdersError);

  const total = useMemo(() => subtotal, [subtotal]);

  const validateShipping = () => {
    return (
      shipping.fullName.trim() &&
      shipping.email.trim() &&
      shipping.address.trim() &&
      shipping.city.trim()
    );
  };

  const handleNext = () => {
    if (!validateShipping()) {
      alert("Completa nombre, correo, dirección y ciudad.");
      return;
    }

    dispatch(nextStep());
  };

  const handleConfirm = async () => {
    if (items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      const payload = {
        customer_email: shipping.email || user?.email,
        products: items.map((item) => ({
          reference_product: item.reference,
          cantidad_products: item.quantity,
        })),
        shipping_address: {
          full_name: shipping.fullName,
          email: shipping.email,
          address: shipping.address,
          city: shipping.city,
          state: shipping.state,
          zip: shipping.zip,
          method: shipping.method,
        },
        metadata: {
          payment_method: "simulated_card",
          checkout_source: "spa-reactjs-nelson",
        },
      };

      const order = await dispatch(createOrder(payload)).unwrap();

      dispatch(setPendingOrderId(order.id));

      await dispatch(payOrder(order.id)).unwrap();

      dispatch(clearCart());
      dispatch(resetCheckout());

      navigate("/checkout/success", {
        replace: true,
        state: {
          orderId: order.id,
        },
      });
    } catch (requestError) {
      console.error("Error en checkout:", requestError);
    }
  };

  if (items.length === 0 && !pendingOrderId) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
        <Navbar showSearch />

        <section className="mx-auto max-w-[720px] px-6 py-20 text-center">
          <div className="rounded-xl border border-slate-300 bg-white p-10">
            <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
            <p className="mt-2 text-sm text-slate-500">
              Agrega productos antes de continuar al checkout.
            </p>

            <Link to="/">
              <Button
                type="button"
                variant="primary"
                className="mt-6 !h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
              >
                Volver al catálogo
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Navbar showSearch />

      <section className="mx-auto max-w-[1110px] px-6 py-10">
        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Checkout
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em]">
            Finalizar compra
          </h1>
        </header>

        <StepIndicator step={step} />

        {error && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            {step === 1 && <ShippingStep />}
            {step === 2 && <PaymentStep />}

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => dispatch(prevStep())}
                  className="!h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
                >
                  Volver
                </Button>
              ) : (
                <Link to="/cart">
                  <Button
                    type="button"
                    variant="secondary"
                    className="!h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
                  >
                    Volver al carrito
                  </Button>
                </Link>
              )}

              {step === 1 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  className="!h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
                >
                  Continuar a pago
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  disabled={creating || paying}
                  onClick={handleConfirm}
                  className="!h-11 !rounded-md !px-6 !text-sm !font-bold !normal-case"
                >
                  {creating || paying ? "Procesando..." : "Confirmar pedido"}
                </Button>
              )}
            </div>
          </div>

          <OrderSummary total={total} />
        </div>
      </section>

      <Footer />
    </main>
  );
}