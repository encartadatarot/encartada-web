import Link from 'next/link';
import { enlaceWhatsapp, sitio } from '@/config/sitio';

export function Pie() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <Link href="/" className="logo gotica">{sitio.nombre}</Link>
        <nav aria-label="Contacto">
          <a href={sitio.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={enlaceWhatsapp(`Hola ${sitio.autora}, tengo una pregunta`)} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`mailto:${sitio.email}`}>Email</a>
          <Link href="/aprende">Aprende conmigo</Link>
        </nav>
        <span className="suave">© {new Date().getFullYear()} {sitio.nombre}</span>
      </div>
    </footer>
  );
}
