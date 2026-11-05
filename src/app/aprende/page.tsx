import Link from 'next/link';
import { cursosPublicados } from '@/content/cursos';
import { recursosPublicados } from '@/content/recursos';

export const metadata = { title: 'Aprende conmigo' };

export default function Aprende() {
  const secciones = [
    { href: '/cursos', titulo: 'Cursos', acento: 'rojo', n: cursosPublicados.filter((c) => c.tipo !== 'grabacion').length, texto: 'Formaciones en directo con acompañamiento.' },
    { href: '/grabaciones', titulo: 'Grabaciones', acento: 'morado', n: cursosPublicados.filter((c) => c.tipo === 'grabacion').length, texto: 'Clases grabadas para ver a tu ritmo.' },
    { href: '/recursos', titulo: 'Recursos', acento: 'dorado', n: recursosPublicados.length, texto: 'Material gratuito: tiradas, guías y lecturas.' },
  ];
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-rojo">Aprende conmigo</h1>
      <div className="rejilla">
        {secciones.map((s) => (
          <Link key={s.href} href={s.href} className={`tarjeta acento-${s.acento}`}>
            <h3 className="gotica">{s.titulo}</h3>
            <p>{s.texto}</p>
            <span className="etiqueta">{s.n ? `${s.n} disponibles` : 'Muy pronto'}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
