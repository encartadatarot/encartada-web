/**
 * Collages de la web original de Canva, separados en sus tiras (capas transparentes).
 * Posiciones en % del collage. El balanceo de cada tira imita el de Canva: giro de unos
 * -4° a +7°, desplazamiento de ~2 % y ciclos de ~2 s, cada tira a su propio ritmo.
 * Generado a partir de encartada.my.canva.site.
 */
export type Capa = { src: string; x: number; y: number; w: number; h: number; giro: number; contragiro: number; dx: number; dy: number; duracion: number; retraso: number };
export type Collage = { ancho: number; alto: number; capas: Capa[] };

export const collages: Record<string, Collage> = {
  'el-nudo': { ancho: 805, alto: 1460, capas: [
    { src: '/img/collages/el-nudo/0.webp', x: 0.0, y: 0.0, w: 97.888, h: 53.082, giro: 6.54, contragiro: 3.59, dx: 1.48, dy: 1.66, duracion: 2.16, retraso: -0.67 },
    { src: '/img/collages/el-nudo/1.webp', x: 2.609, y: 41.37, w: 91.801, h: 47.397, giro: -5.98, contragiro: -3.93, dx: 2.24, dy: 1.67, duracion: 1.98, retraso: -2.16 },
    { src: '/img/collages/el-nudo/2.webp', x: 2.112, y: 59.863, w: 97.888, h: 40.137, giro: 5.95, contragiro: 2.66, dx: 1.29, dy: 2.02, duracion: 2.59, retraso: -2.05 },
  ] },
  'la-encrucijada': { ancho: 812, alto: 1330, capas: [
    { src: '/img/collages/la-encrucijada/0.webp', x: 3.941, y: 53.684, w: 96.059, h: 46.316, giro: 6.14, contragiro: 4.72, dx: 1.53, dy: 1.94, duracion: 2.21, retraso: -1.57 },
    { src: '/img/collages/la-encrucijada/1.webp', x: 0.0, y: 34.662, w: 95.936, h: 35.263, giro: -4.53, contragiro: -2.97, dx: 2.06, dy: 1.93, duracion: 1.91, retraso: -1.43 },
    { src: '/img/collages/la-encrucijada/2.webp', x: 2.463, y: 0.0, w: 95.197, h: 48.872, giro: 6.56, contragiro: 2.86, dx: 1.24, dy: 2.01, duracion: 2.32, retraso: -2.09 },
  ] },
  'el-bien-morir': { ancho: 884, alto: 1384, capas: [
    { src: '/img/collages/el-bien-morir/0.webp', x: 1.018, y: 0.0, w: 98.982, h: 71.026, giro: 6.46, contragiro: 2.71, dx: 2.38, dy: 1.51, duracion: 2.2, retraso: -1.85 },
    { src: '/img/collages/el-bien-morir/1.webp', x: 0.0, y: 39.017, w: 94.231, h: 60.983, giro: -5.21, contragiro: -3.73, dx: 1.6, dy: 1.16, duracion: 2.09, retraso: -1.21 },
    { src: '/img/collages/el-bien-morir/2.webp', x: 2.828, y: 40.39, w: 92.195, h: 35.477, giro: 5.26, contragiro: 3.02, dx: 1.58, dy: 1.55, duracion: 2.35, retraso: -2.03 },
  ] },
  'el-tropo': { ancho: 888, alto: 1388, capas: [
    { src: '/img/collages/el-tropo/0.webp', x: 0.0, y: 0.0, w: 100.0, h: 89.625, giro: 5.63, contragiro: 2.66, dx: 2.26, dy: 1.39, duracion: 2.58, retraso: -0.77 },
    { src: '/img/collages/el-tropo/1.webp', x: 8.108, y: 30.98, w: 86.599, h: 28.098, giro: -5.91, contragiro: -2.75, dx: 2.29, dy: 1.28, duracion: 2.3, retraso: -1.11 },
    { src: '/img/collages/el-tropo/2.webp', x: 6.757, y: 77.882, w: 87.613, h: 22.118, giro: 5.52, contragiro: 2.92, dx: 2.26, dy: 1.12, duracion: 2.43, retraso: -2.25 },
  ] },
  'oraculo-lunar': { ancho: 818, alto: 1530, capas: [
    { src: '/img/collages/oraculo-lunar/0.webp', x: 0.0, y: 65.621, w: 99.267, h: 34.379, giro: 4.88, contragiro: 4.38, dx: 1.75, dy: 1.52, duracion: 2.4, retraso: -1.4 },
    { src: '/img/collages/oraculo-lunar/1.webp', x: 0.0, y: 0.0, w: 99.267, h: 36.013, giro: -6.87, contragiro: -3.23, dx: 1.61, dy: 1.89, duracion: 1.92, retraso: -1.94 },
    { src: '/img/collages/oraculo-lunar/2.webp', x: 0.0, y: 27.451, w: 100.0, h: 41.634, giro: 4.52, contragiro: 4.07, dx: 1.92, dy: 1.14, duracion: 2.11, retraso: -1.82 },
  ] },
  'la-hipnosis': { ancho: 665, alto: 1075, capas: [
    { src: '/img/collages/la-hipnosis/0.webp', x: 3.759, y: 27.628, w: 91.579, h: 72.372, giro: 6.91, contragiro: 2.57, dx: 1.9, dy: 1.75, duracion: 2.12, retraso: -0.02 },
    { src: '/img/collages/la-hipnosis/1.webp', x: 0.0, y: 0.0, w: 100.0, h: 54.14, giro: -6.9, contragiro: -2.72, dx: 1.47, dy: 2.19, duracion: 2.51, retraso: -1.46 },
    { src: '/img/collages/la-hipnosis/2.webp', x: 4.812, y: 3.07, w: 91.429, h: 28.0, giro: 5.93, contragiro: 3.77, dx: 1.9, dy: 1.67, duracion: 1.92, retraso: -0.01 },
  ] },
  'el-despertar': { ancho: 642, alto: 1059, capas: [
    { src: '/img/collages/el-despertar/0.webp', x: 0.0, y: 61.851, w: 100.0, h: 38.149, giro: 6.22, contragiro: 4.41, dx: 2.07, dy: 1.6, duracion: 2.56, retraso: -2.39 },
    { src: '/img/collages/el-despertar/1.webp', x: 4.829, y: 0.0, w: 94.86, h: 43.154, giro: -6.25, contragiro: -4.43, dx: 2.31, dy: 1.77, duracion: 1.91, retraso: -0.55 },
    { src: '/img/collages/el-despertar/2.webp', x: 3.894, y: 33.428, w: 94.86, h: 31.822, giro: 4.79, contragiro: 3.21, dx: 1.97, dy: 1.51, duracion: 2.53, retraso: -0.86 },
  ] },
  'oraculo-solar': { ancho: 814, alto: 1536, capas: [
    { src: '/img/collages/oraculo-solar/0.webp', x: 0.0, y: 7.878, w: 100.0, h: 92.122, giro: 4.82, contragiro: 3.79, dx: 2.27, dy: 2.13, duracion: 2.35, retraso: -1.46 },
    { src: '/img/collages/oraculo-solar/1.webp', x: 0.0, y: 1.302, w: 100.0, h: 81.641, giro: -5.92, contragiro: -4.55, dx: 2.17, dy: 1.2, duracion: 2.5, retraso: -1.48 },
    { src: '/img/collages/oraculo-solar/2.webp', x: 0.369, y: 0.0, w: 99.386, h: 43.75, giro: 5.78, contragiro: 3.68, dx: 1.29, dy: 1.43, duracion: 2.13, retraso: -1.41 },
  ] },
  'tu-cancion-natal': { ancho: 783, alto: 1299, capas: [
    { src: '/img/collages/tu-cancion-natal/0.webp', x: 0.0, y: 0.0, w: 97.446, h: 80.523, giro: 5.03, contragiro: 4.13, dx: 1.91, dy: 1.25, duracion: 2.2, retraso: -1.04 },
    { src: '/img/collages/tu-cancion-natal/1.webp', x: 2.299, y: 26.02, w: 97.701, h: 73.98, giro: -6.18, contragiro: -2.92, dx: 1.55, dy: 1.9, duracion: 2.22, retraso: -0.53 },
    { src: '/img/collages/tu-cancion-natal/2.webp', x: 4.215, y: 57.429, w: 91.699, h: 42.571, giro: 6.43, contragiro: 4.59, dx: 2.22, dy: 1.28, duracion: 2.19, retraso: -0.98 },
  ] },
  'sesion-de-improvisacion': { ancho: 754, alto: 1288, capas: [
    { src: '/img/collages/sesion-de-improvisacion/0.webp', x: 0.0, y: 4.736, w: 100.0, h: 57.919, giro: 5.09, contragiro: 3.71, dx: 2.02, dy: 1.44, duracion: 2.22, retraso: -0.86 },
    { src: '/img/collages/sesion-de-improvisacion/1.webp', x: 2.653, y: 59.239, w: 92.042, h: 40.761, giro: -5.8, contragiro: -3.98, dx: 1.74, dy: 1.37, duracion: 2.58, retraso: -0.38 },
    { src: '/img/collages/sesion-de-improvisacion/2.webp', x: 2.785, y: 0.0, w: 92.042, h: 17.158, giro: 6.57, contragiro: 2.93, dx: 1.26, dy: 1.12, duracion: 1.95, retraso: -1.01 },
  ] },
  'la-danza-de-las-luminarias': { ancho: 775, alto: 1341, capas: [
    { src: '/img/collages/la-danza-de-las-luminarias/0.webp', x: 0.0, y: 5.966, w: 99.355, h: 82.998, giro: 5.67, contragiro: 2.23, dx: 1.67, dy: 1.88, duracion: 1.9, retraso: -1.48 },
    { src: '/img/collages/la-danza-de-las-luminarias/1.webp', x: 4.516, y: 0.0, w: 95.484, h: 40.194, giro: -5.21, contragiro: -4.23, dx: 1.4, dy: 1.29, duracion: 1.99, retraso: -0.4 },
    { src: '/img/collages/la-danza-de-las-luminarias/2.webp', x: 3.226, y: 63.908, w: 96.774, h: 36.092, giro: 6.94, contragiro: 4.44, dx: 2.13, dy: 2.19, duracion: 2.45, retraso: -0.85 },
  ] },
  'la-consonancia': { ancho: 766, alto: 1326, capas: [
    { src: '/img/collages/la-consonancia/0.webp', x: 0.0, y: 0.0, w: 100.0, h: 40.121, giro: 4.64, contragiro: 4.01, dx: 1.75, dy: 1.96, duracion: 2.18, retraso: -0.35 },
    { src: '/img/collages/la-consonancia/1.webp', x: 2.48, y: 37.406, w: 94.909, h: 44.57, giro: -4.57, contragiro: -4.23, dx: 1.39, dy: 1.46, duracion: 2.51, retraso: -0.07 },
    { src: '/img/collages/la-consonancia/2.webp', x: 2.219, y: 82.881, w: 95.3, h: 17.119, giro: 4.56, contragiro: 3.36, dx: 2.02, dy: 1.54, duracion: 2.2, retraso: -0.44 },
  ] },
  'la-disonancia': { ancho: 778, alto: 1271, capas: [
    { src: '/img/collages/la-disonancia/0.webp', x: 0.0, y: 25.02, w: 100.0, h: 74.98, giro: 5.41, contragiro: 2.48, dx: 2.34, dy: 1.2, duracion: 2.04, retraso: -1.45 },
    { src: '/img/collages/la-disonancia/1.webp', x: 1.671, y: 0.0, w: 90.231, h: 51.22, giro: -7.16, contragiro: -2.86, dx: 1.24, dy: 1.08, duracion: 2.36, retraso: -1.61 },
  ] },
  'la-mariposa': { ancho: 844, alto: 1388, capas: [
    { src: '/img/collages/la-mariposa/0.webp', x: 0.0, y: 0.0, w: 96.209, h: 46.686, giro: 6.87, contragiro: 4.29, dx: 1.31, dy: 1.08, duracion: 1.94, retraso: -1.99 },
    { src: '/img/collages/la-mariposa/1.webp', x: 2.488, y: 19.741, w: 93.72, h: 50.288, giro: -4.91, contragiro: -2.58, dx: 1.81, dy: 2.14, duracion: 2.39, retraso: -0.52 },
    { src: '/img/collages/la-mariposa/2.webp', x: 2.014, y: 45.245, w: 97.986, h: 54.755, giro: 6.33, contragiro: 3.2, dx: 1.78, dy: 1.78, duracion: 2.25, retraso: -1.06 },
  ] },
  'la-tertulia': { ancho: 824, alto: 1355, capas: [
    { src: '/img/collages/la-tertulia/0.webp', x: 2.063, y: 0.0, w: 95.631, h: 41.993, giro: 5.6, contragiro: 2.56, dx: 1.26, dy: 1.16, duracion: 2.45, retraso: -1.22 },
    { src: '/img/collages/la-tertulia/1.webp', x: 1.092, y: 47.823, w: 98.908, h: 52.177, giro: -6.84, contragiro: -3.06, dx: 1.43, dy: 1.22, duracion: 2.29, retraso: -0.64 },
    { src: '/img/collages/la-tertulia/2.webp', x: 0.0, y: 24.133, w: 99.029, h: 38.229, giro: 5.53, contragiro: 3.75, dx: 2.39, dy: 2.16, duracion: 2.52, retraso: -0.38 },
  ] },
  'la-brujula': { ancho: 900, alto: 1408, capas: [
    { src: '/img/collages/la-brujula/0.webp', x: 0.0, y: 15.417, w: 100.0, h: 84.583, giro: 4.89, contragiro: 4.27, dx: 1.22, dy: 1.35, duracion: 2.15, retraso: -1.43 },
    { src: '/img/collages/la-brujula/1.webp', x: 4.496, y: 0.0, w: 88.925, h: 38.052, giro: -5.34, contragiro: -2.97, dx: 2.05, dy: 1.24, duracion: 2.46, retraso: -0.32 },
    { src: '/img/collages/la-brujula/2.webp', x: 6.908, y: 7.148, w: 85.855, h: 40.154, giro: 5.53, contragiro: 4.04, dx: 2.34, dy: 2.17, duracion: 2.49, retraso: -2.34 },
  ] },
};

/** ¿Hay collage animado con ese nombre? */
export const tieneCollage = (nombre: string) => nombre in collages;
