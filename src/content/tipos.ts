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
  /** Si es false, el botón lleva a WhatsApp en lugar de al calendario (p. ej. lecturas grupales). */
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
  /** Temario opcional. */
  modulos?: { titulo: string; descripcion?: string }[];
  /** Fecha de inicio (cursos en directo), formato AAAA-MM-DD. */
  inicio?: string;
}

export interface Recurso {
  slug: string;
  titulo: string;
  publicado: boolean;
  tipo: 'descarga' | 'articulo' | 'enlace';
  resumen: string;
  url: string;
}
