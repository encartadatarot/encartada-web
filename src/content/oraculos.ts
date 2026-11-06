/**
 * Los tres oráculos con el aspecto de la web original de Canva:
 * cada uno tiene su color, su tipografía de títulos y su collage.
 */
export type Oraculo = 'lunar' | 'terrestre' | 'solar';

export const oraculos: Record<Oraculo, {
  nombre: string;
  titulo: string;
  subtitulo: string;
  href: string;
  color: string;
  /** Clase de la tipografía de títulos: lunar (cursiva), gotica (tarot), solar (fina). */
  fuente: 'titulo-lunar' | 'gotica' | 'titulo-solar';
  collage: string;
  tarjeta: string;
}> = {
  lunar: {
    nombre: 'Lunar', titulo: 'oráculo lunar', subtitulo: 'interpretación de sueños', href: '/suenos',
    color: '#8aaaa7', fuente: 'titulo-lunar',
    collage: '/img/oraculos/oraculo-lunar.webp', tarjeta: '/img/oraculos/hub-lunar.webp',
  },
  terrestre: {
    nombre: 'Terrestre', titulo: 'oráculo terrestre', subtitulo: 'lectura de tarot', href: '/tarot',
    color: '#528c55', fuente: 'gotica',
    collage: '/img/oraculos/oraculo-terrestre.webp', tarjeta: '/img/oraculos/hub-terrestre.webp',
  },
  solar: {
    nombre: 'Solar', titulo: 'oráculo solar', subtitulo: 'consulta astrológica', href: '/astrologia',
    color: '#bb9740', fuente: 'titulo-solar',
    collage: '/img/oraculos/oraculo-solar.webp', tarjeta: '/img/oraculos/hub-solar.webp',
  },
};

/** Tarjetas de la página "oráculo terrestre", como en la web original. */
export const tiradas = [
  { href: '/tarot-individual', titulo: 'Tiradas individuales', imagen: '/img/oraculos/tarot-individual.webp' },
  { href: '/tarot-grupal', titulo: 'Tiradas grupales', imagen: '/img/oraculos/tarot-grupal.webp' },
  { href: '/tarot-de-temporada', titulo: 'Tiradas de temporada', imagen: '/img/oraculos/tarot-de-temporada.webp' },
];
