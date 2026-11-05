import type { ReactNode } from 'react';

const RE = /\*\*(.+?)\*\*|==(.+?)==|_(.+?)_/;

/** Convierte **negrita**, _cursiva_ y ==acento== en HTML. */
export function formatear(s: string, clave = 'f'): ReactNode[] {
  const out: ReactNode[] = [];
  let resto = s;
  let i = 0;
  while (resto) {
    const m = RE.exec(resto);
    if (!m) { out.push(resto); break; }
    if (m.index) out.push(resto.slice(0, m.index));
    const k = `${clave}-${i++}`;
    if (m[1] !== undefined) out.push(<strong key={k}>{formatear(m[1], k)}</strong>);
    else if (m[2] !== undefined) out.push(<span key={k} className="acento">{formatear(m[2], k)}</span>);
    else out.push(<em key={k}>{formatear(m[3], k)}</em>);
    resto = resto.slice(m.index + m[0].length);
  }
  return out;
}

export function Texto({ parrafos, className }: { parrafos: string[]; className?: string }) {
  return (
    <div className={className}>
      {parrafos.map((p, i) => <p key={i}>{formatear(p, `p${i}`)}</p>)}
    </div>
  );
}
