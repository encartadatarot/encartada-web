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
    imagen: '/img/cursos/la-brevisima-historia-del-tarot.webp',
    resumen: 'Grabación de la clase virtual.',
    // Texto de la web original (página "grabaciones").
    descripcion: [
      'Como todo oráculo, el tarot tiene dos historias: la _lineal_ y la _circular_. La Historia y el Mito. La finita y la eterna.',
      'El tarot, como la literatura y la poesía, es una práctica anacrónica, pero conocer la historia de sus imágenes y sus significados ubican al intérprete y nutren significativamente el marco de interpretación.',
      'En esta clase te cuento ambas caras de la historia del tarot en sus propios términos: con ==imágenes y poesías==.',
    ],
    precios: { eur: 20, usd: 25, cop: 65000 },
  },
  {
    slug: 'de-que-hablamos-cuando-hablamos-de-mistica',
    titulo: '¿De qué hablamos cuando hablamos de mística?',
    tipo: 'grabacion',
    publicado: true, // Confirmado por Camila: la grabación está a la venta.
    acento: 'verde',
    imagen: '/img/cursos/de-que-hablamos-cuando-hablamos-de-mistica.webp',
    resumen: 'Grabación de la clase introductoria al tarot.',
    // Texto de la web original (página "grabaciones").
    descripcion: [
      '_A pesar de haber estudiado artes visuales, no soy hacedora de imágenes._',
      'O por lo menos, no a través de medios visuales.',
      'No siento que yo haga las imágenes, sino que surgen en mí con fuerza. Paso gran parte de mi vida viéndolas, soñándolas, imaginándolas y recreándolas con palabras. Más a menudo oralmente que en la escritura. Intento darles una vía de escape. Han encontrado, hasta ahora, su medida en mis palabras.',
      'La vida es la distancia que surge en el nacimiento entre los dos mundos. Una distancia que se llena de imagen y palabra: un significado para compartir.',
      'Eso son ellas para mí, un medio para ver _lo otro_ que hay dentro y fuera de mí.',
      '==Las imágenes me liberan de mí misma.==',
      '_Me hechizan_, como dice María Zambrano, las imágenes perdidas y que hay que alcanzar —y recrear— con las palabras: los recuerdos, los sueños, las imaginaciones.',
    ],
    precios: { eur: 20, usd: 25, cop: 65000 },
  },

  // ─── No publicados ───────────────────────────────────────────────────
  {
    slug: 'los-puntos-cardinales-del-tarot',
    titulo: 'Los puntos cardinales del tarot',
    tipo: 'curso',
    publicado: false, // Inscripciones cerradas (ciclo II en curso). Volver a publicar en la próxima edición.
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
  },
];

export const cursosPublicados = cursos.filter((c) => c.publicado);
export const getCurso = (slug: string) => cursosPublicados.find((c) => c.slug === slug);
