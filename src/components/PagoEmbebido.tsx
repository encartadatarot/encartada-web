'use client';

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const clave = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// Stripe.js se carga solo cuando hace falta pagar, no en cada página.
let stripePromise: ReturnType<typeof loadStripe> | null = null;
const getStripe = () => (clave ? (stripePromise ??= loadStripe(clave)) : null);

export const pagosActivos = Boolean(clave);

/** Formulario de pago de Stripe dentro de la propia página (tarjeta, Apple Pay, Google Pay…). */
export function PagoEmbebido({ clientSecret }: { clientSecret: string }) {
  return (
    <div className="pago">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export async function crearPago(datos: Record<string, unknown>): Promise<string> {
  const r = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.clientSecret) throw new Error(j.error ?? 'No se pudo iniciar el pago');
  return j.clientSecret;
}
