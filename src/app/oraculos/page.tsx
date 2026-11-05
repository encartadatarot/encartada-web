import Link from 'next/link';
import { categorias } from '@/content/categorias';

export const metadata = { title: 'Oráculos' };
const acento = { lunar: 'plata', terrestre: 'verde', solar: 'dorado' } as const;

export default function Oraculos() {
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-dorado">Oráculos</h1>
      <div className="rejilla">
        {categorias.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className={`tarjeta acento-${acento[c.oraculo]}`}>
            <span className="etiqueta">{c.oraculo}</span>
            <h3 className="gotica">{c.titulo}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
