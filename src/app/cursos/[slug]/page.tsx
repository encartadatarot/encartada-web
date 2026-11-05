import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Compra } from '@/components/Compra';
import { Texto } from '@/components/Texto';
import { cursosPublicados, getCurso } from '@/content/cursos';
import { lineaPrecios } from '@/lib/precios';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
// Next exige al menos un parámetro en export estático; si aún no hay cursos publicados, se genera un 404.
export const generateStaticParams = () =>
  cursosPublicados.length ? cursosPublicados.map((c) => ({ slug: c.slug })) : [{ slug: '_' }];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCurso((await params).slug);
  return { title: c?.titulo, description: c?.resumen };
}

export default async function PaginaCurso({ params }: Props) {
  const c = getCurso((await params).slug);
  if (!c) notFound();
  return (
    <div className={`contenedor acento-${c.acento}`}>
      <h1 className="titulo-pagina gotica">{c.titulo}</h1>
      {c.imagen && <Image src={c.imagen} alt="" width={800} height={800} style={{ maxWidth: 360, margin: '0 auto 24px' }} />}
      <div className="prosa">
        <p className="centro"><em>{c.resumen}</em></p>
        <Texto parrafos={c.descripcion} />
        {c.modulos && (
          <ul className="lista-modulos">
            {c.modulos.map((m) => <li key={m.titulo}><strong className="acento">{m.titulo}</strong>{m.descripcion && <> — {m.descripcion}</>}</li>)}
          </ul>
        )}
        <p className="lectura-meta centro">{lineaPrecios(c.precios)}</p>
        <Compra curso={c} />
      </div>
    </div>
  );
}
