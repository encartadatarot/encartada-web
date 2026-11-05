import { ListaCursos } from '@/components/ListaCursos';
import { cursosPublicados } from '@/content/cursos';

export const metadata = { title: 'Grabaciones' };

export default function Grabaciones() {
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-morado">Grabaciones</h1>
      <ListaCursos cursos={cursosPublicados.filter((c) => c.tipo === 'grabacion')} vacio="Las clases grabadas estarán disponibles muy pronto." />
    </div>
  );
}
