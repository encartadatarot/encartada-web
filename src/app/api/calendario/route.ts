import { NextResponse } from 'next/server';
import { calendarioConectado, eventosOcupados } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

/** Diagnóstico: ¿está conectado Google Calendar y se puede leer? (No muestra eventos.) */
export async function GET() {
  if (!calendarioConectado()) {
    return NextResponse.json({ conectado: false, mensaje: 'Faltan GOOGLE_CALENDAR_ID y GOOGLE_SERVICE_ACCOUNT_JSON en Vercel.' });
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
