import Image from 'next/image';
import Link from 'next/link';
import { getCategoria } from '@/content/categorias';
import { serviciosPublicados } from '@/content/servicios';
import { lineaPrecios } from '@/lib/precios';

export const metadata = { title: 'Reservar' };

export default function Reservar() {
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-dorado">Pide tu cita</h1>
      <p className="intro"><em>Elige la lectura que te llama.</em></p>
      <div className="rejilla">
        {serviciosPublicados.filter((s) => s.reservaOnline !== false).map((s) => (
          <Link key={s.slug} href={`/reservar/${s.slug}`} className={`tarjeta acento-${s.acento}`}>
            {s.imagen && <Image src={s.imagen} alt="" width={840} height={1400} style={{ maxWidth: 140, margin: '0 auto 8px' }} />}
            <span className="etiqueta">{getCategoria(s.categoria)?.titulo}</span>
            <h3 className="gotica">{s.nombre}</h3>
            <p>{s.cartas ? `${s.cartas} cartas · ` : ''}{s.duracionMin} min</p>
            <p>{lineaPrecios(s.precios)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
