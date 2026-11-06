/** Tamaño real de cada imagen (para que se vean sin saltos al cargar). Se genera al añadir imágenes. */
export const tamanos: Record<string, [number, number]> = {
  '/img/cursos/el-reves-de-saturno.webp': [1080, 1350],
  '/img/cursos/saturno-sesion-1.webp': [433, 914],
  '/img/cursos/saturno-sesion-2.webp': [428, 884],
  '/img/cursos/saturno-sesion-3.webp': [433, 934],
  '/img/cursos/la-brevisima-historia-del-tarot.webp': [940, 1192],
  '/img/cursos/de-que-hablamos-cuando-hablamos-de-mistica.webp': [920, 1122],
  '/img/inicio/aprende-v2.webp': [389, 1161],
  '/img/inicio/lema-v2.webp': [835, 1548],
  '/img/inicio/mosaico.webp': [1800, 1009],
  '/img/inicio/oraculo-v2.webp': [379, 1164],
  '/img/lecturas/el-bien-morir.webp': [884, 1384],
  '/img/lecturas/el-despertar.webp': [642, 1059],
  '/img/lecturas/el-nudo.webp': [805, 1460],
  '/img/lecturas/el-tropo.webp': [888, 1388],
  '/img/lecturas/la-brujula.webp': [900, 1408],
  '/img/lecturas/la-consonancia.webp': [766, 1326],
  '/img/lecturas/la-danza-de-las-luminarias.webp': [775, 1341],
  '/img/lecturas/la-disonancia.webp': [778, 1271],
  '/img/lecturas/la-encrucijada.webp': [812, 1330],
  '/img/lecturas/la-hipnosis.webp': [665, 1075],
  '/img/lecturas/la-mariposa.webp': [844, 1388],
  '/img/lecturas/la-tertulia.webp': [824, 1355],
  '/img/lecturas/sesion-de-improvisacion.webp': [754, 1288],
  '/img/lecturas/tu-cancion-natal.webp': [783, 1299],
  '/img/oraculos/hub-lunar.webp': [498, 831],
  '/img/oraculos/hub-solar.webp': [496, 843],
  '/img/oraculos/hub-terrestre.webp': [516, 856],
  '/img/oraculos/oraculo-lunar.webp': [818, 1530],
  '/img/oraculos/oraculo-solar.webp': [814, 1536],
  '/img/oraculos/oraculo-terrestre.webp': [785, 1505],
  '/img/oraculos/tarot-de-temporada.webp': [582, 912],
  '/img/oraculos/tarot-grupal.webp': [586, 920],
  '/img/oraculos/tarot-individual.webp': [583, 922],
};

export function imagen(src: string) {
  const [width, height] = tamanos[src] ?? [800, 1300];
  return { src, width, height };
}
