import Image from 'next/image';
import Link from 'next/link';
import { formatear } from '@/components/Texto';
import { enlaceWhatsapp, sitio } from '@/config/sitio';

// Todos los textos de esta página son palabras de Camila (README y oferta/ del repositorio "encartada").
const oraculos = [
  { href: '/suenos', titulo: 'Lunar', sub: 'sueños', acento: 'plata', texto: 'Como la mariposa que escapa a la mirada, las imágenes del sueño se escapan del recuerdo y la palabra.' },
  { href: '/tarot', titulo: 'Terrestre', sub: 'tarot', acento: 'verde', texto: 'El tarot, como la vida terrenal, es un juego que se rige por dos fuerzas: la fortuna y el deseo.' },
  { href: '/astrologia', titulo: 'Solar', sub: 'astrología', acento: 'dorado', texto: 'Cada persona y cada vida tiene su canción personal, singular, asignada por los dioses en el nacimiento.' },
];

export default function Inicio() {
  return (
    <>
      <section className="portada contenedor">
        <h1 className="gotica acento-rojo acento">{sitio.nombre}</h1>
        <p className="lema">{formatear(sitio.lema)}</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/oraculos" className="boton acento-rojo">ven al oráculo</Link>
          <Link href="/aprende" className="boton boton-borde acento-rojo">aprende conmigo</Link>
        </div>
        <div className="abanico" aria-hidden="true">
          <Image src="/img/lecturas/el-nudo.webp" alt="" width={790} height={1448} priority />
          <Image src="/img/lecturas/la-encrucijada.webp" alt="" width={818} height={1375} priority />
          <Image src="/img/lecturas/el-tropo.webp" alt="" width={845} height={1390} priority />
        </div>
      </section>

      <section className="seccion contenedor acento-rojo">
        <h2 className="gotica acento">¿quién soy?</h2>
        <div className="cita">
          <p>Artista visual y escénica; iniciada en el tarot por mi madre y mi abuela; y astróloga helenística, dedico mi trabajo a <em>tenderte puentes de traducción</em> entre los oráculos, la historia del arte, la filosofía, la literatura y el psicoanálisis.</p>
          <p>Mi oficio es enseñarte cómo leerte simbólicamente, para que veas y nombres con hondura tu vida y, así, puedas crearla <em>con más lucidez</em>.</p>
        </div>
      </section>

      <section className="seccion contenedor">
        <h2 className="gotica acento-rojo acento">ven al oráculo</h2>
        <div className="rejilla">
          {oraculos.map((o) => (
            <Link key={o.href} href={o.href} className={`tarjeta acento-${o.acento}`}>
              <span className="etiqueta">{o.sub}</span>
              <h3 className="gotica">{o.titulo}</h3>
              <p><em>{o.texto}</em></p>
            </Link>
          ))}
        </div>
      </section>

      <section className="seccion contenedor centro acento-rojo">
        <h2 className="gotica acento">aprende conmigo</h2>
        <p className="intro"><em>Soy encartada y juntas exploramos el ecosistema del tarot.</em></p>
        <Link href="/aprende" className="boton">cursos y grabaciones</Link>
      </section>

      <section className="seccion contenedor centro acento-verde">
        <p className="intro"><em>Ven, preguntémonos cómo.</em></p>
        <a className="boton boton-borde" href={enlaceWhatsapp(`Hola ${sitio.autora}, tengo una pregunta`)} target="_blank" rel="noreferrer">
          escríbeme por WhatsApp
        </a>
      </section>
    </>
  );
}
