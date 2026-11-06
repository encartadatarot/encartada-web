'use client';

import { usePathname } from 'next/navigation';
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode, useEffect, useRef, useState } from 'react';

/** Llama a `al` la primera vez que el elemento entra en pantalla. */
function useVisto<T extends Element>() {
  const ref = useRef<T>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setVisto(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisto(true); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visto] as const;
}

const textoPlano = (n: ReactNode): string =>
  typeof n === 'string' || typeof n === 'number' ? String(n)
    : Array.isArray(n) ? n.map(textoPlano).join('')
    : isValidElement(n) ? textoPlano((n.props as { children?: ReactNode }).children) : '';

/** Parte el texto en palabras y letras; cada letra con un retraso "al azar" (fijo, para que servidor y navegador coincidan). */
function partir(n: ReactNode, cuenta: { i: number }): ReactNode {
  if (typeof n === 'string') {
    return n.split(/(\s+)/).map((trozo, w) =>
      /^\s+$/.test(trozo) || !trozo ? trozo : (
        <span key={`w${cuenta.i}-${w}`} className="palabra">
          {[...trozo].map((ch) => {
            const i = cuenta.i++;
            return <span key={i} className="letra" aria-hidden="true" style={{ '--d': `${(((i * 7919) % 97) / 97 * 1.6).toFixed(2)}s` } as React.CSSProperties}>{ch}</span>;
          })}
        </span>
      ));
  }
  if (Array.isArray(n)) return n.map((x, k) => <span key={`a${k}`} style={{ display: 'contents' }}>{partir(x, cuenta)}</span>);
  if (isValidElement(n)) {
    const el = n as ReactElement<{ children?: ReactNode }>;
    return cloneElement(el, {}, Children.map(el.props.children, (c) => partir(c, cuenta)));
  }
  return n;
}

/**
 * Título que aparece letra a letra, desde borroso y en desorden, como en la web de Canva.
 * Se activa al entrar en pantalla. Con «reducir movimiento», aparece sin efecto.
 */
export function Letras({ children, as: Tag = 'span', className, style }: {
  children: ReactNode; as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; className?: string; style?: React.CSSProperties;
}) {
  const [ref, visto] = useVisto<HTMLElement>();
  return (
    <Tag ref={ref as never} className={`letras${visto ? ' visto' : ''}${className ? ` ${className}` : ''}`} style={style} aria-label={textoPlano(children)}>
      {partir(children, { i: 0 })}
    </Tag>
  );
}

/**
 * En pantallas táctiles no hay «pasar el ratón»: al tocar una imagen quieta, se mueve unos segundos
 * (clase .tocado, con las mismas reglas que :hover).
 */
export function MovimientoAlTocar() {
  useEffect(() => {
    const temporizadores = new WeakMap<Element, number>();
    const alTocar = (e: TouchEvent) => {
      const el = (e.target as Element | null)?.closest('.flota, .collage.al-pasar');
      const objetivo = el?.classList.contains('collage') ? (el.closest('a') ?? el) : el;
      if (!objetivo) return;
      objetivo.classList.add('tocado');
      clearTimeout(temporizadores.get(objetivo));
      temporizadores.set(objetivo, window.setTimeout(() => objetivo.classList.remove('tocado'), 3500));
    };
    document.addEventListener('touchstart', alTocar, { passive: true });
    return () => document.removeEventListener('touchstart', alTocar);
  }, []);
  return null;
}

/** Funde cada imagen de la página al entrar en pantalla (también las que aparecen al navegar). */
export function ObservadorApariciones() {
  const ruta = usePathname();
  useEffect(() => {
    const raiz = document.querySelector('main');
    if (!raiz) return;
    if (!('IntersectionObserver' in window)) { raiz.querySelectorAll('img').forEach((i) => i.classList.add('visto')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -5% 0px' });
    const vigilar = () => raiz.querySelectorAll('img:not(.visto)').forEach((i) => io.observe(i));
    vigilar();
    const mo = new MutationObserver(vigilar);
    mo.observe(raiz, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [ruta]);
  return null;
}
