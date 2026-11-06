/**
 * Tu agenda. Edita estos valores para cambiar cuándo se puede reservar.
 *
 * Hay una agenda por región, cada una en su propia hora local. El calendario muestra
 * a cada persona la agenda de su zona horaria (América → Colombia; el resto → Europa),
 * y puede cambiarla con el selector. Como las dos agendas son tuyas, una cita reservada
 * en una bloquea ese mismo momento en la otra.
 */
export type Rango = [desde: string, hasta: string];
export type Horario = Record<number, Rango[]>; // 0 = domingo, 1 = lunes … 6 = sábado. [] = no se trabaja.

const lunesAViernes = (rangos: Rango[]): Horario => ({ 0: [], 1: rangos, 2: rangos, 3: rangos, 4: rangos, 5: rangos, 6: [] });

export const regiones = {
  europa: {
    nombre: 'Europa',
    etiqueta: 'hora de Madrid',
    zonaHoraria: 'Europe/Madrid',
    horario: lunesAViernes([['09:00', '19:00']]),
  },
  colombia: {
    nombre: 'Colombia',
    etiqueta: 'hora de Colombia',
    zonaHoraria: 'America/Bogota',
    horario: lunesAViernes([['08:00', '12:00']]),
  },
} satisfies Record<string, { nombre: string; etiqueta: string; zonaHoraria: string; horario: Horario }>;

export type Region = keyof typeof regiones;
export const esRegion = (s: unknown): s is Region => s === 'europa' || s === 'colombia';

/** Qué agenda mostrar según la zona horaria de quien reserva. */
export function regionPorZona(zona: string): Region {
  return zona.startsWith('America/') ? 'colombia' : 'europa';
}

export const agenda = {
  /** Zona de referencia para tus avisos y para `diasBloqueados` / `ocupadoManual`. */
  zonaHoraria: 'Europe/Madrid',

  /** Cada cuántos minutos puede empezar una cita (9:00, 9:30, …). */
  intervaloMin: 30,
  /** Descanso mínimo entre una cita y la siguiente. */
  descansoMin: 15,
  /** Con cuánta antelación mínima se puede reservar. */
  antelacionMinHoras: 24,
  /** Hasta cuántos días en el futuro se muestra el calendario. */
  diasMaxAdelante: 45,

  /** Días completos sin citas (vacaciones, festivos), en hora de Madrid. Formato AAAA-MM-DD. */
  diasBloqueados: [] as string[],

  /** Huecos ocupados por citas que no vienen de la web, en hora de Madrid. */
  ocupadoManual: [] as { fecha: string; desde: string; hasta: string }[],
};
