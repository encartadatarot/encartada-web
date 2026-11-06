'use client';

import Image from 'next/image';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { collages } from '@/content/collages';

/**
 * Collage de Canva montado con sus tiras por separado. Cada tira se balancea a su ritmo,
 * como en la web original, y solo mientras el collage está en pantalla.
 * Sin movimiento si la persona tiene activado «reducir movimiento».
 */
export function CollageAnimado({ nombre, alt, ancho = 420, priority = false, alPasar = false }: {
  nombre: string; alt: string; ancho?: number; priority?: boolean;
  /** Quieto, y se mueve solo al pasar el ratón (para las imágenes que en Canva no se movían). */
  alPasar?: boolean;
}) {
  const c = collages[nombre];
  const ref = useRef<HTMLDivElement>(null);
  const [enVista, setEnVista] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || alPasar) return;
    const io = new IntersectionObserver(([e]) => setEnVista(e.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, [alPasar]);

  if (!c) return null;
  return (
    <div ref={ref} className={`collage${alPasar ? ' al-pasar' : enVista ? ' en-vista' : ''}`} style={{ aspectRatio: `${c.ancho} / ${c.alto}` }} role="img" aria-label={alt}>
      {c.capas.map((k, i) => (
        <div
          key={k.src}
          className="collage-capa"
          style={{
            left: `${k.x}%`, top: `${k.y}%`, width: `${k.w}%`, height: `${k.h}%`, zIndex: i,
            '--giro': `${k.giro}deg`, '--contragiro': `${k.contragiro}deg`, '--dx': `${k.dx}%`, '--dy': `${k.dy}%`,
            '--duracion': `${k.duracion}s`, '--retraso': alPasar ? '0s' : `${k.retraso}s`,
          } as CSSProperties}
        >
          <Image src={k.src} alt="" fill priority={priority} sizes={`(max-width: 760px) ${Math.ceil((k.w / 100) * 300)}px, ${Math.ceil((k.w / 100) * ancho)}px`} />
        </div>
      ))}
    </div>
  );
}

