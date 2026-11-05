import Link from 'next/link';
import { detalleLectura } from '@/components/BloqueLectura';
import { categorias } from '@/content/categorias';
import { serviciosDe } from '@/content/servicios';
import { lineaPrecios } from '@/lib/precios';

export const metadata = { title: 'Pide tu cita' };

export default function Reservar() {
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-rojo">Pide tu cita</h1>
      {categorias.map((c) => {
        const lista = serviciosDe(c.slug).filter((s) => s.reservaOnline !== false);
        if (!lista.length) return null;
        return (
          <section key={c.slug} className="seccion">
            <h2 className="gotica centro" style={{ fontSize: '2.2rem' }}>{c.titulo}</h2>
            <div className="rejilla">
              {lista.map((s) => (
                <Link key={s.slug} href={`/reservar/${s.slug}`} className={`tarjeta acento-${s.acento}`}>
                  <h3 className="gotica">{s.nombre}</h3>
                  <p>{detalleLectura(s)}</p>
                  <p className="acento">{lineaPrecios(s.precios)}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
