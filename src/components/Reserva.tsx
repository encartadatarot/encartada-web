'use client';

import { useEffect, useMemo, useState } from 'react';
import { agenda } from '@/config/agenda';
import type { Modalidad, Moneda, Servicio } from '@/content/tipos';
import { formatearPrecio } from '@/lib/precios';
import { diaSemana, fechaEnZona, formatearHora, sumarDias } from '@/lib/tiempo';
import { DatosCliente, datosVacios, SelectorMoneda } from './DatosCliente';
import { crearPago, PagoEmbebido, pagosActivos } from './PagoEmbebido';

const tz = agenda.zonaHoraria;
type Hueco = { inicio: string; fin: string };

function dias() {
  const hoy = fechaEnZona(new Date(), tz);
  return Array.from({ length: agenda.diasMaxAdelante + 1 }, (_, i) => sumarDias(hoy, i));
}
const tieneHorario = (f: string) => (agenda.horario[diaSemana(f)] ?? []).length > 0 && !agenda.diasBloqueados.includes(f);
const nombreMes = (f: string) => new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(f + 'T12:00:00Z'));

export function Reserva({ servicio }: { servicio: Servicio }) {
  const [modalidad, setModalidad] = useState<Modalidad | null>(servicio.modalidades.length === 1 ? servicio.modalidades[0] : null);
  const [fecha, setFecha] = useState<string | null>(null);
  const [huecos, setHuecos] = useState<Hueco[] | null>(null);
  const [hueco, setHueco] = useState<Hueco | null>(null);
  const [moneda, setMoneda] = useState<Moneda>((Object.keys(servicio.precios)[0] as Moneda) ?? 'eur');
  const [datos, setDatos] = useState(datosVacios);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [recarga, setRecarga] = useState(0);
  const tzLocal = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  // Agrupa los días por mes, con huecos al inicio para alinear con lunes.
  const meses = useMemo(() => {
    const grupos = new Map<string, (string | null)[]>();
    for (const d of dias()) {
      const k = d.slice(0, 7);
      if (!grupos.has(k)) grupos.set(k, Array((diaSemana(d) + 6) % 7).fill(null));
      grupos.get(k)!.push(d);
    }
    return [...grupos.values()];
  }, []);

  useEffect(() => {
    if (!fecha) return;
    let vivo = true;
    setHuecos(null);
    fetch(`/api/disponibilidad?servicio=${servicio.slug}&fecha=${fecha}`)
      .then((r) => r.json())
      .then((j) => vivo && setHuecos(j.huecos ?? []))
      .catch(() => vivo && setHuecos([]));
    return () => { vivo = false; };
  }, [fecha, servicio.slug, recarga]);

  const listo = modalidad && hueco && datos.nombre.trim() && /^\S+@\S+\.\S+$/.test(datos.email);

  async function pagar() {
    setError('');
    setCargando(true);
    try {
      setClientSecret(await crearPago({ tipo: 'servicio', slug: servicio.slug, modalidad, inicio: hueco!.inicio, moneda, ...datos }));
    } catch (e) {
      setError((e as Error).message);
      setHueco(null);
      setRecarga((n) => n + 1); // vuelve a consultar los huecos libres
    } finally {
      setCargando(false);
    }
  }

  if (clientSecret) {
    return (
      <>
        <div className="aviso">
          {servicio.nombre} · {modalidad === 'virtual' ? 'Virtual' : 'Presencial (Madrid)'} ·{' '}
          {new Intl.DateTimeFormat('es-ES', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(hueco!.inicio))},{' '}
          {formatearHora(hueco!.inicio, tz)} h{' '}
          <button className="opcion boton-chico" style={{ marginLeft: 8 }} onClick={() => setClientSecret(null)}>Cambiar</button>
        </div>
        <PagoEmbebido clientSecret={clientSecret} />
      </>
    );
  }

  return (
    <div>
      {servicio.modalidades.length > 1 && (
        <div className="paso">
          <h2><span>1</span>¿Cómo prefieres la sesión?</h2>
          <div className="opciones">
            {servicio.modalidades.map((m) => (
              <button key={m} type="button" className="opcion" aria-pressed={modalidad === m} onClick={() => setModalidad(m)}>
                {m === 'virtual' ? 'Virtual (videollamada)' : 'Presencial en Madrid'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="paso">
        <h2><span>2</span>Elige el día</h2>
        {meses.map((celdas, i) => (
          <div key={i}>
            <p className="mes">{nombreMes(celdas.find(Boolean)!)}</p>
            <div className="dias">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <span key={d} className="dia-semana">{d}</span>)}
              {celdas.map((d, j) =>
                d ? (
                  <button key={d} type="button" className="opcion" disabled={!tieneHorario(d)} aria-pressed={fecha === d} onClick={() => { setFecha(d); setHueco(null); }}>
                    {+d.slice(8)}
                  </button>
                ) : <span key={`v${j}`} />,
              )}
            </div>
          </div>
        ))}
      </div>

      {fecha && (
        <div className="paso">
          <h2><span>3</span>Elige la hora <small className="nota">(hora de Madrid)</small></h2>
          {huecos === null ? <p className="nota">Consultando la agenda…</p>
            : huecos.length === 0 ? <p className="nota">No quedan huecos este día. Prueba con otro.</p>
            : (
              <div className="opciones">
                {huecos.map((h) => (
                  <button key={h.inicio} type="button" className="opcion" aria-pressed={hueco?.inicio === h.inicio} onClick={() => setHueco(h)}>
                    {formatearHora(h.inicio, tz)}
                    {tzLocal !== tz && <small style={{ display: 'block', fontSize: '.8rem', opacity: .75 }}>tu hora {formatearHora(h.inicio, tzLocal)}</small>}
                  </button>
                ))}
              </div>
            )}
        </div>
      )}

      {error && <p className="aviso" role="alert">{error}</p>}

      {hueco && (
        <div className="paso">
          <h2><span>4</span>Tus datos</h2>
          <DatosCliente datos={datos} onChange={setDatos} />
          <h2 style={{ marginTop: 22 }}>Moneda</h2>
          <SelectorMoneda precios={servicio.precios} moneda={moneda} onChange={setMoneda} />
          <div className="total">
            <strong>{formatearPrecio(servicio.precios[moneda]!, moneda)}</strong>
            <button className="boton" disabled={!listo || cargando || !pagosActivos} onClick={pagar}>{cargando ? 'Preparando…' : 'Ir al pago'}</button>
          </div>
          <p className="nota">
            {pagosActivos ? 'Pago seguro con Stripe. Recibirás la confirmación por email.' : 'El pago online se activará en unos días.'}
          </p>
        </div>
      )}
    </div>
  );
}
