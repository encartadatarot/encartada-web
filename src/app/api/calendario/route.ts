import { NextResponse } from 'next/server';
import { calendarioConectado, eventosOcupados } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

/** Diagnóstico: ¿está conectado Google Calendar y se puede leer? (No muestra eventos.) */
export async function GET() {
  if (!calendarioConectado()) {
    return NextResponse.json({ conectado: false, mensaje: 'Faltan GOOGLE_CALENDAR_ID o una clave válida en GOOGLE_SERVICE_ACCOUNT_JSON.', clave: revisarClave() });
  }
  try {
    const ahora = new Date();
    const eventos = await eventosOcupados(ahora, new Date(ahora.getTime() + 7 * 86400000));
    return NextResponse.json({ conectado: true, lectura: 'ok', eventosProximos7Dias: eventos.length });
  } catch (e) {
    const msg = (e as Error).message;
    const pista = /\(404\)/.test(msg) ? 'El calendario no está compartido con la cuenta de servicio, o GOOGLE_CALENDAR_ID no es correcto.'
      : /\(40[13]\)|rechazó/.test(msg) ? 'La cuenta de servicio no tiene permiso, o la clave no es válida. Revisa que compartiste el calendario con «Hacer cambios en eventos».'
      : 'Error al conectar con Google.';
    return NextResponse.json({ conectado: true, lectura: 'error', mensaje: pista }, { status: 500 });
  }
}

/** Describe la forma de la clave sin mostrar ningún valor secreto. */
function revisarClave() {
  const v = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!v) return { presente: false, calendario: Boolean(process.env.GOOGLE_CALENDAR_ID) };
  const base = { presente: true, calendario: Boolean(process.env.GOOGLE_CALENDAR_ID), caracteres: v.length, empiezaCon: v.trim().slice(0, 1), terminaCon: v.trim().slice(-1) };
  try {
    const j = JSON.parse(v);
    if (typeof j !== 'object' || j === null) return { ...base, esJSON: true, esObjeto: false };
    return {
      ...base,
      esJSON: true,
      tipo: typeof j.type === 'string' ? j.type : null, // debe ser "service_account"
      camposPrincipales: Object.keys(j).slice(0, 12),
      tieneClientEmail: typeof j.client_email === 'string',
      tienePrivateKey: typeof j.private_key === 'string' && j.private_key.includes('PRIVATE KEY'),
    };
  } catch {
    return { ...base, esJSON: false };
  }
}
