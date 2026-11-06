import Link from 'next/link';
import { esRegion, nombreZona, zonaDeAgenda } from '@/config/agenda';
import { stripe } from '@/lib/stripe';
import { formatearFechaLarga } from '@/lib/tiempo';

export const metadata = { title: 'Gracias', robots: { index: false } };
export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function Gracias({ searchParams }: Props) {
  const id = (await searchParams).session_id;
  const sesion = stripe && id ? await stripe.checkout.sessions.retrieve(id).catch(() => null) : null;
  const pagado = sesion?.payment_status === 'paid';
  const m = sesion?.metadata ?? {};
  const tzCita = zonaDeAgenda(esRegion(m.region) ? m.region : 'europa', m.zona);

  return (
    <div className="contenedor centro acento-dorado">
      <h1 className="titulo-pagina gotica">{pagado ? 'Gracias' : 'Pago pendiente'}</h1>
      <div className="intro">
        {pagado ? (
          m.tipo === 'servicio' ? (
            <>
              <p>Tu cita está confirmada para el</p>
              <p className="acento"><strong>{formatearFechaLarga(m.inicio, tzCita)}</strong> ({nombreZona(tzCita)})</p>
              <p><em>{m.modalidad === 'virtual' ? 'Te enviaré el enlace de la videollamada antes de la sesión.' : 'Te escribiré con la dirección en Madrid.'}</em></p>
            </>
          ) : (
            <p>Tu inscripción está hecha. Te escribiré a <strong>{m.email}</strong> con el acceso.</p>
          )
        ) : (
          <p>No hemos podido confirmar el pago. Si crees que es un error, escríbeme.</p>
        )}
      </div>
      <Link href="/" className="boton">Volver al inicio</Link>
    </div>
  );
}
