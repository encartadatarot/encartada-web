import { ListaCursos } from '@/components/ListaCursos';
import { cursosPublicados } from '@/content/cursos';

export const metadata = { title: 'Cursos' };

export default function Cursos() {
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-rojo">Cursos</h1>
      <ListaCursos cursos={cursosPublicados.filter((c) => c.tipo !== 'grabacion')} vacio="Las nuevas fechas se anunciarán muy pronto." />
    </div>
  );
}
