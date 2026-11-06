'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { menu as Menu } from '@/config/sitio';

/** Menú del móvil: se cierra al cambiar de página, con Escape o tocando la X. */
export function MenuMovil({ menu }: { menu: typeof Menu }) {
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();

  useEffect(() => setAbierto(false), [ruta]);

  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('keydown', alPulsar);
    document.body.style.overflow = 'hidden'; // evita que la página se desplace detrás del menú
    return () => {
      document.removeEventListener('keydown', alPulsar);
      document.body.style.overflow = '';
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <div className="menu-movil">
      <button
        type="button"
        className="menu-boton"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        aria-controls="menu-movil-panel"
        onClick={() => setAbierto((a) => !a)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {abierto ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>
      {abierto && (
        <nav id="menu-movil-panel" className="panel" aria-label="Principal">
          <p className="menu-cta"><Link href="/reservar" onClick={cerrar} className="boton acento-lema">Pide tu cita</Link></p>
          <ul>
            {menu.map((m) => (
              <li key={m.href}>
                <Link href={m.href} onClick={cerrar} aria-current={ruta === m.href ? 'page' : undefined}>{m.titulo}</Link>
                {m.hijos && (
                  <ul className="hijos">
                    {m.hijos.map((h) => (
                      <li key={h.href} className={h.sub ? 'sub' : undefined}>
                        <Link href={h.href} onClick={cerrar} aria-current={ruta === h.href ? 'page' : undefined}>{h.titulo}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
