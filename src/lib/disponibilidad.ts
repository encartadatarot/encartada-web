import 'server-only';
import { agenda, type Region, regiones } from '@/config/agenda';
import type { Servicio } from '@/content/tipos';
import { stripe } from './stripe';
import { diaSemana, esFecha, fechaEnZona, horaLocalAUtc, sumarDias } from './tiempo';

const tzBase = agenda.zonaHoraria;
type Intervalo = { inicio: number; fin: number };

/** ¿Se puede reservar ese día (en la hora local de la región)? */
export function fechaPermitida(fecha: string, region: Region) {
  const hoy = fechaEnZona(new Date(), regiones[region].zonaHoraria);
  return fecha >= hoy && fecha <= sumarDias(hoy, agenda.diasMaxAdelante);
}

/**
 * Citas ya pagadas alrededor de ese día. Usamos el propio Stripe como "base de datos" de reservas
 * (cada pago guarda en sus metadatos la fecha en hora de Madrid, el inicio y el fin).
 * Se miran también el día anterior y el siguiente porque Madrid y Colombia no comparten fecha a toda hora.
 */
async function reservasPagadas(fecha: string): Promise<Intervalo[]> {
  if (!stripe) return [];
  const fechas = [sumarDias(fecha, -1), fecha, sumarDias(fecha, 1)];
  const res = await stripe.paymentIntents.search({
    query: fechas.map((f) => `metadata['fecha']:'${f}'`).join(' OR '),
    limit: 100,
  });
  return res.data
    .filter((pi) => pi.status === 'succeeded' && pi.metadata.inicio && pi.metadata.fin)
    .map((pi) => ({ inicio: Date.parse(pi.metadata.inicio), fin: Date.parse(pi.metadata.fin) }));
}

/** Citas apuntadas a mano y días bloqueados (en hora de Madrid), como intervalos absolutos. */
function ocupadoManual(): Intervalo[] {
  const citas = agenda.ocupadoManual.map((o) => ({ inicio: +horaLocalAUtc(o.fecha, o.desde, tzBase), fin: +horaLocalAUtc(o.fecha, o.hasta, tzBase) }));
  const dias = agenda.diasBloqueados.map((f) => ({ inicio: +horaLocalAUtc(f, '00:00', tzBase), fin: +horaLocalAUtc(sumarDias(f, 1), '00:00', tzBase) }));
  return [...citas, ...dias];
}

export type Hueco = { inicio: string; fin: string };

/** Huecos libres de un día, según el horario de la región (Europa o Colombia). */
export async function huecosDisponibles(servicio: Servicio, fecha: string, region: Region): Promise<Hueco[]> {
  if (!esFecha(fecha) || !fechaPermitida(fecha, region)) return [];
  const { zonaHoraria: tz, horario } = regiones[region];
  const rangos = horario[diaSemana(fecha)] ?? [];
  if (!rangos.length) return [];

  const duracion = servicio.duracionMin * 60000;
  const descanso = agenda.descansoMin * 60000;
  const minimo = Date.now() + (servicio.antelacionMinHoras ?? agenda.antelacionMinHoras) * 3600000;
  const ocupado = [...(await reservasPagadas(fecha)), ...ocupadoManual()];

  const huecos: Hueco[] = [];
  for (const [desde, hasta] of rangos) {
    const fin = +horaLocalAUtc(fecha, hasta, tz);
    for (let t = +horaLocalAUtc(fecha, desde, tz); t + duracion <= fin; t += agenda.intervaloMin * 60000) {
      if (t < minimo) continue;
      const choca = ocupado.some((o) => t < o.fin + descanso && t + duracion + descanso > o.inicio);
      if (!choca) huecos.push({ inicio: new Date(t).toISOString(), fin: new Date(t + duracion).toISOString() });
    }
  }
  return huecos;
}
