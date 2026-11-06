import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { detalleLectura, estiloLectura, modalidadTexto, TituloLectura } from '@/components/BloqueLectura';
import { imagen } from '@/content/imagenes';
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
  const { className, style } = estiloLectura(s);
  return (
    <div className={`contenedor reserva ${className}`} style={style}>
      <aside className="reserva-resumen">
        {s.imagen && <Image {...imagen(s.imagen)} alt="" sizes="220px" />}
        <TituloLectura servicio={s} como="h1" />
        <Texto parrafos={s.descripcion} className="lectura-desc" />
        <p className="lectura-meta">
          {modalidadTexto(s)}<br />
          <b>{detalleLectura(s)}</b><br />
          {lineaPrecios(s.precios)}
        </p>
        {s.preparacion && <p className="aviso"><em>Preparación:</em> {s.preparacion}</p>}
      </aside>
      <Reserva servicio={s} />
    </div>
  );
}
