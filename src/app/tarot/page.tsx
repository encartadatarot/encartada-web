import Image from 'next/image';
import Link from 'next/link';
import { CabeceraOraculo } from '@/components/CabeceraOraculo';
import { introTarot } from '@/content/categorias';
import { imagen } from '@/content/imagenes';
import { tiradas } from '@/content/oraculos';

export const metadata = { title: 'Terrestre: tarot' };

export default function Tarot() {
  return (
    <div className="contenedor">
      <CabeceraOraculo oraculo="terrestre" intro={introTarot} />
      <div className="columnas-cartas">
        {tiradas.map((t) => (
          <Link key={t.href} href={t.href} className="carta-enlace">
            <h2>{t.titulo}</h2>
            <Image {...imagen(t.imagen)} alt={`Collage de ${t.titulo.toLowerCase()}`} sizes="(max-width: 760px) 240px, 280px" />
          </Link>
        ))}
      </div>
    </div>
  );
}
