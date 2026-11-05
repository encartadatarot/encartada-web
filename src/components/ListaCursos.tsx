import Link from 'next/link';
import { enlaceWhatsapp, sitio } from '@/config/sitio';
import type { Curso } from '@/content/tipos';
import { lineaPrecios } from '@/lib/precios';

export function ListaCursos({ cursos, vacio }: { cursos: Curso[]; vacio: string }) {
  if (!cursos.length) {
    return (
      <div className="intro">
        <p><em>{vacio}</em></p>
        <a className="boton acento-rojo" href={enlaceWhatsapp(`Hola ${sitio.autora}, quiero saber cuándo salen los próximos cursos`)} target="_blank" rel="noreferrer">Avísame</a>
      </div>
    );
  }
  return (
    <div className="rejilla">
      {cursos.map((c) => (
        <Link key={c.slug} href={`/cursos/${c.slug}`} className={`tarjeta acento-${c.acento}`}>
          <span className="etiqueta">{c.tipo}</span>
          <h3 className="gotica">{c.titulo}</h3>
          <p>{c.resumen}</p>
          <p className="acento">{lineaPrecios(c.precios)}</p>
        </Link>
      ))}
    </div>
  );
}
