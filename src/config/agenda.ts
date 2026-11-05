/**
 * Tu agenda. Edita estos valores para cambiar cuándo se puede reservar.
 * Todas las horas están en la zona horaria indicada (Madrid).
 */
export type Rango = [desde: string, hasta: string];

export const agenda = {
  zonaHoraria: 'Europe/Madrid',

  /** Horario por día de la semana (0 = domingo, 1 = lunes … 6 = sábado). [] = no se trabaja. */
  horario: {
    0: [],
    1: [['10:00', '14:00'], ['16:00', '20:00']],
    2: [['10:00', '14:00'], ['16:00', '20:00']],
    3: [['10:00', '14:00'], ['16:00', '20:00']],
    4: [['10:00', '14:00'], ['16:00', '20:00']],
    5: [['10:00', '14:00']],
    6: [],
  } as Record<number, Rango[]>,

  /** Cada cuántos minutos puede empezar una cita (10:00, 10:30, …). */
  intervaloMin: 30,
  /** Descanso mínimo entre una cita y la siguiente. */
  descansoMin: 15,
  /** Con cuánta antelación mínima se puede reservar. */
  antelacionMinHoras: 24,
  /** Hasta cuántos días en el futuro se muestra el calendario. */
  diasMaxAdelante: 45,

  /** Días completos sin citas (vacaciones, festivos). Formato AAAA-MM-DD. */
  diasBloqueados: [] as string[],

  /** Huecos ocupados por citas que no vienen de la web (p. ej. reservas por WhatsApp). */
  ocupadoManual: [] as { fecha: string; desde: string; hasta: string }[],
};
