import type { Metadata } from 'next';
import { Cormorant_Garamond, UnifrakturMaguntia } from 'next/font/google';
import { Cabecera } from '@/components/Cabecera';
import { Pie } from '@/components/Pie';
import { sitio } from '@/config/sitio';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--f-serif' });
const gotica = UnifrakturMaguntia({ subsets: ['latin'], weight: '400', variable: '--f-gotica' });

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { default: `${sitio.nombre} · tarot, sueños y astrología`, template: `%s · ${sitio.nombre}` },
  description: sitio.descripcion,
  openGraph: { siteName: sitio.nombre, locale: 'es_ES', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${gotica.variable}`}>
      <body>
        <Cabecera />
        <main>{children}</main>
        <Pie />
      </body>
    </html>
  );
}
