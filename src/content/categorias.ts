import type { Categoria } from './tipos';

// Textos de introducción: palabras de Camila, tal como están en la web (oferta/oraculos.md).
export const categorias: Categoria[] = [
  {
    slug: 'suenos',
    titulo: 'Lunar: sueños',
    oraculo: 'lunar',
    intro: [
      'Cada vez que sueñas estás frente a un terror entre lo familiar y lo extraño. Volver del sueño y narrar lo que viste en tercera persona te muestra cuán _extraña eres para ti misma_. En cada sueño te desconoces, eres libre de ti.',
      '==**En el _más allá_ interior existe una narradora y creadora de imágenes que no puedes _controlar_ pero que puedes _conocer_.**==',
      '==Como la mariposa que escapa a la mirada, las imágenes del sueño se escapan del recuerdo y la palabra.==',
      'Te ofrezco _el espejo de mi escucha_, para conocer a esa creadora de imágenes auténticas que son puertas para explorar tu sabiduría simbólica y traer su riqueza del otro a este mundo.',
    ],
  },
  {
    slug: 'tarot-individual',
    titulo: 'Tarot individual',
    oraculo: 'terrestre',
    rotulo: 'Tiradas individuales',
    intro: [
      '_Las lecturas funcionan por tiempo. Entre más tiempo, podemos abarcar más temas y más profundidad._',
      '_Tú decides cuánto tiempo invertir._',
    ],
  },
  { slug: 'tarot-grupal', titulo: 'Tarot grupal', oraculo: 'terrestre', rotulo: 'Tiradas grupales' },
  { slug: 'tarot-de-temporada', titulo: 'Tarot de temporada', oraculo: 'terrestre', rotulo: 'Tiradas de temporada' },
  {
    slug: 'astrologia',
    titulo: 'Solar: astrología',
    oraculo: 'solar',
    intro: [
      '**La astrología es el medio que descubrieron los antiguos para comunicarse con los dioses.**',
      '==Es una **_tecnología lingüística_** que _traduce_ las señales que nos envían en el movimiento de los astros a historias, imágenes y melodías.==',
      'Cada persona y cada vida tiene su _canción personal_, singular, asignada por los dioses en el nacimiento; esa melodía antigua se nos olvida a lo largo de la vida, y ese silencio nos hunde en el sinsentido y la confusión.',
      'El oráculo astrológico te ofrece un espacio para volver a oírla y acompasarte con el ritmo de tu destino y lo bailes a tu manera.',
    ],
  },
];

/** Introducción de la página "Terrestre: tarot". */
export const introTarot = [
  'El tarot, como la vida terrenal, es un juego que se rige por dos fuerzas: la _fortuna_ y el _deseo_. La fortuna es de orden divino, y el deseo, de orden humano.',
  '==**Jugar al tarot _amplía tu mirada_ y tu imaginación para ver lo divino en lo mundano, y así poder nombrar y _orientar tu deseo_.**==',
  'Las imágenes del tarot pueden ser espejos vanidosos que te encierren en ti misma, o espejos oraculares que te acompañen a transformarte en otra más recursiva, ingeniosa y lúcida, que sepa jugar mejor al enigmático juego de la vida.',
  '**Al leerte, en la mesa, y en el mundo, llegas a ver cómo vivir —y morir— mejor.**',
];

export const getCategoria = (slug: string) => categorias.find((c) => c.slug === slug);
