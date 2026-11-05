'use client';

import { useState } from 'react';
import type { Curso, Moneda } from '@/content/tipos';
import { formatearPrecio } from '@/lib/precios';
import { DatosCliente, datosVacios, SelectorMoneda } from './DatosCliente';
import { crearPago, PagoEmbebido, pagosActivos } from './PagoEmbebido';

export function Compra({ curso }: { curso: Curso }) {
  const [moneda, setMoneda] = useState<Moneda>((Object.keys(curso.precios)[0] as Moneda) ?? 'eur');
  const [datos, setDatos] = useState(datosVacios);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Sin precio publicado → solo el aviso (inscripciones cerradas, próxima edición…).
  if (!Object.keys(curso.precios).length) {
    return curso.aviso ? <p className="aviso centro">{curso.aviso}</p> : null;
  }
  if (clientSecret) return <PagoEmbebido clientSecret={clientSecret} />;

  const listo = datos.nombre.trim() && /^\S+@\S+\.\S+$/.test(datos.email);
  return (
    <div className="paso">
      <h2>Inscripción</h2>
      <DatosCliente datos={datos} onChange={setDatos} conNotas={false} />
      <h2 style={{ marginTop: 22 }}>Moneda</h2>
      <SelectorMoneda precios={curso.precios} moneda={moneda} onChange={setMoneda} />
      {error && <p className="aviso" role="alert">{error}</p>}
      <div className="total">
        <strong>{formatearPrecio(curso.precios[moneda]!, moneda)}</strong>
        <button
          className="boton"
          disabled={!listo || cargando || !pagosActivos}
          onClick={async () => {
            setError(''); setCargando(true);
            try { setClientSecret(await crearPago({ tipo: 'curso', slug: curso.slug, moneda, ...datos })); }
            catch (e) { setError((e as Error).message); }
            finally { setCargando(false); }
          }}
        >
          {cargando ? 'Preparando…' : 'Ir al pago'}
        </button>
      </div>
      {!pagosActivos && <p className="nota">El pago online se activará en unos días.</p>}
    </div>
  );
}
