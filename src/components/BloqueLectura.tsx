import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCategoria } from '@/content/categorias';
import { imagen } from '@/content/imagenes';
import { oraculos } from '@/content/oraculos';
import type { Servicio } from '@/content/tipos';
import { lineaPrecios } from '@/lib/precios';
import { tieneCollage } from '@/content/collages';
import { CollageAnimado } from './CollageAnimado';
import { formatear, Texto } from './Texto';

/** «Virtual o presencial» en sueños y astrología, «Virtual y presencial» en tarot, como en la web de Canva. */
export function modalidadTexto(s: Servicio) {
  const enlace = ['suenos', 'astrologia'].includes(s.categoria) ? 'o' : 'y';
  const v = s.modalidades.includes('virtual');
  const p = s.modalidades.includes('presencial');
  return v && p ? `Virtual ${enlace} presencial (Madrid)` : v ? 'Virtual' : 'Presencial (Madrid)';
}

export function detalleLectura(s: Servicio) {
  return [s.cartas && `${s.cartas} cartas`, s.personas, `${s.duracionMin} min`].filter(Boolean).join(' - ');
}

/** Color y tipografía de una lectura, como en la web original. */
export function estiloLectura(s: Servicio) {
  const oraculo = oraculos[getCategoria(s.categoria)?.oraculo ?? 'terrestre'];
  return {
    className: `acento-${s.acento}`,
    style: (s.color ? { '--acento': s.color } : undefined) as CSSProperties | undefined,
    fuente: oraculo.fuente,
  };
}

export function TituloLectura({ servicio: s, como: Tag = 'h2' }: { servicio: Servicio; como?: 'h1' | 'h2' | 'h3' }) {
  const { fuente } = estiloLectura(s);
  return <Tag className={`titulo-lectura ${fuente}`}>{formatear(s.titulo ?? s.nombre)}</Tag>;
}

export function BloqueLectura({ servicio: s }: { servicio: Servicio }) {
  const { className, style } = estiloLectura(s);
  const online = s.reservaOnline !== false;
  return (
    <section className={`lectura ${className}${s.imagen ? '' : ' sin-imagen'}`} style={style} id={s.slug}>
      <div className="lectura-texto">
        <TituloLectura servicio={s} />
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
          {tieneCollage(s.slug) ? (
            <CollageAnimado nombre={s.slug} alt={`Collage de cartas de ${s.nombre}`} />
          ) : (
            <Image {...imagen(s.imagen)} alt={`Collage de cartas de ${s.nombre}`} sizes="(max-width: 760px) 300px, 420px" />
          )}
        </div>
      )}
    </section>
  );
}
