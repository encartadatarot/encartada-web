import 'server-only';
import { agenda, type Region, regiones, zonaDeAgenda } from '@/config/agenda';
import type { Servicio } from '@/content/tipos';
import { eventosOcupados } from './google-calendar';
import { stripe } from './stripe';
import { diaSemana, esFecha, fechaEnZona, horaLocalAUtc, sumarDias } from './tiempo';

const tzBase = agenda.zonaHoraria;
const MIN = 60000;
/** `cuenta`: si suma para el máximo de horas de citas del día. */
type Intervalo = { inicio: number; fin: number; cuenta?: boolean };

/** ¿Se puede reservar ese día (en la hora local de la agenda)? */
export function fechaPermitida(fecha: string, tz: string) {
  const hoy = fechaEnZona(new Date(), tz);
  return fecha >= hoy && fecha <= sumarDias(hoy, agenda.diasMaxAdelante);
}

/**
 * Todo lo ocupado en las próximas semanas, de dos fuentes:
 * - Citas pagadas en la web: Stripe hace de "base de datos" (cada pago guarda inicio y fin).
 *   Como solo se puede reservar con `diasMaxAdelante` días de antelación, basta con mirar los pagos de ese periodo.
 * - Tu Google Calendar: cualquier evento bloquea su horario (los creados por la web no se cuentan dos veces).
 * Se guarda en memoria 30 s para no consultar en cada día del calendario.
 */
let cache: { hasta: number; citas: Intervalo[] } | null = null;

/** Para que una cita recién pagada desaparezca enseguida del calendario. */
export function olvidarOcupacion() { cache = null; }

async function citasPagadas(fresco = false): Promise<Intervalo[]> {
  if (!fresco && cache && cache.hasta > Date.now()) return cache.citas;
  const [web, calendario] = await Promise.all([citasDeStripe(), citasDeGoogle()]);
  const citas = [...web, ...calendario];
  cache = { hasta: Date.now() + 30_000, citas };
  return citas;
}

async function citasDeGoogle(): Promise<Intervalo[]> {
  try {
    const ahora = new Date();
    const hasta = new Date(ahora.getTime() + (agenda.diasMaxAdelante + 2) * 86400000);
    return (await eventosOcupados(new Date(ahora.getTime() - 86400000), hasta))
      .filter((e) => !e.deLaWeb)
      .map((e) => ({ inicio: e.inicio, fin: e.fin, cuenta: agenda.eventosDeGoogleCuentanEnMaximo }));
  } catch (e) {
    // Si Google falla, la web sigue funcionando con las citas de Stripe; queda en el registro de Vercel.
    console.error('Google Calendar:', e);
    return [];
  }
}

async function citasDeStripe(): Promise<Intervalo[]> {
  if (!stripe) return [];
  const desde = Math.floor(Date.now() / 1000) - (agenda.diasMaxAdelante + 2) * 86400;
  const citas: Intervalo[] = [];
  let page: string | undefined;
  do {
    const res = await stripe.paymentIntents.search({
      query: `status:'succeeded' AND metadata['tipo']:'servicio' AND created>${desde}`,
      limit: 100,
      ...(page ? { page } : {}),
    });
    for (const pi of res.data) {
      const inicio = Date.parse(pi.metadata.inicio ?? ''), fin = Date.parse(pi.metadata.fin ?? '');
      if (inicio && fin) citas.push({ inicio, fin });
    }
    page = res.has_more ? (res.next_page ?? undefined) : undefined;
  } while (page);
  return citas;
}

/** Citas apuntadas a mano y días bloqueados (en hora de Madrid), como intervalos absolutos. */
function ocupadoManual(): Intervalo[] {
  const citas = agenda.ocupadoManual.map((o) => ({ inicio: +horaLocalAUtc(o.fecha, o.desde, tzBase), fin: +horaLocalAUtc(o.fecha, o.hasta, tzBase) }));
  const dias = agenda.diasBloqueados.map((f) => ({ inicio: +horaLocalAUtc(f, '00:00', tzBase), fin: +horaLocalAUtc(sumarDias(f, 1), '00:00', tzBase) }));
  return [...citas, ...dias];
}

/** La pausa diaria (en hora de Madrid) alrededor de ese día, como intervalos absolutos. */
function pausas(fecha: string): Intervalo[] {
  return [sumarDias(fecha, -1), fecha, sumarDias(fecha, 1)].flatMap((f) =>
    agenda.pausaDiaria.map(([desde, hasta]) => ({ inicio: +horaLocalAUtc(f, desde, tzBase), fin: +horaLocalAUtc(f, hasta, tzBase) })),
  );
}

/** Minutos de citas que ya hay en un día de Madrid (para el máximo diario). */
function minutosDelDia(fechaMadrid: string, citas: Intervalo[]) {
  const ini = +horaLocalAUtc(fechaMadrid, '00:00', tzBase);
  const fin = +horaLocalAUtc(sumarDias(fechaMadrid, 1), '00:00', tzBase);
  return citas
    .filter((c) => c.cuenta !== false)
    .reduce((total, c) => total + Math.max(0, Math.min(c.fin, fin) - Math.max(c.inicio, ini)) / MIN, 0);
}

export type Hueco = { inicio: string; fin: string };

/**
 * Huecos libres de un día, según el horario de la agenda (Europa, o América en la hora de quien reserva).
 * `fecha` está en la zona de la agenda. Reglas: solo horas en punto, sin chocar con otras citas
 * (con descanso) ni con la pausa diaria, y sin pasar el máximo de horas de citas de ese día.
 */
export async function huecosDisponibles(
  servicio: Servicio, fecha: string, region: Region, zonaVisitante?: string | null, opciones: { fresco?: boolean } = {},
): Promise<Hueco[]> {
  const tz = zonaDeAgenda(region, zonaVisitante);
  if (!esFecha(fecha) || !fechaPermitida(fecha, tz)) return [];
  const rangos = regiones[region].horario[diaSemana(fecha)] ?? [];
  if (!rangos.length) return [];

  const duracion = servicio.duracionMin * MIN;
  const descanso = agenda.descansoMin * MIN;
  const minimo = Date.now() + (servicio.antelacionMinHoras ?? agenda.antelacionMinHoras) * 3600000;
  const citas = [...(await citasPagadas(opciones.fresco)), ...ocupadoManual()];
  const pausa = pausas(fecha); // sin descanso extra: una cita puede terminar a las 12:00 y empezar a las 14:00

  const huecos: Hueco[] = [];
  for (const [desde, hasta] of rangos) {
    const fin = +horaLocalAUtc(fecha, hasta, tz);
    for (let t = +horaLocalAUtc(fecha, desde, tz); t + duracion <= fin; t += agenda.intervaloMin * MIN) {
      if (t < minimo) continue;
      const choca =
        citas.some((o) => t < o.fin + descanso && t + duracion + descanso > o.inicio) ||
        pausa.some((o) => t < o.fin && t + duracion > o.inicio);
      if (choca) continue;
      // Máximo de horas de citas en ese día de Madrid.
      if (minutosDelDia(fechaEnZona(new Date(t), tzBase), citas) + servicio.duracionMin > agenda.maxMinutosPorDia) continue;
      huecos.push({ inicio: new Date(t).toISOString(), fin: new Date(t + duracion).toISOString() });
    }
  }
  return huecos;
}

/** Días del calendario que aún tienen algún hueco para esta lectura (los demás se muestran bloqueados). */
export async function diasDisponibles(servicio: Servicio, region: Region, zonaVisitante?: string | null): Promise<string[]> {
  const tz = zonaDeAgenda(region, zonaVisitante);
  const hoy = fechaEnZona(new Date(), tz);
  const fechas = Array.from({ length: agenda.diasMaxAdelante + 1 }, (_, i) => sumarDias(hoy, i));
  await citasPagadas(); // una sola consulta a Stripe para todos los días
  const libres = await Promise.all(fechas.map(async (f) => ((await huecosDisponibles(servicio, f, region, zonaVisitante)).length ? f : null)));
  return libres.filter((f): f is string => f !== null);
}
