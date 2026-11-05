import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { modalidadTexto } from '@/components/BloqueLectura';
import { Reserva } from '@/components/Reserva';
import { Texto } from '@/components/Texto';
import { getServicio, serviciosPublicados } from '@/content/servicios';
import { lineaPrecios } from '@/lib/precios';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => serviciosPublicados.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Reservar ${getServicio((await params).slug)?.nombre ?? ''}` };
}

export default async function ReservarServicio({ params }: Props) {
  const s = getServicio((await params).slug);
  if (!s || s.reservaOnline === false) notFound();
  return (
    <div className={`contenedor reserva acento-${s.acento}`}>
      <aside className="reserva-resumen">
        {s.imagen && <Image src={s.imagen} alt="" width={840} height={1400} />}
        <h1 className="gotica">{s.nombre}</h1>
        <Texto parrafos={s.descripcion} className="lectura-desc" />
        <p className="lectura-meta">
          {modalidadTexto(s)}<br />
          <b>{s.cartas ? `${s.cartas} cartas - ` : ''}{s.duracionMin} min</b><br />
          {lineaPrecios(s.precios)}
        </p>
      </aside>
      <Reserva servicio={s} />
    </div>
  );
}
