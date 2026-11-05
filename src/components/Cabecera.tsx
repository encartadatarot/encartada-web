import Link from 'next/link';
import { menu, sitio } from '@/config/sitio';

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
          <Link href="/reservar" className="boton boton-chico acento-dorado">Reservar</Link>
        </nav>

        <details className="menu-movil">
          <summary aria-label="Abrir menú">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </summary>
          <div className="panel">
            <ul>
              {menu.map((m) => (
                <li key={m.href}>
                  <Link href={m.href}>{m.titulo}</Link>
                  {m.hijos && (
                    <ul className="hijos">
                      {m.hijos.map((h) => (
                        <li key={h.href} className={h.sub ? 'sub' : undefined}><Link href={h.href}>{h.titulo}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <p><Link href="/reservar" className="boton boton-chico acento-dorado">Reservar</Link></p>
          </div>
        </details>
      </div>
    </header>
  );
}
