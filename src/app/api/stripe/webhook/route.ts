import { NextResponse } from 'next/server';
import { agenda } from '@/config/agenda';
import { sitio } from '@/config/sitio';
import { enviarEmail } from '@/lib/email';
import { stripe } from '@/lib/stripe';
import { formatearFechaLarga } from '@/lib/tiempo';

export const dynamic = 'force-dynamic';

/** Stripe llama aquí cuando se completa un pago. Envía los emails de confirmación. */
export async function POST(req: Request) {
  const secreto = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secreto) return NextResponse.json({ error: 'No configurado' }, { status: 503 });

  let evento;
  try {
    evento = stripe.webhooks.constructEvent(await req.text(), req.headers.get('stripe-signature') ?? '', secreto);
  } catch {
    return NextResponse.json({ error: 'Firma no válida' }, { status: 400 });
  }

  if (evento.type === 'checkout.session.completed') {
    const s = evento.data.object;
    const m = s.metadata ?? {};
    const cuando = m.inicio ? `${formatearFechaLarga(m.inicio, agenda.zonaHoraria)} (hora de Madrid)` : '';
    const detalle =
      m.tipo === 'servicio'
        ? `<p><b>${m.slug}</b> · ${m.modalidad}<br>${cuando}</p>`
        : `<p><b>${m.slug}</b></p>`;

    // Aviso para ti
    await enviarEmail(
      process.env.EMAIL_AVISOS ?? sitio.email,
      m.tipo === 'servicio' ? `Nueva reserva: ${m.nombre}` : `Nueva compra: ${m.nombre}`,
      `${detalle}<p>${m.nombre} · ${m.email} · ${m.telefono || 'sin teléfono'}</p><p>${m.notas ?? ''}</p>`,
    );
    // Confirmación para la clienta
    await enviarEmail(
      m.email,
      m.tipo === 'servicio' ? 'Tu cita con en_cartada está confirmada' : 'Gracias por tu compra en en_cartada',
      `<p>Hola ${m.nombre},</p>${detalle}<p>${
        m.tipo !== 'servicio' ? 'Te escribiré con el acceso muy pronto.'
          : m.modalidad === 'virtual' ? 'Te enviaré el enlace de la videollamada antes de la sesión.'
          : 'Te escribiré con la dirección en Madrid.'
      }</p><p>Con cariño,<br>${sitio.autora}</p>`,
    );
  }
  return NextResponse.json({ recibido: true });
}
