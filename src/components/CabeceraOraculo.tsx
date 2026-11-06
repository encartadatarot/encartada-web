import type { CSSProperties } from 'react';
import Image from 'next/image';
import { imagen } from '@/content/imagenes';
import { oraculos, type Oraculo } from '@/content/oraculos';
import { tieneCollage } from '@/content/collages';
import { CollageAnimado } from './CollageAnimado';
import { Texto } from './Texto';

/** Cabecera de cada oráculo: collage a la izquierda, título y texto a la derecha (como en Canva). */
export function CabeceraOraculo({ oraculo, intro }: { oraculo: Oraculo; intro: string[] }) {
  const o = oraculos[oraculo];
  return (
    <section className="cabecera-oraculo" style={{ '--acento': o.color } as CSSProperties}>
      <div className="cabecera-oraculo-imagen">
        {tieneCollage(`oraculo-${oraculo}`) ? (
          <CollageAnimado nombre={`oraculo-${oraculo}`} alt={`Collage del ${o.titulo}`} ancho={360} priority />
        ) : (
          <Image {...imagen(o.collage)} alt={`Collage del ${o.titulo}`} priority sizes="(max-width: 760px) 260px, 360px" />
        )}
      </div>
      <div>
        <h1 className={`${o.fuente} acento`}>{o.titulo}</h1>
        <Texto parrafos={intro} className="cabecera-oraculo-texto" />
      </div>
    </section>
  );
}
