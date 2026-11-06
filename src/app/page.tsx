import Image from 'next/image';
import Link from 'next/link';
import { sitio } from '@/config/sitio';
import { imagen } from '@/content/imagenes';

// Textos: palabras de Camila (README y oferta/ del repositorio "encartada"). Imágenes: collages de la web original.
export default function Inicio() {
  return (
    <>
      <section className="mosaico flota">
        <Image {...imagen('/img/inicio/mosaico.webp')} alt={`${sitio.nombre}: emblema del corazón con espadas y llama entre cartas de tarot`} priority sizes="100vw" />
      </section>

      <section className="contenedor quien-soy acento-rojo">
        <div>
          <h2 className="gotica acento">¿quién soy?</h2>
          <p>
            <strong><em>Artista</em></strong> visual y escénica; iniciada en el <strong><em>tarot</em></strong> por mi madre;
            y <strong><em>astróloga</em></strong> helenística.
          </p>
          <p>
            Dedico mi trabajo a tenderte <strong><em>puentes de traducción</em></strong> entre los oráculos, la historia del arte,
            la filosofía, la literatura, el esoterismo y el psicoanálisis.
          </p>
        </div>
        <p className="quien-soy-cita">
          Mi oficio es enseñarte a leer <em>simbólicamente tu vida, para que la nombres</em> con claridad y hondura y puedas crearla
          con mayor <em>lucidez</em>.
        </p>
        <span className="flota quien-soy-imagen"><Image {...imagen('/img/inicio/xxi.webp')} alt="" sizes="200px" /></span>
      </section>

      <section className="contenedor portada-columnas acento-rojo">
        <Link href="/oraculos" className="carta-enlace flota">
          <h2 className="gotica acento">ven al oráculo</h2>
          <Image {...imagen('/img/inicio/oraculo.webp')} alt="" sizes="200px" />
        </Link>
        <Link href="/aprende" className="carta-enlace flota">
          <h2 className="gotica acento">aprende conmigo</h2>
          <Image {...imagen('/img/inicio/aprende.webp')} alt="" sizes="200px" />
        </Link>
        <div className="portada-lema flota">
          <Image {...imagen('/img/inicio/lema.webp')} alt="" sizes="(max-width: 760px) 90vw, 420px" />
        </div>
      </section>
    </>
  );
}
