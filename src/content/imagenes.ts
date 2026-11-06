/** Tamaño real de cada imagen (para que se vean sin saltos al cargar). Se genera al añadir imágenes. */
export const tamanos: Record<string, [number, number]> = {
  '/img/cursos/la-brevisima-historia-del-tarot.webp': [940, 1192],
  '/img/cursos/de-que-hablamos-cuando-hablamos-de-mistica.webp': [920, 1122],
  '/img/inicio/aprende.webp': [400, 1180],
  '/img/inicio/lema.webp': [844, 1434],
  '/img/inicio/mosaico.webp': [1800, 1009],
  '/img/inicio/oraculo.webp': [396, 1064],
  '/img/inicio/xxi.webp': [432, 1536],
  '/img/lecturas/el-bien-morir.webp': [881, 1397],
  '/img/lecturas/el-despertar.webp': [639, 1063],
  '/img/lecturas/el-nudo.webp': [790, 1448],
  '/img/lecturas/el-tropo.webp': [845, 1390],
  '/img/lecturas/la-brujula.webp': [824, 1385],
  '/img/lecturas/la-consonancia.webp': [766, 1306],
  '/img/lecturas/la-danza-de-las-luminarias.webp': [641, 1095],
  '/img/lecturas/la-disonancia.webp': [768, 1254],
  '/img/lecturas/la-encrucijada.webp': [818, 1375],
  '/img/lecturas/la-hipnosis.webp': [634, 1054],
  '/img/lecturas/la-mariposa.webp': [826, 1400],
  '/img/lecturas/la-tertulia.webp': [823, 1353],
  '/img/lecturas/sesion-de-improvisacion.webp': [753, 1228],
  '/img/lecturas/tu-cancion-natal.webp': [785, 1308],
  '/img/oraculos/hub-lunar.webp': [503, 838],
  '/img/oraculos/hub-solar.webp': [503, 849],
  '/img/oraculos/hub-terrestre.webp': [518, 856],
  '/img/oraculos/oraculo-lunar.webp': [818, 1536],
  '/img/oraculos/oraculo-solar.webp': [817, 1542],
  '/img/oraculos/oraculo-terrestre.webp': [808, 1518],
  '/img/oraculos/tarot-de-temporada.webp': [590, 920],
  '/img/oraculos/tarot-grupal.webp': [587, 920],
  '/img/oraculos/tarot-individual.webp': [584, 883],
};

export function imagen(src: string) {
  const [width, height] = tamanos[src] ?? [800, 1300];
  return { src, width, height };
}
