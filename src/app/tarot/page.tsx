import Link from 'next/link';
import { Letras } from '@/components/Apariciones';
import { CabeceraOraculo } from '@/components/CabeceraOraculo';
import { CollageAnimado } from '@/components/CollageAnimado';
import { introTarot } from '@/content/categorias';
import { tiradas } from '@/content/oraculos';

export const metadata = { title: 'Terrestre: tarot' };

export default function Tarot() {
  return (
    <div className="contenedor">
      <CabeceraOraculo oraculo="terrestre" intro={introTarot} />
      <div className="columnas-cartas">
        {tiradas.map((t) => (
          <Link key={t.href} href={t.href} className="carta-enlace">
            <Letras as="h2">{t.titulo}</Letras>
            <div className="carta-collage"><CollageAnimado nombre={t.collage} alt={`Collage de ${t.titulo.toLowerCase()}`} ancho={280} alPasar /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
