import { recursosPublicados } from '@/content/recursos';

export const metadata = { title: 'Recursos' };

export default function Recursos() {
  return (
    <div className="contenedor">
      <h1 className="titulo-pagina gotica acento-dorado">Recursos</h1>
      {recursosPublicados.length === 0 ? (
        <p className="intro"><em>Muy pronto: tiradas, guías y material gratuito.</em></p>
      ) : (
        <div className="rejilla">
          {recursosPublicados.map((r) => (
            <a key={r.slug} href={r.url} className="tarjeta acento-dorado" target={r.tipo === 'enlace' ? '_blank' : undefined} rel="noreferrer">
              <span className="etiqueta">{r.tipo}</span>
              <h3 className="gotica">{r.titulo}</h3>
              <p>{r.resumen}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
