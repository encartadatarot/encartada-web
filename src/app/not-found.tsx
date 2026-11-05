import Link from 'next/link';

export default function NoEncontrado() {
  return (
    <div className="contenedor centro acento-morado">
      <h1 className="titulo-pagina gotica">página no encontrada</h1>
      <p className="intro"><em>Vuelve a la imagen.</em></p>
      <Link href="/" className="boton">Volver al inicio</Link>
    </div>
  );
}
