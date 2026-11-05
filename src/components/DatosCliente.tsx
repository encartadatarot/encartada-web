'use client';

import type { Moneda, Precios } from '@/content/tipos';
import { formatearPrecio, monedas } from '@/lib/precios';

export type Datos = { nombre: string; email: string; telefono: string; notas: string };
export const datosVacios: Datos = { nombre: '', email: '', telefono: '', notas: '' };

export function DatosCliente({ datos, onChange, conNotas = true }: { datos: Datos; onChange: (d: Datos) => void; conNotas?: boolean }) {
  const set = (k: keyof Datos) => (e: { target: { value: string } }) => onChange({ ...datos, [k]: e.target.value });
  return (
    <div className="campos">
      <div className="campo"><label htmlFor="nombre">Nombre</label><input id="nombre" autoComplete="name" required value={datos.nombre} onChange={set('nombre')} /></div>
      <div className="campo"><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" required value={datos.email} onChange={set('email')} /></div>
      <div className="campo"><label htmlFor="telefono">WhatsApp (opcional)</label><input id="telefono" type="tel" autoComplete="tel" value={datos.telefono} onChange={set('telefono')} /></div>
      {conNotas && (
        <div className="campo"><label htmlFor="notas">¿Algo que quieras contarme antes? (opcional)</label><textarea id="notas" rows={3} maxLength={450} value={datos.notas} onChange={set('notas')} /></div>
      )}
    </div>
  );
}

export function SelectorMoneda({ precios, moneda, onChange }: { precios: Precios; moneda: Moneda; onChange: (m: Moneda) => void }) {
  return (
    <div className="opciones" role="group" aria-label="Moneda">
      {monedas.filter((m) => precios[m.id] != null).map((m) => (
        <button key={m.id} type="button" className="opcion" aria-pressed={moneda === m.id} onClick={() => onChange(m.id)}>
          {formatearPrecio(precios[m.id]!, m.id)}
        </button>
      ))}
    </div>
  );
}
