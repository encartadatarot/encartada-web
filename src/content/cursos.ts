import type { Curso } from './tipos';

/**
 * Cursos, clases y grabaciones (datos de oferta/formacion.md del repositorio "encartada").
 * Con precios → se paga online desde /cursos/<slug>. Sin precios → solo se muestra el `aviso`.
 * Lo marcado [por confirmar] en el repositorio no se publica.
 */
export const cursos: Curso[] = [
  {
    slug: 'el-reves-de-saturno',
    titulo: 'Cursito de invierno: el revés de Saturno',
    tipo: 'curso',
    publicado: true,
    acento: 'morado',
    resumen: 'Tres domingos por Meet dedicados a Saturno.',
    descripcion: [],
    precios: { eur: 80, usd: 95, cop: 300000 },
    // La tercera sesión es el 17 o el 24 de enero [por confirmar]: no se publica la fecha.
    fechas: 'Domingos 6 y 20 de diciembre de 2026, y una tercera sesión en enero.',
    formato: 'Virtual por Google Meet · 16:00-18:00 España / 10:00-12:00 Colombia · con grabación de cada sesión.',
    temario: [{ sesiones: ['Saturno en el fin del mundo', 'Saturno, un viejo adversario', 'Saturno, acertijo y solución'] }],
  },
  {
    slug: 'la-brevisima-historia-del-tarot',
    titulo: 'La brevísima historia del tarot',
    tipo: 'grabacion',
    publicado: true,
    acento: 'dorado',
    resumen: 'Grabación de la clase virtual.',
    descripcion: [
      'Te propone diferentes maneras de acercarte a la historia de este oráculo, una _lineal_ y otra _oracular_.',
      'Las lecturas que te propongo para preparar la sesión tienen la intención de abrir reflexiones sobre la manera de pensar el tiempo de las narraciones.',
    ],
    precios: { eur: 20, usd: 25, cop: 65000 },
  },
  {
    slug: 'los-puntos-cardinales-del-tarot',
    titulo: 'Los puntos cardinales del tarot',
    tipo: 'curso',
    publicado: true,
    acento: 'rojo',
    resumen: 'Curso de arcanos menores y sus correspondencias.',
    descripcion: [
      'En estas 8 sesiones te acercarás a los arcanos menores del tarot en las cuatro etapas correspondientes a sus puntos cardinales: ==Oros, Bastos, Espadas y Copas==. Los interpretaremos a partir de sus correspondencias cotidianas, corporales, filosóficas, psicoanalíticas, alquímicas y astrológicas a partir de ejercicios de escritura.',
      'Es un curso teóricamente más denso que la iniciación y va a requerir _atención y estudio_.',
    ],
    // Precio [por confirmar]: 1.800.000 COP (Canva) frente al bloque de 300.000 COP de la web.
    precios: {},
    formato: '8 sesiones de 2,5 h, sábados por Google Meet · 16:00 España / 10:00 Colombia.',
    requisitos: ['Conocer los arcanos mayores.', 'Baraja Smith-Waite.', '4 ejercicios de escritura.'],
    temario: [
      { parte: 'Las bases filosóficas del tarot', sesiones: ['Reminiscencia', 'Lenguaje', 'Traducción', 'Correspondencias'] },
      { parte: 'El tarot como arte narrativo', sesiones: ['Fidere', 'Velle', 'Sciere', 'Tacere'] },
    ],
    aviso: 'El ciclo II está en curso. Las inscripciones para la próxima edición se abrirán aquí.',
  },

  // ─── Pendientes de confirmar (no se publican) ────────────────────────
  {
    slug: 'de-que-hablamos-cuando-hablamos-de-mistica',
    titulo: '¿De qué hablamos cuando hablamos de mística?',
    tipo: 'grabacion',
    publicado: false, // [por confirmar] si se vende la grabación de una clase que fue gratuita
    acento: 'morado',
    resumen: 'Clase introductoria al tarot.',
    descripcion: [],
    precios: { eur: 20, usd: 25, cop: 65000 },
  },
];

export const cursosPublicados = cursos.filter((c) => c.publicado);
export const getCurso = (slug: string) => cursosPublicados.find((c) => c.slug === slug);
