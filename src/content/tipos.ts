export type Moneda = 'eur' | 'usd' | 'cop';
export type Precios = Partial<Record<Moneda, number>>;
export type Acento = 'rojo' | 'verde' | 'morado' | 'dorado' | 'plata' | 'azul';
export type Modalidad = 'virtual' | 'presencial';

/** Texto con formato sencillo: **negrita**, _cursiva_, ==color de acento==. Cada string es un párrafo. */
export type Texto = string[];

export interface Servicio {
  slug: string;
  nombre: string;
  categoria: string; // slug de la categoría (ver categorias.ts)
  publicado: boolean;
  acento: Acento;
  /** Color exacto de la web original (hex). Si no, se usa el del acento. */
  color?: string;
  /** Título con formato (p. ej. "Tu canción _natal_"). Si no, se usa `nombre`. */
  titulo?: string;
  imagen?: string;
  cartas?: number;
  duracionMin: number;
  modalidades: Modalidad[];
  precios: Precios;
  descripcion: Texto;
  /** Qué hay que preparar antes de la sesión (se muestra en la ficha y en la reserva). */
  preparacion?: string;
  /** Para lecturas grupales, p. ej. "3 a 4 personas". */
  personas?: string;
  /** Antelación mínima propia (si necesita preparación). Si no, se usa la de agenda.ts. */
  antelacionMinHoras?: number;
  /** Si es false, la lectura se muestra pero no se puede reservar online. */
  reservaOnline?: boolean;
}

export interface Categoria {
  slug: string;
  titulo: string;
  oraculo: 'lunar' | 'terrestre' | 'solar';
  intro?: Texto;
  /** Pequeño título de la web original, p. ej. "Tiradas grupales". */
  rotulo?: string;
}

export interface Curso {
  slug: string;
  titulo: string;
  tipo: 'curso' | 'clase' | 'grabacion';
  publicado: boolean;
  acento: Acento;
  imagen?: string;
  resumen: string;
  descripcion: Texto;
  precios: Precios;
  /** Precio de una sola sesión: si existe, la inscripción ofrece «Curso completo» o «Una sesión». */
  preciosSesion?: Precios;
  /** Pregunta abierta de la inscripción (copiada del formulario de Google). */
  pregunta?: string;
  /** Sesiones con su texto e imagen (se muestran una a una en la ficha). */
  sesiones?: { titulo: string; texto: Texto; imagen?: string }[];
  /** Temario opcional, agrupado por partes. */
  temario?: { parte?: string; sesiones: string[] }[];
  /** Fechas y horario en texto, p. ej. "Domingos 6 y 20 de diciembre de 2026". */
  fechas?: string;
  formato?: string;
  requisitos?: string[];
  /** Mensaje cuando no se vende online (inscripciones cerradas, precio pendiente…). */
  aviso?: string;
}

export interface Recurso {
  slug: string;
  titulo: string;
  publicado: boolean;
  tipo: 'descarga' | 'articulo' | 'enlace';
  resumen: string;
  url: string;
}
