import Link from 'next/link';
import { Letras } from '@/components/Apariciones';
import { cursosPublicados } from '@/content/cursos';
import { recursosPublicados } from '@/content/recursos';

export const metadata = { title: 'Aprende conmigo' };

export default function Aprende() {
  const secciones = [
    { href: '/cursos', titulo: 'cursos', acento: 'rojo', lista: cursosPublicados.filter((c) => c.tipo !== 'grabacion') },
    { href: '/grabaciones', titulo: 'grabaciones', acento: 'morado', lista: cursosPublicados.filter((c) => c.tipo === 'grabacion') },
    { href: '/recursos', titulo: 'recursos', acento: 'dorado', lista: recursosPublicados },
  ];
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-rojo">aprende conmigo</h1>
      <p className="intro"><em>Soy encartada y juntas exploramos el ecosistema de tu vida a través del lenguaje oracular.</em></p>
      <div className="rejilla">
        {secciones.map((s) => (
          <Link key={s.href} href={s.href} className={`tarjeta acento-${s.acento}`}>
            <h3 className="gotica">{s.titulo}</h3>
            {s.lista.length ? s.lista.map((x) => <Letras as="p" key={x.slug}>{x.titulo}</Letras>) : <p>Muy pronto.</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
