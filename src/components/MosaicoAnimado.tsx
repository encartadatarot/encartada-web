'use client';

import Image from 'next/image';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { mosaico } from '@/content/mosaico';

/**
 * Mosaico de la portada: sus piezas se van «prendiendo» una a una, en desorden, como en Canva.
 * Espera a que carguen las piezas (máx. 2,5 s) para que la secuencia se vea entera.
 */
export function MosaicoAnimado({ alt }: { alt: string }) {
  const [encendido, setEncendido] = useState(false);
  const cargadas = useRef(0);
  useEffect(() => { const t = setTimeout(() => setEncendido(true), 2500); return () => clearTimeout(t); }, []);
  const alCargar = () => { cargadas.current += 1; if (cargadas.current >= mosaico.capas.length) setEncendido(true); };

  return (
    <div className={`mosaico-capas${encendido ? ' encendido' : ''}`} style={{ aspectRatio: `${mosaico.ancho} / ${mosaico.alto}` }} role="img" aria-label={alt}>
      {mosaico.capas.map((c, i) => (
        <div key={c.src} className="mosaico-capa" style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%`, zIndex: i, '--r': `${c.retraso}s` } as CSSProperties}>
          <Image src={c.src} alt="" fill priority sizes={`${Math.ceil(c.w)}vw`} onLoad={alCargar} />
        </div>
      ))}
    </div>
  );
}
