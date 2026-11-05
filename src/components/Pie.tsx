import Link from 'next/link';
import { sitio } from '@/config/sitio';

export function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <Link href="/" className="logo gotica">{sitio.nombre}</Link>
        <nav aria-label="Contacto">
          <a href={sitio.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <Link href="/reservar">Pide tu cita</Link>
          <Link href="/aprende">Aprende conmigo</Link>
        </nav>
        <span className="suave">© {new Date().getFullYear()} {sitio.nombre}</span>
      </div>
    </footer>
  );
}
