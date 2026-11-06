export const sitio = {
  nombre: 'en_cartada',
  autora: 'Camila',
  // Lema y presentación: palabras de Camila (README del repositorio encartada).
  lema: '_Pensemos_ la imagen, hagámosla _cuerpo_.',
  descripcion: 'Mi oficio es enseñarte a leer simbólicamente tu vida, para que la nombres con claridad y hondura y puedas crearla con mayor lucidez.',
  whatsapp: '34667772711',
  instagram: 'https://www.instagram.com/en_cartada/',
  email: 'encartada.tarot@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
};

export function enlaceWhatsapp(mensaje: string) {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Menú principal. Añade aquí nuevas páginas para que aparezcan en la navegación. */
export const menu: { titulo: string; href: string; hijos?: { titulo: string; href: string; sub?: boolean }[] }[] = [
  { titulo: 'Inicio', href: '/' },
  {
    titulo: 'oráculos',
    href: '/oraculos',
    hijos: [
      { titulo: 'Lunar: sueños', href: '/suenos' },
      { titulo: 'Terrestre: tarot', href: '/tarot' },
      { titulo: 'Tarot individual', href: '/tarot-individual', sub: true },
      { titulo: 'Tarot grupal', href: '/tarot-grupal', sub: true },
      { titulo: 'Tarot de temporada', href: '/tarot-de-temporada', sub: true },
      { titulo: 'Solar: astrología', href: '/astrologia' },
    ],
  },
  {
    titulo: 'Aprende conmigo',
    href: '/aprende',
    hijos: [
      { titulo: 'Cursos', href: '/cursos' },
      { titulo: 'Grabaciones', href: '/grabaciones' },
      { titulo: 'Recursos', href: '/recursos' },
    ],
  },
];
