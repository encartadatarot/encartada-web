import { NextResponse } from 'next/server';
import { borrarEvento, calendarioConectado, crearEventoCita, eventosOcupados } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

/** Diagnóstico: ¿está conectado Google Calendar y se puede leer? (No muestra eventos.) */
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('prueba') === 'escritura') return pruebaEscritura(url.searchParams.get('token'));
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

/**
 * Prueba de escritura: crea un evento «Prueba de conexión» y lo borra enseguida.
 * Solo funciona si existe PRUEBA_CALENDARIO_TOKEN en Vercel y se pasa ese mismo token.
 */
async function pruebaEscritura(token: string | null) {
  const esperado = process.env.PRUEBA_CALENDARIO_TOKEN;
  if (!esperado || token !== esperado) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const referencia = `prueba-${Date.now()}`;
  const inicio = new Date(Date.now() + 2 * 86400000);
  inicio.setUTCHours(22, 0, 0, 0); // 23:00 en Madrid aprox., fuera de tu horario de citas
  try {
    await crearEventoCita({
      referencia,
      titulo: 'Prueba de conexión de la web (se borra sola)',
      descripcion: 'Evento de prueba creado por encartada-web. Se borra automáticamente.',
      inicio: inicio.toISOString(),
      fin: new Date(inicio.getTime() + 15 * 60000).toISOString(),
    });
  } catch (e) {
    const msg = (e as Error).message;
    return NextResponse.json({ escritura: 'error', estado: msg.match(/\((\d{3})\)/)?.[1] ?? null, codigo: msg.match(/"reason":\s*"([^"]+)"/)?.[1] ?? null }, { status: 500 });
  }
  try {
    await borrarEvento(referencia);
    return NextResponse.json({ escritura: 'ok', creado: true, borrado: true });
  } catch {
    return NextResponse.json({ escritura: 'ok', creado: true, borrado: false, aviso: 'Se creó pero no se pudo borrar: bórralo a mano.' });
  }
}
