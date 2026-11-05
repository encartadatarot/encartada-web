/** Utilidades de fecha/hora con zona horaria, sin dependencias. */

function partes(date: Date, tz: string) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  return Object.fromEntries(f.formatToParts(date).map((p) => [p.type, p.value])) as Record<string, string>;
}

function desfaseMin(date: Date, tz: string) {
  const p = partes(date, tz);
  const comoUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((comoUtc - date.getTime()) / 60000);
}

/** "2026-11-10" + "10:30" en Europe/Madrid → Date (instante UTC). */
export function horaLocalAUtc(fecha: string, hora: string, tz: string): Date {
  const [y, m, d] = fecha.split('-').map(Number);
  const [h, mi] = hora.split(':').map(Number);
  const supuesto = Date.UTC(y, m - 1, d, h, mi);
  let ts = supuesto - desfaseMin(new Date(supuesto), tz) * 60000;
  const ajuste = desfaseMin(new Date(ts), tz);
  ts = supuesto - ajuste * 60000;
  return new Date(ts);
}

/** Date → "AAAA-MM-DD" en la zona indicada. */
export function fechaEnZona(date: Date, tz: string) {
  const p = partes(date, tz);
  return `${p.year}-${p.month}-${p.day}`;
}

export function diaSemana(fecha: string) {
  const [y, m, d] = fecha.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function sumarDias(fecha: string, n: number) {
  const [y, m, d] = fecha.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export const esFecha = (s: unknown): s is string => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);

export function formatearHora(iso: string | Date, tz: string) {
  return new Intl.DateTimeFormat('es-ES', { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
}

export function formatearFechaLarga(iso: string | Date, tz: string) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}
