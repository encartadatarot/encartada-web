import Link from 'next/link';

export default function NoEncontrado() {
  return (
    <div className="contenedor centro acento-morado">
      <h1 className="titulo-pagina gotica">Camino perdido</h1>
      <p className="intro"><em>Esta página no existe… o aún no ha llegado su momento.</em></p>
      <Link href="/" className="boton">Volver al inicio</Link>
    </div>
  );
}
