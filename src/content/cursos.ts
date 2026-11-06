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
    acento: 'rojo',
    imagen: '/img/cursos/el-reves-de-saturno.webp',
    resumen: 'Saturno en el tarot, en tres sesiones por Meet.',
    // Introducción armada con frases de Camila (paneles promocionales) y los títulos de sus sesiones.
    descripcion: [
      'Tres domingos para encontrarnos con Saturno: en el _fin del mundo_, como _viejo adversario_ y como _acertijo_ y _solución_.',
      'Los procesos saturninos nos revelan que la experiencia no tiene partes sino ==_reveses_==.',
    ],
    precios: { eur: 80, usd: 95, cop: 300000 },
    // La tercera sesión: el flyer dice 17 de enero (año escrito "2026"); otra fuente dice 24 [por confirmar].
    fechas: 'Domingos 6 y 20 de diciembre de 2026, y una tercera sesión en enero.',
    formato: 'Virtual por Google Meet · 16:00-18:00 España / 10:00-12:00 Colombia.',
    // Textos de los paneles promocionales (palabras de Camila).
    sesiones: [
      {
        titulo: 'Saturno en el _fin del mundo_',
        imagen: '/img/cursos/saturno-sesion-1.webp',
        texto: [
          'Puede parecerte extraño que la correspondencia del _Gran maléfico_ en el tarot sea la carta de _El mundo_; la laureada, la que celebra los finales satisfactorios ascendida en la libertad de un baile. Pero los procesos saturninos nos revelan que la experiencia no tiene partes sino _reveses_: es en el límite de la vida que la contradicción de un mundo queda saldada en un círculo de gozo sin fin.',
          'En las labores devocionales del amor la distancia entre el _sufrimiento_ y el _placer_ queda sacrificada.',
        ],
      },
      {
        titulo: 'Saturno, un _viejo adversario_',
        imagen: '/img/cursos/saturno-sesion-2.webp',
        texto: [
          'Ha tenido _mil y un_ nombres a lo largo de la historia.',
          'Como el tarot mismo, _Él_ es multifacético, polimorfo, engañoso. Infame. Se esconde detrás de las apariencias de las cosas para incitarte a poseerlas. Te hace caer en las trampas de tu _vanidad_ para que veas quién eres sin _distorsiones_.',
          'Te atrapa para preguntarte y obligarte a responder: ¿lo que creías _querer_ era realmente lo que _deseabas_?',
        ],
      },
      {
        titulo: 'Saturno, _acertijo_ y solución',
        imagen: '/img/cursos/saturno-sesion-3.webp',
        texto: [
          '_Tu estrella_ orientadora siempre está, pero no siempre es visible. Como la esperanza, necesitas la estrella, solo aparece cuando se oscurece y te has perdido. La estrella del _destino_ no se ve con los ojos exteriores, sino con los interiores que son sinestésicos: oyen un llamado de _libertad_ que anuncia que es tiempo de moverte.',
          'Sales a buscar tu estrella pero ella no es pasiva; ella desea, se mueve y te encuentra en lugares inesperados. Se presenta disfrazada de situaciones y personas que te hacen sentir que estás donde _debes_ estar.',
        ],
      },
    ],
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
