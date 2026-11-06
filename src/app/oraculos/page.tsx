import Image from 'next/image';
import Link from 'next/link';
import { imagen } from '@/content/imagenes';
import { oraculos } from '@/content/oraculos';

export const metadata = { title: 'Oráculos' };

export default function Oraculos() {
  return (
    <div className="contenedor">
      <div className="columnas-cartas hub">
        {Object.values(oraculos).map((o) => (
          <Link key={o.href} href={o.href} className="carta-enlace">
            <h1 className={o.fuente} style={{ color: o.color }}>{o.nombre}</h1>
            <p>{o.subtitulo}</p>
            <Image {...imagen(o.tarjeta)} alt={`Oráculo ${o.nombre.toLowerCase()}: ${o.subtitulo}`} sizes="(max-width: 760px) 220px, 260px" priority />
          </Link>
        ))}
      </div>
    </div>
  );
}
