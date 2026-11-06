/**
 * Collages de la web original de Canva, separados en sus tiras (capas transparentes).
 * Posiciones en % del collage. Cada tira flota a su propio ritmo, como en Canva pero más sutil:
 * en la web se aplican ×1,5 de giro y ciclos un 25 % más rápidos (ver .collage-capa en globals.css).
 * Generado a partir de encartada.my.canva.site.
 */
export type Capa = { src: string; x: number; y: number; w: number; h: number; giro: number; contragiro: number; dx: number; dy: number; duracion: number; retraso: number };
export type Collage = { ancho: number; alto: number; capas: Capa[] };

export const collages: Record<string, Collage> = {
  'el-nudo': { ancho: 805, alto: 1460, capas: [
    { src: '/img/collages/el-nudo/0.webp', x: 0.0, y: 0.0, w: 97.888, h: 53.082, giro: 2.09, contragiro: 1.15, dx: 0.59, dy: 0.66, duracion: 4.75, retraso: -1.47 },
    { src: '/img/collages/el-nudo/1.webp', x: 2.609, y: 41.37, w: 91.801, h: 47.397, giro: -1.91, contragiro: -1.26, dx: 0.9, dy: 0.67, duracion: 4.36, retraso: -4.75 },
    { src: '/img/collages/el-nudo/2.webp', x: 2.112, y: 59.863, w: 97.888, h: 40.137, giro: 1.9, contragiro: 0.85, dx: 0.52, dy: 0.81, duracion: 5.7, retraso: -4.51 },
  ] },
  'la-encrucijada': { ancho: 812, alto: 1330, capas: [
    { src: '/img/collages/la-encrucijada/0.webp', x: 3.941, y: 53.684, w: 96.059, h: 46.316, giro: 1.96, contragiro: 1.51, dx: 0.61, dy: 0.78, duracion: 4.86, retraso: -3.45 },
    { src: '/img/collages/la-encrucijada/1.webp', x: 0.0, y: 34.662, w: 95.936, h: 35.263, giro: -1.45, contragiro: -0.95, dx: 0.82, dy: 0.77, duracion: 4.2, retraso: -3.15 },
    { src: '/img/collages/la-encrucijada/2.webp', x: 2.463, y: 0.0, w: 95.197, h: 48.872, giro: 2.1, contragiro: 0.92, dx: 0.5, dy: 0.8, duracion: 5.1, retraso: -4.6 },
  ] },
  'el-bien-morir': { ancho: 884, alto: 1384, capas: [
    { src: '/img/collages/el-bien-morir/0.webp', x: 1.018, y: 0.0, w: 98.982, h: 71.026, giro: 2.07, contragiro: 0.87, dx: 0.95, dy: 0.6, duracion: 4.84, retraso: -4.07 },
    { src: '/img/collages/el-bien-morir/1.webp', x: 0.0, y: 39.017, w: 94.231, h: 60.983, giro: -1.67, contragiro: -1.19, dx: 0.64, dy: 0.46, duracion: 4.6, retraso: -2.66 },
    { src: '/img/collages/el-bien-morir/2.webp', x: 2.828, y: 40.39, w: 92.195, h: 35.477, giro: 1.68, contragiro: 0.97, dx: 0.63, dy: 0.62, duracion: 5.17, retraso: -4.47 },
  ] },
  'el-tropo': { ancho: 888, alto: 1388, capas: [
    { src: '/img/collages/el-tropo/0.webp', x: 0.0, y: 0.0, w: 100.0, h: 89.625, giro: 1.8, contragiro: 0.85, dx: 0.9, dy: 0.56, duracion: 5.68, retraso: -1.69 },
    { src: '/img/collages/el-tropo/1.webp', x: 8.108, y: 30.98, w: 86.599, h: 28.098, giro: -1.89, contragiro: -0.88, dx: 0.92, dy: 0.51, duracion: 5.06, retraso: -2.44 },
    { src: '/img/collages/el-tropo/2.webp', x: 6.757, y: 77.882, w: 87.613, h: 22.118, giro: 1.77, contragiro: 0.93, dx: 0.9, dy: 0.45, duracion: 5.35, retraso: -4.95 },
  ] },
  'oraculo-lunar': { ancho: 818, alto: 1530, capas: [
    { src: '/img/collages/oraculo-lunar/0.webp', x: 0.0, y: 65.621, w: 99.267, h: 34.379, giro: 1.56, contragiro: 1.4, dx: 0.7, dy: 0.61, duracion: 5.28, retraso: -3.08 },
    { src: '/img/collages/oraculo-lunar/1.webp', x: 0.0, y: 0.0, w: 99.267, h: 36.013, giro: -2.2, contragiro: -1.03, dx: 0.64, dy: 0.76, duracion: 4.22, retraso: -4.27 },
    { src: '/img/collages/oraculo-lunar/2.webp', x: 0.0, y: 27.451, w: 100.0, h: 41.634, giro: 1.45, contragiro: 1.3, dx: 0.77, dy: 0.46, duracion: 4.64, retraso: -4.0 },
  ] },
  'la-hipnosis': { ancho: 665, alto: 1075, capas: [
    { src: '/img/collages/la-hipnosis/0.webp', x: 3.759, y: 27.628, w: 91.579, h: 72.372, giro: 2.21, contragiro: 0.82, dx: 0.76, dy: 0.7, duracion: 4.66, retraso: -0.04 },
    { src: '/img/collages/la-hipnosis/1.webp', x: 0.0, y: 0.0, w: 100.0, h: 54.14, giro: -2.21, contragiro: -0.87, dx: 0.59, dy: 0.88, duracion: 5.52, retraso: -3.21 },
    { src: '/img/collages/la-hipnosis/2.webp', x: 4.812, y: 3.07, w: 91.429, h: 28.0, giro: 1.9, contragiro: 1.21, dx: 0.76, dy: 0.67, duracion: 4.22, retraso: -0.02 },
  ] },
  'el-despertar': { ancho: 642, alto: 1059, capas: [
    { src: '/img/collages/el-despertar/0.webp', x: 0.0, y: 61.851, w: 100.0, h: 38.149, giro: 1.99, contragiro: 1.41, dx: 0.83, dy: 0.64, duracion: 5.63, retraso: -5.26 },
    { src: '/img/collages/el-despertar/1.webp', x: 4.829, y: 0.0, w: 94.86, h: 43.154, giro: -2.0, contragiro: -1.42, dx: 0.92, dy: 0.71, duracion: 4.2, retraso: -1.21 },
    { src: '/img/collages/el-despertar/2.webp', x: 3.894, y: 33.428, w: 94.86, h: 31.822, giro: 1.53, contragiro: 1.03, dx: 0.79, dy: 0.6, duracion: 5.57, retraso: -1.89 },
  ] },
  'oraculo-solar': { ancho: 814, alto: 1536, capas: [
    { src: '/img/collages/oraculo-solar/0.webp', x: 0.0, y: 7.878, w: 100.0, h: 92.122, giro: 1.54, contragiro: 1.21, dx: 0.91, dy: 0.85, duracion: 5.17, retraso: -3.21 },
    { src: '/img/collages/oraculo-solar/1.webp', x: 0.0, y: 1.302, w: 100.0, h: 81.641, giro: -1.89, contragiro: -1.46, dx: 0.87, dy: 0.48, duracion: 5.5, retraso: -3.26 },
    { src: '/img/collages/oraculo-solar/2.webp', x: 0.369, y: 0.0, w: 99.386, h: 43.75, giro: 1.85, contragiro: 1.18, dx: 0.52, dy: 0.57, duracion: 4.69, retraso: -3.1 },
  ] },
  'tu-cancion-natal': { ancho: 783, alto: 1299, capas: [
    { src: '/img/collages/tu-cancion-natal/0.webp', x: 0.0, y: 0.0, w: 97.446, h: 80.523, giro: 1.61, contragiro: 1.32, dx: 0.76, dy: 0.5, duracion: 4.84, retraso: -2.29 },
    { src: '/img/collages/tu-cancion-natal/1.webp', x: 2.299, y: 26.02, w: 97.701, h: 73.98, giro: -1.98, contragiro: -0.93, dx: 0.62, dy: 0.76, duracion: 4.88, retraso: -1.17 },
    { src: '/img/collages/tu-cancion-natal/2.webp', x: 4.215, y: 57.429, w: 91.699, h: 42.571, giro: 2.06, contragiro: 1.47, dx: 0.89, dy: 0.51, duracion: 4.82, retraso: -2.16 },
  ] },
  'sesion-de-improvisacion': { ancho: 754, alto: 1288, capas: [
    { src: '/img/collages/sesion-de-improvisacion/0.webp', x: 0.0, y: 4.736, w: 100.0, h: 57.919, giro: 1.63, contragiro: 1.19, dx: 0.81, dy: 0.58, duracion: 4.88, retraso: -1.89 },
    { src: '/img/collages/sesion-de-improvisacion/1.webp', x: 2.653, y: 59.239, w: 92.042, h: 40.761, giro: -1.86, contragiro: -1.27, dx: 0.7, dy: 0.55, duracion: 5.68, retraso: -0.84 },
    { src: '/img/collages/sesion-de-improvisacion/2.webp', x: 2.785, y: 0.0, w: 92.042, h: 17.158, giro: 2.1, contragiro: 0.94, dx: 0.5, dy: 0.45, duracion: 4.29, retraso: -2.22 },
  ] },
  'la-danza-de-las-luminarias': { ancho: 775, alto: 1341, capas: [
    { src: '/img/collages/la-danza-de-las-luminarias/0.webp', x: 0.0, y: 5.966, w: 99.355, h: 82.998, giro: 1.81, contragiro: 0.71, dx: 0.67, dy: 0.75, duracion: 4.18, retraso: -3.26 },
    { src: '/img/collages/la-danza-de-las-luminarias/1.webp', x: 4.516, y: 0.0, w: 95.484, h: 40.194, giro: -1.67, contragiro: -1.35, dx: 0.56, dy: 0.52, duracion: 4.38, retraso: -0.88 },
    { src: '/img/collages/la-danza-de-las-luminarias/2.webp', x: 3.226, y: 63.908, w: 96.774, h: 36.092, giro: 2.22, contragiro: 1.42, dx: 0.85, dy: 0.88, duracion: 5.39, retraso: -1.87 },
  ] },
  'la-consonancia': { ancho: 766, alto: 1326, capas: [
    { src: '/img/collages/la-consonancia/0.webp', x: 0.0, y: 0.0, w: 100.0, h: 40.121, giro: 1.48, contragiro: 1.28, dx: 0.7, dy: 0.78, duracion: 4.8, retraso: -0.77 },
    { src: '/img/collages/la-consonancia/1.webp', x: 2.48, y: 37.406, w: 94.909, h: 44.57, giro: -1.46, contragiro: -1.35, dx: 0.56, dy: 0.58, duracion: 5.52, retraso: -0.15 },
    { src: '/img/collages/la-consonancia/2.webp', x: 2.219, y: 82.881, w: 95.3, h: 17.119, giro: 1.46, contragiro: 1.08, dx: 0.81, dy: 0.62, duracion: 4.84, retraso: -0.97 },
  ] },
  'la-disonancia': { ancho: 778, alto: 1271, capas: [
    { src: '/img/collages/la-disonancia/0.webp', x: 0.0, y: 25.02, w: 100.0, h: 74.98, giro: 1.73, contragiro: 0.79, dx: 0.94, dy: 0.48, duracion: 4.49, retraso: -3.19 },
    { src: '/img/collages/la-disonancia/1.webp', x: 1.671, y: 0.0, w: 90.231, h: 51.22, giro: -2.29, contragiro: -0.92, dx: 0.5, dy: 0.43, duracion: 5.19, retraso: -3.54 },
  ] },
  'la-mariposa': { ancho: 844, alto: 1388, capas: [
    { src: '/img/collages/la-mariposa/0.webp', x: 0.0, y: 0.0, w: 96.209, h: 46.686, giro: 2.2, contragiro: 1.37, dx: 0.52, dy: 0.43, duracion: 4.27, retraso: -4.38 },
    { src: '/img/collages/la-mariposa/1.webp', x: 2.488, y: 19.741, w: 93.72, h: 50.288, giro: -1.57, contragiro: -0.83, dx: 0.72, dy: 0.86, duracion: 5.26, retraso: -1.14 },
    { src: '/img/collages/la-mariposa/2.webp', x: 2.014, y: 45.245, w: 97.986, h: 54.755, giro: 2.03, contragiro: 1.02, dx: 0.71, dy: 0.71, duracion: 4.95, retraso: -2.33 },
  ] },
  'la-tertulia': { ancho: 824, alto: 1355, capas: [
    { src: '/img/collages/la-tertulia/0.webp', x: 2.063, y: 0.0, w: 95.631, h: 41.993, giro: 1.79, contragiro: 0.82, dx: 0.5, dy: 0.46, duracion: 5.39, retraso: -2.68 },
    { src: '/img/collages/la-tertulia/1.webp', x: 1.092, y: 47.823, w: 98.908, h: 52.177, giro: -2.19, contragiro: -0.98, dx: 0.57, dy: 0.49, duracion: 5.04, retraso: -1.41 },
    { src: '/img/collages/la-tertulia/2.webp', x: 0.0, y: 24.133, w: 99.029, h: 38.229, giro: 1.77, contragiro: 1.2, dx: 0.96, dy: 0.86, duracion: 5.54, retraso: -0.84 },
  ] },
  'la-brujula': { ancho: 900, alto: 1408, capas: [
    { src: '/img/collages/la-brujula/0.webp', x: 0.0, y: 15.417, w: 100.0, h: 84.583, giro: 1.56, contragiro: 1.37, dx: 0.49, dy: 0.54, duracion: 4.73, retraso: -3.15 },
    { src: '/img/collages/la-brujula/1.webp', x: 4.496, y: 0.0, w: 88.925, h: 38.052, giro: -1.71, contragiro: -0.95, dx: 0.82, dy: 0.5, duracion: 5.41, retraso: -0.7 },
    { src: '/img/collages/la-brujula/2.webp', x: 6.908, y: 7.148, w: 85.855, h: 40.154, giro: 1.77, contragiro: 1.29, dx: 0.94, dy: 0.87, duracion: 5.48, retraso: -5.15 },
  ] },
  'hub-solar': { ancho: 496, alto: 843, capas: [
    { src: '/img/collages/hub-solar/0.webp', x: 0.0, y: 45.552, w: 99.798, h: 47.568, giro: 1.75, contragiro: 1.05, dx: 0.5, dy: 0.83, duracion: 5.1, retraso: -3.98 },
    { src: '/img/collages/hub-solar/1.webp', x: 0.0, y: 92.883, w: 100.0, h: 7.117, giro: -1.94, contragiro: -1.11, dx: 0.73, dy: 0.87, duracion: 4.33, retraso: -1.1 },
    { src: '/img/collages/hub-solar/2.webp', x: 0.0, y: 0.0, w: 100.0, h: 53.144, giro: 1.89, contragiro: 0.81, dx: 0.64, dy: 0.59, duracion: 5.68, retraso: -4.95 },
  ] },
  'hub-terrestre': { ancho: 516, alto: 856, capas: [
    { src: '/img/collages/hub-terrestre/0.webp', x: 1.163, y: 2.57, w: 98.837, h: 94.626, giro: 1.57, contragiro: 0.84, dx: 0.72, dy: 0.63, duracion: 4.33, retraso: -1.76 },
    { src: '/img/collages/hub-terrestre/1.webp', x: 1.55, y: 0.0, w: 98.062, h: 35.981, giro: -1.72, contragiro: -1.5, dx: 0.72, dy: 0.6, duracion: 4.99, retraso: -0.09 },
    { src: '/img/collages/hub-terrestre/2.webp', x: 0.0, y: 68.224, w: 99.612, h: 31.776, giro: 1.54, contragiro: 0.98, dx: 0.94, dy: 0.83, duracion: 5.43, retraso: -3.1 },
  ] },
  'hub-lunar': { ancho: 498, alto: 831, capas: [
    { src: '/img/collages/hub-lunar/0.webp', x: 0.0, y: 32.611, w: 99.197, h: 47.292, giro: 1.53, contragiro: 1.17, dx: 0.91, dy: 0.42, duracion: 5.54, retraso: -2.24 },
    { src: '/img/collages/hub-lunar/1.webp', x: 0.0, y: 0.0, w: 99.197, h: 36.342, giro: -1.92, contragiro: -1.38, dx: 0.92, dy: 0.58, duracion: 4.88, retraso: -2.84 },
    { src: '/img/collages/hub-lunar/2.webp', x: 0.0, y: 79.543, w: 100.0, h: 20.457, giro: 1.73, contragiro: 1.4, dx: 0.94, dy: 0.57, duracion: 4.36, retraso: -2.71 },
  ] },
  'oraculo-terrestre': { ancho: 785, alto: 1505, capas: [
    { src: '/img/collages/oraculo-terrestre/0.webp', x: 0.382, y: 9.834, w: 98.854, h: 88.97, giro: 2.02, contragiro: 0.82, dx: 0.51, dy: 0.83, duracion: 4.33, retraso: -3.04 },
    { src: '/img/collages/oraculo-terrestre/1.webp', x: 0.255, y: 64.983, w: 98.854, h: 35.017, giro: -2.08, contragiro: -1.29, dx: 0.73, dy: 0.64, duracion: 4.64, retraso: -3.45 },
    { src: '/img/collages/oraculo-terrestre/2.webp', x: 0.0, y: 0.0, w: 100.0, h: 37.076, giro: 1.74, contragiro: 1.46, dx: 0.53, dy: 0.7, duracion: 5.63, retraso: -1.43 },
  ] },
  'tiradas-de-temporada': { ancho: 582, alto: 912, capas: [
    { src: '/img/collages/tiradas-de-temporada/0.webp', x: 1.203, y: 0.0, w: 98.797, h: 52.083, giro: 1.58, contragiro: 0.76, dx: 0.8, dy: 0.75, duracion: 5.06, retraso: -3.61 },
    { src: '/img/collages/tiradas-de-temporada/1.webp', x: 0.0, y: 35.855, w: 98.797, h: 64.035, giro: -1.68, contragiro: -1.47, dx: 0.8, dy: 0.68, duracion: 5.5, retraso: -4.99 },
    { src: '/img/collages/tiradas-de-temporada/2.webp', x: 1.203, y: 90.022, w: 97.423, h: 9.978, giro: 1.71, contragiro: 1.0, dx: 0.83, dy: 0.85, duracion: 4.82, retraso: -2.0 },
  ] },
  'tiradas-individuales': { ancho: 583, alto: 922, capas: [
    { src: '/img/collages/tiradas-individuales/0.webp', x: 0.0, y: 0.0, w: 100.0, h: 95.011, giro: 2.11, contragiro: 0.7, dx: 0.64, dy: 0.46, duracion: 4.49, retraso: -2.79 },
    { src: '/img/collages/tiradas-individuales/1.webp', x: 0.0, y: 79.935, w: 100.0, h: 20.065, giro: -2.18, contragiro: -1.09, dx: 0.77, dy: 0.77, duracion: 5.37, retraso: -2.86 },
    { src: '/img/collages/tiradas-individuales/2.webp', x: 0.0, y: 39.262, w: 100.0, h: 40.998, giro: 2.0, contragiro: 0.96, dx: 0.83, dy: 0.52, duracion: 4.64, retraso: -1.85 },
  ] },
  'tiradas-grupales': { ancho: 586, alto: 920, capas: [
    { src: '/img/collages/tiradas-grupales/0.webp', x: 0.683, y: 39.239, w: 99.317, h: 36.848, giro: 1.67, contragiro: 1.46, dx: 0.76, dy: 0.5, duracion: 5.06, retraso: -0.04 },
    { src: '/img/collages/tiradas-grupales/1.webp', x: 0.0, y: 67.609, w: 99.829, h: 32.391, giro: -1.99, contragiro: -1.5, dx: 0.82, dy: 0.5, duracion: 5.41, retraso: -1.06 },
    { src: '/img/collages/tiradas-grupales/2.webp', x: 0.683, y: 0.0, w: 79.181, h: 39.565, giro: 1.99, contragiro: 1.23, dx: 0.67, dy: 0.59, duracion: 4.38, retraso: -1.94 },
    { src: '/img/collages/tiradas-grupales/3.webp', x: 50.0, y: 0.0, w: 49.488, h: 39.565, giro: -1.76, contragiro: -1.5, dx: 0.55, dy: 0.41, duracion: 5.5, retraso: -4.42 },
  ] },
};

/** ¿Hay collage animado con ese nombre? */
export const tieneCollage = (nombre: string) => nombre in collages;
