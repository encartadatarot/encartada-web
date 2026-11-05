import type { Servicio } from './tipos';

/**
 * Tus lecturas. Para añadir una nueva, copia un bloque, cambia los datos y pon `publicado: true`.
 * Las imágenes van en /public/img/lecturas/.
 */
export const servicios: Servicio[] = [
  // ─── Tarot individual ────────────────────────────────────────────────
  {
    slug: 'el-nudo',
    nombre: 'El nudo',
    categoria: 'tarot-individual',
    publicado: true,
    acento: 'rojo',
    imagen: '/img/lecturas/el-nudo.webp',
    cartas: 4,
    duracionMin: 45,
    modalidades: ['virtual', 'presencial'],
    precios: { eur: 50, usd: 60, cop: 165000 },
    descripcion: [
      'Te muestra el nudo del _corazón_ en el ==presente==, te dirige a los _hilos_ del ==pasado== para que lo _desenredes_ y puedas amar _libremente_ en el ==futuro==.',
    ],
  },
  {
    slug: 'la-encrucijada',
    nombre: 'La encrucijada',
    categoria: 'tarot-individual',
    publicado: true,
    acento: 'verde',
    imagen: '/img/lecturas/la-encrucijada.webp',
    cartas: 7,
    duracionMin: 75,
    modalidades: ['virtual', 'presencial'],
    precios: { eur: 60, usd: 70, cop: 190000 },
    descripcion: [
      'Te muestra los _caminos cruzados_ entre el ==_deber_== y el ==_deseo_==.',
      'Te ayuda a _recuperar_ la **fe** para _aceptar_ el **destino** y _reorientar_ tu **rumbo**.',
    ],
  },
  {
    slug: 'el-bien-morir',
    nombre: 'El bien morir',
    categoria: 'tarot-individual',
    publicado: true,
    acento: 'morado',
    imagen: '/img/lecturas/el-bien-morir.webp',
    cartas: 8,
    duracionMin: 90,
    modalidades: ['virtual', 'presencial'],
    precios: { eur: 70, usd: 80, cop: 220000 },
    descripcion: [
      'Te ayuda a transitar periodos de **_duelo y dar lugar a tu relación con lo muerto._**',
      'Te muestra el camino de la **pérdida**, a través de la **negociación**, para darle un nuevo lugar a lo que ya no está y abre espacio a lo que está por **nacer**.',
    ],
  },
  {
    slug: 'el-tropo',
    nombre: 'El tropo',
    categoria: 'tarot-individual',
    publicado: true,
    acento: 'dorado',
    imagen: '/img/lecturas/el-tropo.webp',
    cartas: 9,
    duracionMin: 105,
    modalidades: ['virtual', 'presencial'],
    precios: { eur: 80, usd: 90, cop: 250000 },
    descripcion: [
      'Te muestra ==_varias áreas separadas y desordenadas_ de tu vida== para que las **conectes** con ayuda de los ==_tránsitos astrológicos_== y con una nueva claridad vuelvas a sentirte dueña de tu **_tiempo_** y tu **_espacio_**.',
    ],
  },

  // ─── Pendientes de completar ─────────────────────────────────────────
  // Estas lecturas existen en tu web de Canva pero aún falta copiar su texto,
  // duración, precio e imagen (y confirmar la categoría). Pon `publicado: true` cuando estén.
  ...(
    [
      ['interpretacion-de-suenos', 'Interpretación de sueños', 'suenos', 'plata'],
      ['la-tertulia', 'La Tertulia', 'tarot-grupal', 'verde'],
      ['la-brujula', 'La Brújula', 'tarot-de-temporada', 'dorado'],
      ['cancion-natal', 'Canción Natal', 'astrologia', 'dorado'],
      ['el-ritmo-de-las-luminarias', 'El Ritmo de las Luminarias', 'astrologia', 'dorado'],
      ['la-consonancia', 'La Consonancia – Retorno Solar', 'astrologia', 'dorado'],
      ['la-disonancia', 'La Disonancia – Retorno de Saturno', 'astrologia', 'morado'],
    ] as const
  ).map(
    ([slug, nombre, categoria, acento]): Servicio => ({
      slug,
      nombre,
      categoria,
      acento,
      publicado: false,
      duracionMin: 60,
      modalidades: ['virtual', 'presencial'],
      precios: {},
      descripcion: [],
    }),
  ),
];

export const serviciosPublicados = servicios.filter((s) => s.publicado);
export const getServicio = (slug: string) => serviciosPublicados.find((s) => s.slug === slug);
export const serviciosDe = (categoria: string) => serviciosPublicados.filter((s) => s.categoria === categoria);
