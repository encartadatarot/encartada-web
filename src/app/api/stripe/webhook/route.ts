import { NextResponse } from 'next/server';
import { agenda, esRegion, nombreZona, zonaDeAgenda } from '@/config/agenda';
import { sitio } from '@/config/sitio';
import { getCurso } from '@/content/cursos';
import { getServicio } from '@/content/servicios';
import { olvidarOcupacion } from '@/lib/disponibilidad';
import { enviarEmail, esc } from '@/lib/email';
import { crearEventoCita } from '@/lib/google-calendar';
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
    const raw = s.metadata ?? {};
    const m = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, esc(v)])) as Record<string, string>;
    const titulo = m.tipo === 'servicio' ? getServicio(raw.slug)?.nombre : getCurso(raw.slug)?.titulo;
    // Hora en la agenda que eligió la clienta (Europa o América, en su hora); para ti, también en hora de Madrid.
    const tzCita = zonaDeAgenda(esRegion(raw.region) ? raw.region : 'europa', raw.zona);
    const cuando = raw.inicio ? `${formatearFechaLarga(raw.inicio, tzCita)} (${nombreZona(tzCita)})` : '';
    const cuandoMadrid = raw.inicio && tzCita !== agenda.zonaHoraria ? `<br>${formatearFechaLarga(raw.inicio, agenda.zonaHoraria)} (hora de Madrid)` : '';
    const detalle =
      m.tipo === 'servicio'
        ? `<p><b>${titulo ?? m.slug}</b> · ${m.modalidad}<br>${cuando}</p>`
        : `<p><b>${titulo ?? m.slug}</b><br>${m.sesion || m.modo || ''}</p>`;

    // Apunta la cita en tu Google Calendar (si está conectado). Si falla, no bloquea los correos.
    if (raw.tipo === 'servicio' && raw.inicio && raw.fin) {
      olvidarOcupacion();
      try {
        await crearEventoCita({
          referencia: s.id,
          titulo: `${titulo ?? raw.slug} · ${raw.nombre}`,
          inicio: raw.inicio,
          fin: raw.fin,
          ubicacion: raw.modalidad === 'presencial' ? 'Presencial (Madrid)' : 'Virtual (videollamada)',
          descripcion: [
            `Reserva pagada en la web (${raw.modalidad}).`,
            raw.inicio && tzCita !== agenda.zonaHoraria ? `Hora de la clienta: ${formatearFechaLarga(raw.inicio, tzCita)} (${nombreZona(tzCita)})` : '',
            `Nombre: ${raw.nombre}`,
            `Email: ${raw.email}`,
            raw.telefono ? `Teléfono: ${raw.telefono}` : '',
            raw.notas ? `Notas: ${raw.notas}` : '',
          ].filter(Boolean).join('\n'),
        });
      } catch (e) {
        console.error(e);
      }
    }

    // Aviso para ti
    await enviarEmail(
      process.env.EMAIL_AVISOS ?? sitio.email,
      m.tipo === 'servicio' ? `Nueva reserva: ${raw.nombre}` : `Nueva compra: ${raw.nombre}`,
      `${detalle.replace('</p>', `${cuandoMadrid}</p>`)}<p>${m.nombre} · ${m.email} · ${m.telefono || 'sin teléfono'}</p><p>${m.notas ?? ''}${m.respuesta ? `¿Qué quisieras aprender? ${m.respuesta}` : ''}</p>`,
    );
    // Confirmación para la clienta (formato de correo de identidad/voz-y-estilo.md)
    const siguiente =
      m.tipo !== 'servicio' ? 'Te escribiré con el acceso muy pronto.'
        : m.modalidad === 'virtual' ? 'Te enviaré el enlace de la videollamada antes de la sesión.'
        : 'Te escribiré con la dirección en Madrid.';
    await enviarEmail(
      raw.email,
      m.tipo === 'servicio' ? 'Tu cita con en_cartada está confirmada' : 'Tu inscripción en en_cartada',
      `<p>Hola, ${m.nombre}!</p>${detalle}<p>${siguiente}</p><p>Te agradezco tu confianza; la corresponderé con todo mi cariño.</p><p>Un abrazo!<br>Camila CC<br>@en_cartada</p>`,
    );
  }
  return NextResponse.json({ recibido: true });
}
