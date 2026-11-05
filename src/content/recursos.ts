import type { Recurso } from './tipos';

/** Recursos gratuitos o enlaces (PDFs, artículos, listas de reproducción…). */
export const recursos: Recurso[] = [
  // Ejemplo:
  // { slug: 'tirada-luna-nueva', titulo: 'Tirada de luna nueva', publicado: true, tipo: 'descarga',
  //   resumen: 'PDF imprimible.', url: '/recursos/tirada-luna-nueva.pdf' },
];

export const recursosPublicados = recursos.filter((r) => r.publicado);
