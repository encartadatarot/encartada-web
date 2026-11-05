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
  /** Si es false, el botón lleva a WhatsApp en lugar de al calendario. */
  reservaOnline?: boolean;
}

export interface Categoria {
  slug: string;
  titulo: string;
  oraculo: 'lunar' | 'terrestre' | 'solar';
  intro?: Texto;
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
