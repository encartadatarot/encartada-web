import Image from 'next/image';
import Link from 'next/link';
import { detalleLectura, estiloLectura, TituloLectura } from '@/components/BloqueLectura';
import { categorias } from '@/content/categorias';
import { imagen } from '@/content/imagenes';
import { oraculos } from '@/content/oraculos';
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
        const o = oraculos[c.oraculo];
        return (
          <section key={c.slug} className="seccion">
            <h2 className={`${o.fuente} centro`} style={{ fontSize: '2.4rem', color: o.color }}>{c.rotulo ?? c.titulo}</h2>
            <div className="rejilla">
              {lista.map((s) => {
                const { className, style } = estiloLectura(s);
                return (
                  <Link key={s.slug} href={`/reservar/${s.slug}`} className={`tarjeta tarjeta-lectura ${className}`} style={style}>
                    {s.imagen && <Image {...imagen(s.imagen)} alt="" sizes="120px" />}
                    <div>
                      <TituloLectura servicio={s} como="h3" />
                      <p>{detalleLectura(s)}</p>
                      <p className="acento">{lineaPrecios(s.precios)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
