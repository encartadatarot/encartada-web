import Link from 'next/link';
import { categorias } from '@/content/categorias';

export const metadata = { title: 'Terrestre: tarot' };

export default function Tarot() {
  const subs = categorias.filter((c) => c.oraculo === 'terrestre');
  const acentos = ['rojo', 'verde', 'morado'];
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-verde">Terrestre: tarot</h1>
      <div className="rejilla">
        {subs.map((c, i) => (
          <Link key={c.slug} href={`/${c.slug}`} className={`tarjeta acento-${acentos[i % 3]}`}>
            <h3 className="gotica">{c.titulo}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
