import Image from 'next/image';
import Link from 'next/link';
import { imagen } from '@/content/imagenes';
import type { Curso } from '@/content/tipos';
import { lineaPrecios } from '@/lib/precios';

const etiquetas: Record<Curso['tipo'], string> = { curso: 'curso', clase: 'clase', grabacion: 'grabación' };

export function ListaCursos({ cursos, vacio }: { cursos: Curso[]; vacio: string }) {
  if (!cursos.length) return <p className="intro"><em>{vacio}</em></p>;
  return (
    <div className="rejilla">
      {cursos.map((c) => (
        <Link key={c.slug} href={`/cursos/${c.slug}`} className={`tarjeta acento-${c.acento}`}>
          {c.imagen && <Image {...imagen(c.imagen)} alt="" sizes="(max-width: 760px) 90vw, 340px" className="tarjeta-portada" />}
          <span className="etiqueta">{etiquetas[c.tipo]}</span>
          <h3 className="gotica">{c.titulo}</h3>
          <p>{c.resumen}</p>
          <p className="acento">{lineaPrecios(c.precios)}</p>
        </Link>
      ))}
    </div>
  );
}
