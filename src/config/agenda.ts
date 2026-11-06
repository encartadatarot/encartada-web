/**
 * Tu agenda. Edita estos valores para cambiar cuándo se puede reservar.
 *
 * Hay dos agendas:
 * - Europa: mañana y tarde, en hora de Madrid.
 * - América: las mañanas de cada persona, en SU hora local (Bogotá, México, Buenos Aires…).
 *   Si quien elige esta agenda no está en América, se usa la hora de Colombia.
 *
 * El calendario muestra a cada persona la agenda de su zona horaria y puede cambiarla con
 * el selector. Como las dos agendas son tuyas, una cita reservada en una bloquea ese mismo
 * momento en la otra.
 */
export type Rango = [desde: string, hasta: string];
export type Horario = Record<number, Rango[]>; // 0 = domingo, 1 = lunes … 6 = sábado. [] = no se trabaja.

const lunesAViernes = (rangos: Rango[]): Horario => ({ 0: [], 1: rangos, 2: rangos, 3: rangos, 4: rangos, 5: rangos, 6: [] });

export const regiones = {
  europa: {
    nombre: 'Europa',
    franja: 'mañana y tarde',
    zonaHoraria: 'Europe/Madrid',
    /** Si es true, el horario se aplica en la hora local de quien reserva. */
    horaDeQuienReserva: false,
    horario: lunesAViernes([['09:00', '19:00']]),
  },
  america: {
    nombre: 'América',
    franja: 'mañanas',
    zonaHoraria: 'America/Bogota', // por defecto, si quien reserva no está en América
    horaDeQuienReserva: true,
    horario: lunesAViernes([['08:00', '12:00']]),
  },
} satisfies Record<string, { nombre: string; franja: string; zonaHoraria: string; horaDeQuienReserva: boolean; horario: Horario }>;

export type Region = keyof typeof regiones;
export const esRegion = (s: unknown): s is Region => s === 'europa' || s === 'america';

/** ¿Es una zona horaria válida del continente americano (p. ej. "America/Bogota")? */
export function esZonaAmericana(z: unknown): z is string {
  if (typeof z !== 'string' || !/^America\/[A-Za-z_\/-]{2,60}$/.test(z)) return false;
  try { new Intl.DateTimeFormat('en-US', { timeZone: z }); return true; } catch { return false; }
}

/** Qué agenda mostrar según la zona horaria de quien reserva. */
export function regionPorZona(zona: string): Region {
  return zona.startsWith('America/') ? 'america' : 'europa';
}

/** Zona horaria en la que se calcula la agenda: la de Madrid, o la de quien reserva si está en América. */
export function zonaDeAgenda(region: Region, zonaVisitante?: string | null): string {
  const r = regiones[region];
  return r.horaDeQuienReserva && esZonaAmericana(zonaVisitante) ? zonaVisitante : r.zonaHoraria;
}

/** «hora de Madrid», «hora de Colombia» o «hora de Buenos Aires». */
export function nombreZona(zona: string): string {
  if (zona === 'Europe/Madrid') return 'hora de Madrid';
  if (zona === 'America/Bogota') return 'hora de Colombia';
  return `hora de ${zona.split('/').pop()!.replace(/_/g, ' ')}`;
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
