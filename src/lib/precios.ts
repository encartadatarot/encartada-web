import type { Moneda, Precios } from '@/content/tipos';

export const monedas: { id: Moneda; etiqueta: string }[] = [
  { id: 'eur', etiqueta: '€ EUR' },
  { id: 'usd', etiqueta: '$ USD' },
  { id: 'cop', etiqueta: '$ COP' },
];

export function formatearPrecio(valor: number, moneda: Moneda) {
  if (moneda === 'eur') return `${valor.toLocaleString('es-ES')} €`;
  if (moneda === 'usd') return `${valor.toLocaleString('es-ES')} $`;
  return `${valor.toLocaleString('es-CO')} COP`;
}

/** "50 € / 60 $ / 165.000 COP" como en tu web original. */
export function lineaPrecios(p: Precios) {
  return monedas.filter((m) => p[m.id] != null).map((m) => formatearPrecio(p[m.id]!, m.id)).join(' / ');
}

export const esMoneda = (s: unknown): s is Moneda => s === 'eur' || s === 'usd' || s === 'cop';

/** Stripe recibe importes en céntimos (EUR, USD y COP son monedas de 2 decimales en Stripe). */
export const aCentimos = (valor: number) => Math.round(valor * 100);
