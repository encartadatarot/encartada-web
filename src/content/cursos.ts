import type { Curso } from './tipos';

/**
 * Cursos, clases y grabaciones. Se venden con pago online (Stripe) desde /cursos/<slug>.
 * Completa los datos y pon `publicado: true` para que aparezcan.
 */
export const cursos: Curso[] = [
  {
    slug: 'los-cuatro-puntos-cardinales-del-tarot',
    titulo: 'Los Cuatro Puntos Cardinales del Tarot',
    tipo: 'curso',
    publicado: false, // TODO: añadir descripción, temario y precio
    acento: 'rojo',
    resumen: 'Curso de arcanos menores: fuego, agua, tierra y aire.',
    descripcion: [],
    precios: {},
    modulos: [{ titulo: 'Fuego — Bastos' }, { titulo: 'Agua — Copas' }, { titulo: 'Tierra — Oros' }, { titulo: 'Aire — Espadas' }],
  },
  {
    slug: 'introduccion-a-la-mistica',
    titulo: 'Introducción a la mística',
    tipo: 'grabacion',
    publicado: false, // TODO: añadir descripción y precio
    acento: 'morado',
    resumen: 'Clase grabada.',
    descripcion: [],
    precios: {},
  },
  {
    slug: 'historia-del-tarot',
    titulo: 'Historia del tarot',
    tipo: 'grabacion',
    publicado: false, // TODO: añadir descripción y precio
    acento: 'dorado',
    resumen: 'Clase grabada.',
    descripcion: [],
    precios: {},
  },
];

export const cursosPublicados = cursos.filter((c) => c.publicado);
export const getCurso = (slug: string) => cursosPublicados.find((c) => c.slug === slug);
