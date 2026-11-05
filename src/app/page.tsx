import Image from 'next/image';
import Link from 'next/link';
import { enlaceWhatsapp, sitio } from '@/config/sitio';

const oraculos = [
  { href: '/suenos', titulo: 'Lunar', sub: 'sueños', acento: 'plata', texto: 'Interpretación de sueños.' },
  { href: '/tarot', titulo: 'Terrestre', sub: 'tarot', acento: 'verde', texto: 'Lecturas individuales, grupales y de temporada.' },
  { href: '/astrologia', titulo: 'Solar', sub: 'astrología', acento: 'dorado', texto: 'Carta natal, retornos y tránsitos.' },
];

export default function Inicio() {
  return (
    <>
      <section className="portada contenedor">
        <h1 className="gotica">{sitio.nombre}</h1>
        <p className="lema">Tarot, sueños y astrología · virtual y presencial en Madrid</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/reservar" className="boton acento-dorado">Pide tu cita</Link>
          <Link href="/aprende" className="boton boton-borde acento-dorado">Aprende conmigo</Link>
        </div>
        <div className="abanico" aria-hidden="true">
          <Image src="/img/lecturas/el-nudo.webp" alt="" width={790} height={1448} priority />
          <Image src="/img/lecturas/la-encrucijada.webp" alt="" width={818} height={1375} priority />
          <Image src="/img/lecturas/el-tropo.webp" alt="" width={845} height={1390} priority />
        </div>
      </section>

      <section className="seccion contenedor">
        <h2 className="gotica">Oráculos</h2>
        <div className="rejilla">
          {oraculos.map((o) => (
            <Link key={o.href} href={o.href} className={`tarjeta acento-${o.acento}`}>
              <span className="etiqueta">{o.sub}</span>
              <h3 className="gotica">{o.titulo}</h3>
              <p>{o.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="seccion contenedor centro">
        <h2 className="gotica acento-rojo acento">Aprende conmigo</h2>
        <p className="intro">Cursos, clases grabadas y recursos para leer las cartas con tu propia voz.</p>
        <Link href="/aprende" className="boton acento-rojo">Ver cursos</Link>
      </section>

      <section className="seccion contenedor centro">
        <p className="intro"><em>¿Dudas sobre qué lectura elegir?</em></p>
        <a className="boton boton-borde acento-verde" href={enlaceWhatsapp(`Hola ${sitio.autora}, ¿qué lectura me recomiendas?`)} target="_blank" rel="noreferrer">
          Escríbeme por WhatsApp
        </a>
      </section>
    </>
  );
}
