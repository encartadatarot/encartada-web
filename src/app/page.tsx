import Image from 'next/image';
import Link from 'next/link';
import { formatear } from '@/components/Texto';
import { sitio } from '@/config/sitio';
import { imagen } from '@/content/imagenes';
import { oraculos } from '@/content/oraculos';

// Textos: palabras de Camila (README y oferta/ del repositorio "encartada"). Imágenes: collages de la web original.
export default function Inicio() {
  return (
    <>
      <section className="mosaico">
        <Image {...imagen('/img/inicio/mosaico.webp')} alt={`${sitio.nombre}: emblema del corazón con espadas y llama entre cartas de tarot`} priority sizes="100vw" />
      </section>

      <div className="contenedor centro" style={{ marginTop: 28 }}>
        <p className="lema">{formatear(sitio.lema)}</p>
      </div>

      <section className="contenedor quien-soy acento-rojo">
        <div>
          <h2 className="gotica acento">¿quién soy?</h2>
          <p>
            <strong><em>Artista</em></strong> visual y escénica; iniciada en el <strong><em>tarot</em></strong> por mi madre y mi abuela;
            y <strong><em>astróloga</em></strong> helenística, dedico mi trabajo a tenderte <strong><em>puentes de traducción</em></strong> entre
            los oráculos, la historia del arte, la filosofía, la literatura y el psicoanálisis.
          </p>
        </div>
        <p className="quien-soy-cita">
          Mi oficio es enseñarte cómo leerte <em>simbólicamente</em>, <em>para que veas</em> y <em>nombres</em> con hondura tu vida y, así,
          puedas crearla con <em>más lucidez</em>.
        </p>
        <Image {...imagen('/img/inicio/xxi.webp')} alt="" className="quien-soy-imagen" sizes="200px" />
      </section>

      <section className="contenedor portada-columnas acento-rojo">
        <Link href="/oraculos" className="carta-enlace">
          <h2 className="gotica acento">ven al oráculo</h2>
          <Image {...imagen('/img/inicio/oraculo.webp')} alt="" sizes="200px" />
        </Link>
        <Link href="/aprende" className="carta-enlace">
          <h2 className="gotica acento">aprende conmigo</h2>
          <Image {...imagen('/img/inicio/aprende.webp')} alt="" sizes="200px" />
        </Link>
        <div className="portada-lema">
          <Image {...imagen('/img/inicio/lema.webp')} alt="" sizes="(max-width: 760px) 90vw, 420px" />
          <p>{formatear(sitio.lema)}</p>
        </div>
      </section>

      <section className="seccion contenedor">
        <div className="columnas-cartas hub">
          {Object.values(oraculos).map((o) => (
            <Link key={o.href} href={o.href} className="carta-enlace">
              <h3 className={o.fuente} style={{ color: o.color }}>{o.nombre}</h3>
              <p>{o.subtitulo}</p>
              <Image {...imagen(o.tarjeta)} alt="" sizes="220px" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
