import Stripe from 'stripe';

const clave = process.env.STRIPE_SECRET_KEY;

/** null si aún no has configurado Stripe: la web sigue funcionando y ofrece WhatsApp. */
export const stripe = clave ? new Stripe(clave) : null;
