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
    // Código de error de Google (p. ej. accessNotConfigured, invalid_grant, notFound): no contiene datos secretos.
    const codigo = msg.match(/"reason":\s*"([^"]+)"/)?.[1] ?? msg.match(/"error":\s*"([^"]+)"/)?.[1] ?? null;
    const estado = msg.match(/\((\d{3})\)/)?.[1] ?? null;
    const enToken = /rechazó/.test(msg);
    const explicacion: Record<string, string> = {
      accessNotConfigured: 'La Google Calendar API no está habilitada en el proyecto de Google Cloud (Parte 2).',
      SERVICE_DISABLED: 'La Google Calendar API no está habilitada en el proyecto de Google Cloud (Parte 2).',
      notFound: 'El calendario no está compartido con la cuenta de servicio (Parte 5).',
      forbidden: 'El calendario está compartido, pero sin el permiso «Hacer cambios en eventos» (Parte 5).',
      invalid_grant: 'Google no acepta la clave: puede que se borrara en Google Cloud o que el reloj no cuadre.',
    };
    return NextResponse.json(
      { conectado: true, lectura: 'error', mensaje: (codigo && explicacion[codigo]) || pista, detalle: { paso: enToken ? 'clave' : 'calendario', estado, codigo } },
      { status: 500 },
    );
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
