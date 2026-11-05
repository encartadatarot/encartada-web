import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { agenda } from '@/config/agenda';
import { sitio } from '@/config/sitio';
import { getCurso } from '@/content/cursos';
import { getServicio } from '@/content/servicios';
import type { Modalidad } from '@/content/tipos';
import { huecosDisponibles } from '@/lib/disponibilidad';
import { aCentimos, esMoneda } from '@/lib/precios';
import { stripe } from '@/lib/stripe';
import { fechaEnZona, formatearFechaLarga } from '@/lib/tiempo';

export const dynamic = 'force-dynamic';

const texto = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const error = (msg: string, status = 400) => NextResponse.json({ error: msg }, { status });

export async function POST(req: Request) {
  if (!stripe) return error('Los pagos online aún no están activados.', 503);
  const body = await req.json().catch(() => ({}));

  const moneda = body.moneda;
  const nombre = texto(body.nombre, 100);
  const email = texto(body.email, 200);
  if (!esMoneda(moneda)) return error('Moneda no válida');
  if (!nombre || !/^\S+@\S+\.\S+$/.test(email)) return error('Escribe tu nombre y un email válido');

  const origen = req.headers.get('origin') ?? sitio.url;
  let item: { nombre: string; descripcion: string; importe: number };
  let metadata: Record<string, string> = { nombre, email, telefono: texto(body.telefono, 40) };

  if (body.tipo === 'servicio') {
    const servicio = getServicio(texto(body.slug));
    const importe = servicio?.precios[moneda];
    if (!servicio || servicio.reservaOnline === false || importe == null) return error('Lectura no disponible');
    const modalidad = body.modalidad as Modalidad;
    if (!servicio.modalidades.includes(modalidad)) return error('Modalidad no válida');

    // Volvemos a comprobar en el servidor que el hueco sigue libre.
    const inicio = texto(body.inicio, 40);
    const fecha = inicio ? fechaEnZona(new Date(inicio), agenda.zonaHoraria) : '';
    const hueco = (await huecosDisponibles(servicio, fecha)).find((h) => h.inicio === inicio);
    if (!hueco) return error('Ese horario ya no está disponible, elige otro por favor.', 409);

    item = {
      nombre: `${servicio.nombre} · ${modalidad === 'virtual' ? 'Virtual' : 'Presencial (Madrid)'}`,
      descripcion: `${formatearFechaLarga(hueco.inicio, agenda.zonaHoraria)} (hora de Madrid) · ${servicio.duracionMin} min`,
      importe,
    };
    metadata = { ...metadata, tipo: 'servicio', slug: servicio.slug, modalidad, fecha, inicio: hueco.inicio, fin: hueco.fin, notas: texto(body.notas, 450) };
  } else if (body.tipo === 'curso') {
    const curso = getCurso(texto(body.slug));
    const importe = curso?.precios[moneda];
    if (!curso || importe == null) return error('Curso no disponible');
    item = { nombre: curso.titulo, descripcion: curso.resumen, importe };
    metadata = { ...metadata, tipo: 'curso', slug: curso.slug };
  } else {
    return error('Tipo no válido');
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: 'embedded_page',
    mode: 'payment',
    locale: 'es',
    customer_email: email,
    line_items: [{
      quantity: 1,
      price_data: { currency: moneda, unit_amount: aCentimos(item.importe), product_data: { name: item.nombre, description: item.descripcion } },
    }],
    metadata,
    payment_intent_data: { metadata, description: item.nombre },
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // el hueco se "guarda" 30 min mientras paga
    return_url: `${origen}/gracias?session_id={CHECKOUT_SESSION_ID}`,
  };
  const session = await stripe.checkout.sessions.create(params);
  return NextResponse.json({ clientSecret: session.client_secret });
}
