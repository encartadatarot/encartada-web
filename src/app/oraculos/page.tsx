import Link from 'next/link';
import { Letras } from '@/components/Apariciones';
import { CollageAnimado } from '@/components/CollageAnimado';
import { oraculos } from '@/content/oraculos';

export const metadata = { title: 'Oráculos' };

export default function Oraculos() {
  return (
    <div className="contenedor">
      <div className="columnas-cartas hub">
        {Object.entries(oraculos).map(([clave, o]) => (
          <Link key={o.href} href={o.href} className="carta-enlace">
            <Letras as="h1" className={o.fuente} style={{ color: o.color }}>{o.nombre}</Letras>
            <Letras as="p">{o.subtitulo}</Letras>
            <div className="carta-collage"><CollageAnimado nombre={`hub-${clave}`} alt={`Oráculo ${o.nombre.toLowerCase()}: ${o.subtitulo}`} ancho={260} priority alPasar /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
