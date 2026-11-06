import type { Metadata } from 'next';
import { Cormorant_Garamond, Italiana, UnifrakturMaguntia } from 'next/font/google';
import { ObservadorApariciones } from '@/components/Apariciones';
import { Cabecera } from '@/components/Cabecera';
import { Pie } from '@/components/Pie';
import { sitio } from '@/config/sitio';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--f-serif' });
const gotica = UnifrakturMaguntia({ subsets: ['latin'], weight: '400', variable: '--f-gotica' });
// Títulos del oráculo solar: la serif fina y ancha más parecida a la de la web original.
const solar = Italiana({ subsets: ['latin'], weight: '400', variable: '--f-solar' });

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { default: `${sitio.nombre} · tarot, sueños y astrología`, template: `%s · ${sitio.nombre}` },
  description: sitio.descripcion,
  openGraph: { siteName: sitio.nombre, locale: 'es_ES', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${gotica.variable} ${solar.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que hay JavaScript: solo entonces se ocultan imágenes y letras hasta su aparición. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <ObservadorApariciones />
        <Cabecera />
        <main>{children}</main>
        <Pie />
      </body>
    </html>
  );
}
