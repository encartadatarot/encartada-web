import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Compra } from '@/components/Compra';
import { Texto } from '@/components/Texto';
import { cursosPublicados, getCurso } from '@/content/cursos';
import { imagen } from '@/content/imagenes';
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
  const conFicha = c.fechas || c.formato || c.requisitos || c.temario;
  return (
    <div className={`contenedor acento-${c.acento}`}>
      <h1 className="titulo-pagina gotica">{c.titulo}</h1>
      {c.imagen && <Image {...imagen(c.imagen)} alt={`Portada de ${c.titulo}`} sizes="360px" priority style={{ maxWidth: 360, width: '100%', margin: '0 auto 24px' }} />}
      <div className="prosa">
        <p className="centro"><em>{c.resumen}</em></p>
        <Texto parrafos={c.descripcion} />
        {conFicha && (
          <dl className="ficha">
            {c.fechas && <><dt>Fechas</dt><dd>{c.fechas}</dd></>}
            {c.formato && <><dt>Formato</dt><dd>{c.formato}</dd></>}
            {c.requisitos && <><dt>Requisitos</dt><dd><ul>{c.requisitos.map((r) => <li key={r}>{r}</li>)}</ul></dd></>}
            {c.temario?.map((t, i) => (
              <div key={i}>
                <dt>{t.parte ?? 'Sesiones'}</dt>
                <dd><ol start={c.temario!.slice(0, i).reduce((n, x) => n + x.sesiones.length, 1)}>{t.sesiones.map((x) => <li key={x}>{x}</li>)}</ol></dd>
              </div>
            ))}
          </dl>
        )}
        {Object.keys(c.precios).length > 0 && <p className="lectura-meta centro">{lineaPrecios(c.precios)}</p>}
        <Compra curso={c} />
      </div>
    </div>
  );
}
