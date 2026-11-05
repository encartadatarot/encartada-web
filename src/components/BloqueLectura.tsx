import Image from 'next/image';
import Link from 'next/link';
import type { Servicio } from '@/content/tipos';
import { lineaPrecios } from '@/lib/precios';
import { Texto } from './Texto';

export function modalidadTexto(s: Servicio) {
  const v = s.modalidades.includes('virtual');
  const p = s.modalidades.includes('presencial');
  return v && p ? 'Virtual y presencial (Madrid)' : v ? 'Virtual' : 'Presencial (Madrid)';
}

export function detalleLectura(s: Servicio) {
  return [s.cartas && `${s.cartas} cartas`, s.personas, `${s.duracionMin} min`].filter(Boolean).join(' - ');
}

export function BloqueLectura({ servicio: s }: { servicio: Servicio }) {
  const online = s.reservaOnline !== false;
  return (
    <section className={`lectura acento-${s.acento}${s.imagen ? '' : ' sin-imagen'}`} id={s.slug}>
      <div className="lectura-texto">
        <h2 className="gotica">{s.nombre}</h2>
        <Texto parrafos={s.descripcion} className="lectura-desc" />
        <p className="lectura-meta">
          {modalidadTexto(s)}<br />
          <b>{detalleLectura(s)}</b><br />
          {lineaPrecios(s.precios)}
        </p>
        {s.preparacion && <p className="nota"><em>Preparación:</em> {s.preparacion}</p>}
        {online && <Link href={`/reservar/${s.slug}`} className="boton">Pide tu cita</Link>}
      </div>
      {s.imagen && (
        <div className="lectura-imagen">
          <Image src={s.imagen} alt={`Cartas de la lectura ${s.nombre}`} width={840} height={1400} sizes="(max-width: 760px) 300px, 420px" />
        </div>
      )}
    </section>
  );
}
