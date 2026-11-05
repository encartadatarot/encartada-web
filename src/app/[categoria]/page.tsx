import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BloqueLectura } from '@/components/BloqueLectura';
import { Texto } from '@/components/Texto';
import { enlaceWhatsapp, sitio } from '@/config/sitio';
import { categorias, getCategoria } from '@/content/categorias';
import { serviciosDe } from '@/content/servicios';

type Props = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => categorias.map((c) => ({ categoria: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategoria((await params).categoria);
  return { title: c?.titulo };
}

const acentoOraculo = { lunar: 'plata', terrestre: 'verde', solar: 'dorado' } as const;

export default async function PaginaCategoria({ params }: Props) {
  const categoria = getCategoria((await params).categoria);
  if (!categoria) notFound();
  const lista = serviciosDe(categoria.slug);

  return (
    <div className="contenedor">
      <h1 className={`titulo-pagina gotica acento-${acentoOraculo[categoria.oraculo]}`}>{categoria.titulo}</h1>
      {categoria.intro && <Texto parrafos={categoria.intro} className="intro" />}
      {lista.map((s) => <BloqueLectura key={s.slug} servicio={s} />)}
      {lista.length === 0 && (
        <div className="intro">
          <p><em>Muy pronto encontrarás aquí todas las lecturas.</em></p>
          <p>Mientras tanto, escríbeme y te cuento:</p>
          <a className="boton acento-verde" href={enlaceWhatsapp(`Hola ${sitio.autora}, quiero información sobre ${categoria.titulo}`)} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      )}
    </div>
  );
}
