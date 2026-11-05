import Link from 'next/link';
import { Texto } from '@/components/Texto';
import { categorias, introTarot } from '@/content/categorias';

export const metadata = { title: 'Terrestre: tarot' };

export default function Tarot() {
  const subs = categorias.filter((c) => c.oraculo === 'terrestre');
  const acentos = ['rojo', 'verde', 'dorado'];
  return (
    <div className="contenedor acento-verde">
      <h1 className="titulo-pagina gotica">Terrestre: tarot</h1>
      <Texto parrafos={introTarot} className="cita" />
      <div className="rejilla" style={{ marginTop: 40 }}>
        {subs.map((c, i) => (
          <Link key={c.slug} href={`/${c.slug}`} className={`tarjeta acento-${acentos[i % 3]}`}>
            <h3 className="gotica">{c.titulo}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
