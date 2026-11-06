'use client';

import { useState } from 'react';
import type { Curso, Moneda } from '@/content/tipos';
import { formatearPrecio } from '@/lib/precios';
import { SelectorMoneda } from './DatosCliente';
import { crearPago, PagoEmbebido, pagosActivos } from './PagoEmbebido';
import { formatear } from './Texto';

/**
 * Inscripción a un curso o grabación. Las preguntas copian el formulario de Google de cada curso:
 * nombre, correo, «¿A cuántas sesiones vienes?» (si hay precio por sesión) y la pregunta abierta.
 * El comprobante de pago no hace falta: se paga aquí mismo.
 */
export function Compra({ curso }: { curso: Curso }) {
  const porSesion = Boolean(curso.preciosSesion && curso.sesiones?.length);
  const [moneda, setMoneda] = useState<Moneda>((Object.keys(curso.precios)[0] as Moneda) ?? 'eur');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [modo, setModo] = useState<'completo' | 'sesion' | null>(porSesion ? null : 'completo');
  const [sesion, setSesion] = useState<number | null>(null);
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Sin precio publicado → solo el aviso (inscripciones cerradas, próxima edición…).
  if (!Object.keys(curso.precios).length) {
    return curso.aviso ? <p className="aviso centro">{curso.aviso}</p> : null;
  }
  if (clientSecret) return <PagoEmbebido clientSecret={clientSecret} />;

  const precios = modo === 'sesion' && curso.preciosSesion ? curso.preciosSesion : curso.precios;
  const importe = precios[moneda];
  const listo = nombre.trim() && /^\S+@\S+\.\S+$/.test(email) && modo && (modo === 'completo' || sesion !== null) && importe != null;

  async function pagar() {
    setError('');
    setCargando(true);
    try {
      setClientSecret(await crearPago({ tipo: 'curso', slug: curso.slug, moneda, nombre, email, modo, sesion, respuesta }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="paso">
      <h2>Inscripción</h2>
      <div className="campos">
        <div className="campo">
          <label htmlFor="nombre">Tu nombre *</label>
          <input id="nombre" autoComplete="name" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="email">Tu correo *</label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {porSesion && (
          <fieldset className="campo">
            <legend>¿A cuántas sesiones vienes? *</legend>
            <div className="opciones">
              <button type="button" className="opcion" aria-pressed={modo === 'completo'} onClick={() => { setModo('completo'); setSesion(null); }}>
                Curso completo
              </button>
              <button type="button" className="opcion" aria-pressed={modo === 'sesion'} onClick={() => setModo('sesion')}>
                Una sesión
              </button>
            </div>
          </fieldset>
        )}

        {modo === 'sesion' && curso.sesiones && (
          <fieldset className="campo">
            <legend>Si tu respuesta fue «una sesión», ¿cuál?</legend>
            <div className="opciones opciones-columna">
              {curso.sesiones.map((x, i) => (
                <button key={i} type="button" className="opcion" aria-pressed={sesion === i} onClick={() => setSesion(i)}>
                  Sesión {i + 1}: {formatear(x.titulo)}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {curso.pregunta && (
          <div className="campo">
            <label htmlFor="respuesta">{curso.pregunta}</label>
            <textarea id="respuesta" rows={4} maxLength={450} value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
          </div>
        )}
      </div>

      <h2 style={{ marginTop: 22 }}>Moneda</h2>
      <SelectorMoneda precios={precios} moneda={moneda} onChange={setMoneda} />
      {error && <p className="aviso" role="alert">{error}</p>}
      <div className="total">
        <strong>{importe != null ? formatearPrecio(importe, moneda) : ''}</strong>
        <button className="boton" disabled={!listo || cargando || !pagosActivos} onClick={pagar}>
          {cargando ? 'Preparando…' : 'Ir al pago'}
        </button>
      </div>
      {!pagosActivos && <p className="nota">El pago online se activará en unos días.</p>}
    </div>
  );
}
