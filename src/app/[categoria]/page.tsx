import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BloqueLectura } from '@/components/BloqueLectura';
import { CabeceraOraculo } from '@/components/CabeceraOraculo';
import { Texto } from '@/components/Texto';
import { categorias, getCategoria } from '@/content/categorias';
import { oraculos } from '@/content/oraculos';
import { serviciosDe } from '@/content/servicios';

type Props = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => categorias.map((c) => ({ categoria: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategoria((await params).categoria);
  return { title: c?.titulo };
}

export default async function PaginaCategoria({ params }: Props) {
  const categoria = getCategoria((await params).categoria);
  if (!categoria) notFound();
  const lista = serviciosDe(categoria.slug);
  const o = oraculos[categoria.oraculo];
  // Sueños y astrología llevan la cabecera de su oráculo; las tiradas de tarot, su rótulo.
  const conCabecera = categoria.oraculo !== 'terrestre' && categoria.intro;

  return (
    <div className="contenedor">
      {conCabecera ? (
        <CabeceraOraculo oraculo={categoria.oraculo} intro={categoria.intro!} />
      ) : (
        <>
          <h1 className={`titulo-pagina ${o.fuente}`} style={{ color: o.color }}>{categoria.rotulo ?? categoria.titulo}</h1>
          {categoria.intro && <Texto parrafos={categoria.intro} className="intro" />}
        </>
      )}
      {lista.map((s) => <BloqueLectura key={s.slug} servicio={s} />)}
      {lista.length === 0 && <p className="intro"><em>Muy pronto.</em></p>}
    </div>
  );
}
