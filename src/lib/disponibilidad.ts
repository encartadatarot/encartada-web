import 'server-only';
import { agenda } from '@/config/agenda';
import type { Servicio } from '@/content/tipos';
import { stripe } from './stripe';
import { diaSemana, esFecha, fechaEnZona, horaLocalAUtc, sumarDias } from './tiempo';

const tz = agenda.zonaHoraria;
type Intervalo = { inicio: number; fin: number };

export function fechaPermitida(fecha: string) {
  const hoy = fechaEnZona(new Date(), tz);
  return fecha >= hoy && fecha <= sumarDias(hoy, agenda.diasMaxAdelante) && !agenda.diasBloqueados.includes(fecha);
}

/**
 * Citas ya pagadas ese día. Usamos el propio Stripe como "base de datos" de reservas
 * (cada pago guarda la fecha y hora en sus metadatos), así no hace falta otra base de datos.
 */
async function reservasPagadas(fecha: string): Promise<Intervalo[]> {
  if (!stripe) return [];
  const res = await stripe.paymentIntents.search({
    query: `metadata['fecha']:'${fecha}' AND status:'succeeded'`,
    limit: 100,
  });
  return res.data
    .filter((pi) => pi.metadata.inicio && pi.metadata.fin)
    .map((pi) => ({ inicio: Date.parse(pi.metadata.inicio), fin: Date.parse(pi.metadata.fin) }));
}

function ocupadoManual(fecha: string): Intervalo[] {
  return agenda.ocupadoManual
    .filter((o) => o.fecha === fecha)
    .map((o) => ({ inicio: +horaLocalAUtc(fecha, o.desde, tz), fin: +horaLocalAUtc(fecha, o.hasta, tz) }));
}

export type Hueco = { inicio: string; fin: string };

export async function huecosDisponibles(servicio: Servicio, fecha: string): Promise<Hueco[]> {
  if (!esFecha(fecha) || !fechaPermitida(fecha)) return [];
  const rangos = agenda.horario[diaSemana(fecha)] ?? [];
  if (!rangos.length) return [];

  const duracion = servicio.duracionMin * 60000;
  const descanso = agenda.descansoMin * 60000;
  const minimo = Date.now() + (servicio.antelacionMinHoras ?? agenda.antelacionMinHoras) * 3600000;
  const ocupado = [...(await reservasPagadas(fecha)), ...ocupadoManual(fecha)];

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
