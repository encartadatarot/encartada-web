import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Letras } from '@/components/Apariciones';
import { Compra } from '@/components/Compra';
import { formatear, Texto } from '@/components/Texto';
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
      <Letras as="h1" className="titulo-pagina gotica">{c.titulo}</Letras>
      {c.imagen && <div className="flota curso-portada-marco"><Image {...imagen(c.imagen)} alt={`Portada de ${c.titulo}`} sizes="(max-width: 760px) 90vw, 480px" priority className="curso-portada" /></div>}
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
      </div>
      {c.sesiones && (
        <div className="sesiones">
          {c.sesiones.map((x, i) => (
            <section key={i} className="sesion">
              {x.imagen && <Image {...imagen(x.imagen)} alt="" sizes="(max-width: 760px) 200px, 240px" />}
              <div>
                <h2 className="gotica acento">sesión {i + 1}</h2>
                <h3>{formatear(x.titulo)}</h3>
                <Texto parrafos={x.texto} />
              </div>
            </section>
          ))}
        </div>
      )}
      <div className="prosa">
        {Object.keys(c.precios).length > 0 && <p className="lectura-meta centro">{lineaPrecios(c.precios)}</p>}
        <Compra curso={c} />
      </div>
    </div>
  );
}
