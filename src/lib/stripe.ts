import Stripe from 'stripe';

const clave = process.env.STRIPE_SECRET_KEY;

/** null si aún no has configurado Stripe: el calendario se ve, pero el botón de pago queda desactivado. */
export const stripe = clave ? new Stripe(clave) : null;
