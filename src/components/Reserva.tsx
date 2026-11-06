'use client';

import { useEffect, useMemo, useState } from 'react';
import { agenda, nombreZona, type Region, regionPorZona, regiones, zonaDeAgenda } from '@/config/agenda';
import type { Modalidad, Moneda, Servicio } from '@/content/tipos';
import { formatearPrecio } from '@/lib/precios';
import { diaSemana, fechaEnZona, formatearHora, sumarDias } from '@/lib/tiempo';
import { DatosCliente, datosVacios, SelectorMoneda } from './DatosCliente';
import { crearPago, PagoEmbebido, pagosActivos } from './PagoEmbebido';

type Hueco = { inicio: string; fin: string };

function dias(tz: string) {
  const hoy = fechaEnZona(new Date(), tz);
  return Array.from({ length: agenda.diasMaxAdelante + 1 }, (_, i) => sumarDias(hoy, i));
}
const tieneHorario = (f: string, region: Region) =>
  (regiones[region].horario[diaSemana(f)] ?? []).length > 0 && !agenda.diasBloqueados.includes(f);
const franjas = (region: Region) =>
  [...new Set(Object.values(regiones[region].horario).flat().map(([a, b]) => `${a}–${b}`))].join(', ');
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
  // Zona horaria de quien reserva → agenda de Europa o de Colombia (se puede cambiar).
  const [tzLocal, setTzLocal] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>('europa');
  useEffect(() => {
    const zona = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTzLocal(zona);
    setRegion(regionPorZona(zona));
  }, []);
  // Europa: hora de Madrid. América: la hora de quien reserva (o la de Colombia si no está en América).
  const tz = zonaDeAgenda(region, tzLocal);
  const etiqueta = tz === tzLocal ? 'tu hora' : nombreZona(tz);
  const cambiarRegion = (r: Region) => { setRegion(r); setFecha(null); setHueco(null); setError(''); };

  // Días con algún hueco para esta lectura: los demás (llenos, fines de semana…) se ven bloqueados.
  const [diasLibres, setDiasLibres] = useState<Set<string> | null>(null);
  useEffect(() => {
    if (!tzLocal) return;
    let vivo = true;
    setDiasLibres(null);
    fetch(`/api/disponibilidad?servicio=${servicio.slug}&region=${region}&zona=${encodeURIComponent(tz)}&dias=1`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => vivo && setDiasLibres(new Set(j.dias ?? [])))
      .catch(() => vivo && setDiasLibres(new Set(dias(tz).filter((d) => tieneHorario(d, region))))); // si falla, solo el horario
    return () => { vivo = false; };
  }, [servicio.slug, region, tz, tzLocal, recarga]);

  // Agrupa los días por mes, con huecos al inicio para alinear con lunes.
  const meses = useMemo(() => {
    const grupos = new Map<string, (string | null)[]>();
    for (const d of dias(tz)) {
      const k = d.slice(0, 7);
      if (!grupos.has(k)) grupos.set(k, Array((diaSemana(d) + 6) % 7).fill(null));
      grupos.get(k)!.push(d);
    }
    return [...grupos.values()];
  }, [tz]);

  useEffect(() => {
    if (!fecha) return;
    let vivo = true;
    setHuecos(null);
    fetch(`/api/disponibilidad?servicio=${servicio.slug}&fecha=${fecha}&region=${region}&zona=${encodeURIComponent(tz)}`)
      .then((r) => r.json())
      .then((j) => vivo && setHuecos(j.huecos ?? []))
      .catch(() => vivo && setHuecos([]));
    return () => { vivo = false; };
  }, [fecha, servicio.slug, region, tz, recarga]);

  const listo = modalidad && hueco && datos.nombre.trim() && /^\S+@\S+\.\S+$/.test(datos.email);

  async function pagar() {
    setError('');
    setCargando(true);
    try {
      setClientSecret(await crearPago({ tipo: 'servicio', slug: servicio.slug, modalidad, region, zona: tz, inicio: hueco!.inicio, moneda, ...datos }));
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
          {formatearHora(hueco!.inicio, tz)} h ({etiqueta}){' '}
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
        <div className="zona">
          <p className="nota">Horarios para:</p>
          <div className="opciones" role="group" aria-label="Zona horaria de la agenda">
            {(Object.keys(regiones) as Region[]).map((r) => (
              <button key={r} type="button" className="opcion" aria-pressed={region === r} onClick={() => cambiarRegion(r)}>
                {regiones[r].nombre}
                <small style={{ display: 'block', fontSize: '.8rem', opacity: .8 }}>
                  {regiones[r].franja}: {franjas(r)} · {regiones[r].horaDeQuienReserva ? (tzLocal?.startsWith('America/') ? 'tu hora' : nombreZona(regiones[r].zonaHoraria)) : nombreZona(regiones[r].zonaHoraria)}
                </small>
              </button>
            ))}
          </div>
        </div>
        {diasLibres === null && <p className="nota">Consultando los días disponibles…</p>}
        {diasLibres?.size === 0 && <p className="nota">No quedan días libres para esta lectura en las próximas semanas.</p>}
        {meses.map((celdas, i) => (
          <div key={i}>
            <p className="mes">{nombreMes(celdas.find(Boolean)!)}</p>
            <div className="dias">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => <span key={d} className="dia-semana">{d}</span>)}
              {celdas.map((d, j) =>
                d ? (
                  <button key={d} type="button" className="opcion" disabled={!diasLibres?.has(d)} aria-pressed={fecha === d} onClick={() => { setFecha(d); setHueco(null); }}>
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
          <h2><span>3</span>Elige la hora <small className="nota">({etiqueta})</small></h2>
          {huecos === null ? <p className="nota">Consultando la agenda…</p>
            : huecos.length === 0 ? <p className="nota">No quedan huecos este día. Prueba con otro.</p>
            : (
              <div className="opciones">
                {huecos.map((h) => (
                  <button key={h.inicio} type="button" className="opcion" aria-pressed={hueco?.inicio === h.inicio} onClick={() => setHueco(h)}>
                    {formatearHora(h.inicio, tz)}
                    {tzLocal && tzLocal !== tz && <small style={{ display: 'block', fontSize: '.8rem', opacity: .75 }}>tu hora {formatearHora(h.inicio, tzLocal!)}</small>}
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
