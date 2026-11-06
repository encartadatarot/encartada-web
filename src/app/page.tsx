import Image from 'next/image';
import Link from 'next/link';
import { MosaicoAnimado } from '@/components/MosaicoAnimado';
import { formatear } from '@/components/Texto';
import { sitio } from '@/config/sitio';
import { imagen } from '@/content/imagenes';

/*
 * Portada copiada de la distribución de Canva (página de 1366 px de ancho): posiciones y tamaños
 * en «unidades Canva» (--u = 1/1366 del ancho), para que en ordenador se vea igual a cualquier tamaño.
 * Textos: palabras de Camila. Imágenes: mosaico y collage final de la web original.
 */
const L = (...lineas: React.ReactNode[]) => lineas.map((l, i) => <span key={i} className="linea">{l}</span>);

export default function Inicio() {
  return (
    <>
      <section className="mosaico flota">
        <MosaicoAnimado alt={`${sitio.nombre}: emblema del corazón con espadas y llama entre cartas de tarot`} />
      </section>

      <p className="contenedor lema-portada">{formatear(sitio.lema)}</p>

      <section className="portada-canva acento-lema">
        <h2 className="gotica acento pc pc-quien acento-rojo">¿quién soy?</h2>
        <p className="pc pc-bio">
          {L(
            <><strong><em>Artista</em></strong> visual y escénica;</>,
            <>iniciada en el <strong><em>tarot</em></strong> por</>,
            <>mi madre; y <strong><em>astróloga</em></strong></>,
            'helenística.',
            'Dedico mi trabajo a',
            <>tenderte <strong><em>puentes de</em></strong></>,
            <><strong><em>traducción</em></strong> entre los</>,
            'oráculos, la historia',
            'del arte, la filosofía,',
            'la literatura, el',
            'esoterismo',
            'y el psicoanálisis.',
          )}
        </p>
        <p className="pc pc-oficio">
          {L('Mi oficio es', 'enseñarte a leer', <em>simbólicamente tu</em>, <em>vida, para que la</em>, <><em>nombres</em> con</>, 'claridad y', 'hondura y', 'puedas crearla con', <>mayor <em>lucidez</em>.</>)}
        </p>

        <Link href="/oraculos" className="flota pc-enlace">
          <h2 className="gotica acento pc pc-oraculo-t">{L('ven al', 'oráculo')}</h2>
          <span className="pc pc-oraculo-i"><Image {...imagen('/img/inicio/oraculo-v2.webp')} alt="" sizes="(max-width: 760px) 50vw, 14vw" /></span>
        </Link>
        <Link href="/aprende" className="flota pc-enlace">
          <span className="pc pc-aprende-i"><Image {...imagen('/img/inicio/aprende-v2.webp')} alt="" sizes="(max-width: 760px) 50vw, 15vw" /></span>
          <h2 className="gotica acento pc pc-aprende-t">{L('aprende', 'conmigo')}</h2>
        </Link>
        <span className="flota pc pc-final"><Image {...imagen('/img/inicio/lema-v2.webp')} alt="" sizes="(max-width: 760px) 90vw, 31vw" /></span>
      </section>
    </>
  );
}
