import type { Categoria } from './tipos';

export const categorias: Categoria[] = [
  { slug: 'suenos', titulo: 'Lunar: sueños', oraculo: 'lunar' },
  {
    slug: 'tarot-individual',
    titulo: 'Tarot individual',
    oraculo: 'terrestre',
    intro: [
      '_Las lecturas funcionan por tiempo. Entre más tiempo, podemos abarcar más temas y más profundidad._',
      '_Tú decides cuánto tiempo invertir._',
    ],
  },
  { slug: 'tarot-grupal', titulo: 'Tarot grupal', oraculo: 'terrestre' },
  { slug: 'tarot-de-temporada', titulo: 'Tarot de temporada', oraculo: 'terrestre' },
  { slug: 'astrologia', titulo: 'Solar: astrología', oraculo: 'solar' },
];

export const getCategoria = (slug: string) => categorias.find((c) => c.slug === slug);
