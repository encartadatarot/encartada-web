'use client';

import { useState } from 'react';
import { enlaceWhatsapp, sitio } from '@/config/sitio';
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

  if (!pagosActivos) {
    return (
      <a className="boton" href={enlaceWhatsapp(`Hola ${sitio.autora}, quiero información de ${curso.titulo}`)} target="_blank" rel="noreferrer">
        Quiero apuntarme
      </a>
    );
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
          disabled={!listo || cargando}
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
    </div>
  );
}
