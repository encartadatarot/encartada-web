import Link from 'next/link';
import { menu, sitio } from '@/config/sitio';
import { MenuMovil } from './MenuMovil';

export function Cabecera() {
  return (
    <header className="cabecera">
      <div className="contenedor">
        <Link href="/" className="logo gotica">{sitio.nombre}</Link>

        <nav className="nav" aria-label="Principal">
          <ul>
            {menu.map((m) => (
              <li key={m.href}>
                <Link href={m.href}>{m.titulo}</Link>
                {m.hijos && (
                  <ul className="submenu">
                    {m.hijos.map((h) => (
                      <li key={h.href} className={h.sub ? 'sub' : undefined}><Link href={h.href}>{h.titulo}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/reservar" className="boton boton-chico acento-rojo">Pide tu cita</Link>
        </nav>

        <MenuMovil menu={menu} />
      </div>
    </header>
  );
}
