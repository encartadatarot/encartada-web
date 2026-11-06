import 'server-only';
import { createHash, createSign } from 'node:crypto';
import { horaLocalAUtc } from './tiempo';

/**
 * Conexión con tu Google Calendar mediante una cuenta de servicio de Google
 * (ver «Conectar Google Calendar» en el README). Variables de entorno:
 *
 * - GOOGLE_CALENDAR_ID: el calendario (p. ej. encartada.tarot@gmail.com).
 * - GOOGLE_SERVICE_ACCOUNT_JSON: el contenido completo del archivo .json de la cuenta de servicio.
 *   (o, por separado, GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_PRIVATE_KEY).
 *
 * Si faltan, la web funciona igual, sin leer ni escribir en el calendario.
 */

type Credenciales = { email: string; clave: string };

function credenciales(): Credenciales | null {
  try {
    const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (json) {
      const j = JSON.parse(json);
      if (j.client_email && j.private_key) return { email: j.client_email, clave: j.private_key };
    }
  } catch {
    console.error('GOOGLE_SERVICE_ACCOUNT_JSON no es un JSON válido');
  }
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const clave = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  return email && clave ? { email, clave } : null;
}

const calendarioId = () => process.env.GOOGLE_CALENDAR_ID;
export const calendarioConectado = () => Boolean(calendarioId() && credenciales());

const b64url = (s: string | Buffer) => Buffer.from(s).toString('base64url');
// Solo para pruebas locales: permiten apuntar a un servidor falso en lugar de Google.
const URL_TOKEN = process.env.GOOGLE_TOKEN_URL_PRUEBAS ?? 'https://oauth2.googleapis.com/token';
const URL_API = process.env.GOOGLE_API_URL_PRUEBAS ?? 'https://www.googleapis.com/calendar/v3';

let token: { valor: string; hasta: number } | null = null;

/** Token de acceso de Google (JWT firmado con la clave de la cuenta de servicio). */
async function accessToken(): Promise<string> {
  if (token && token.hasta > Date.now() + 60_000) return token.valor;
  const c = credenciales();
  if (!c) throw new Error('Google Calendar no está configurado');
  const ahora = Math.floor(Date.now() / 1000);
  const cabecera = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const cuerpo = b64url(JSON.stringify({
    iss: c.email,
    scope: 'https://www.googleapis.com/auth/calendar.events',
    aud: 'https://oauth2.googleapis.com/token',
    iat: ahora,
    exp: ahora + 3600,
  }));
  const firma = createSign('RSA-SHA256').update(`${cabecera}.${cuerpo}`).sign(c.clave, 'base64url');
  const r = await fetch(URL_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${cabecera}.${cuerpo}.${firma}` }),
  });
  if (!r.ok) throw new Error(`Google rechazó la cuenta de servicio (${r.status}): ${await r.text()}`);
  const j = await r.json();
  token = { valor: j.access_token, hasta: Date.now() + j.expires_in * 1000 };
  return token.valor;
}

async function google(ruta: string, init: RequestInit = {}) {
  return fetch(`${URL_API}/calendars/${encodeURIComponent(calendarioId()!)}${ruta}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json', ...init.headers },
  });
}

export type Ocupado = { inicio: number; fin: number; deLaWeb: boolean };

/**
 * Eventos de tu calendario entre dos fechas, como intervalos ocupados.
 * No cuentan los marcados como «Disponible» ni los que hayas rechazado.
 * `deLaWeb` marca los eventos creados por la propia web (esas citas ya se cuentan desde Stripe).
 */
export async function eventosOcupados(desde: Date, hasta: Date): Promise<Ocupado[]> {
  if (!calendarioConectado()) return [];
  const ocupados: Ocupado[] = [];
  let pageToken: string | undefined;
  do {
    const q = new URLSearchParams({
      timeMin: desde.toISOString(), timeMax: hasta.toISOString(), singleEvents: 'true', maxResults: '250',
      fields: 'nextPageToken,items(status,transparency,start,end,attendees(self,responseStatus),extendedProperties/private)',
      ...(pageToken ? { pageToken } : {}),
    });
    const r = await google(`/events?${q}`);
    if (!r.ok) throw new Error(`No se pudo leer Google Calendar (${r.status}): ${await r.text()}`);
    const j = await r.json();
    for (const e of j.items ?? []) {
      if (e.status === 'cancelled' || e.transparency === 'transparent') continue;
      if (e.attendees?.some((a: { self?: boolean; responseStatus?: string }) => a.self && a.responseStatus === 'declined')) continue;
      // Eventos de día completo: usan `date` (AAAA-MM-DD); se toman en hora de Madrid.
      const inicio = e.start?.dateTime ? Date.parse(e.start.dateTime) : e.start?.date ? +horaLocalAUtc(e.start.date, '00:00', 'Europe/Madrid') : NaN;
      const fin = e.end?.dateTime ? Date.parse(e.end.dateTime) : e.end?.date ? +horaLocalAUtc(e.end.date, '00:00', 'Europe/Madrid') : NaN;
      if (Number.isNaN(inicio) || Number.isNaN(fin)) continue;
      ocupados.push({ inicio, fin, deLaWeb: Boolean(e.extendedProperties?.private?.encartada) });
    }
    pageToken = j.nextPageToken;
  } while (pageToken);
  return ocupados;
}

const idEvento = (referencia: string) => createHash('sha256').update(referencia).digest('hex').slice(0, 40); // Google admite [a-v0-9]

/** Borra el evento creado para una referencia (se usa en la prueba de conexión). */
export async function borrarEvento(referencia: string): Promise<void> {
  if (!calendarioConectado()) return;
  const r = await google(`/events/${idEvento(referencia)}`, { method: 'DELETE' });
  if (!r.ok && r.status !== 404 && r.status !== 410) throw new Error(`No se pudo borrar el evento (${r.status}): ${await r.text()}`);
}

/**
 * Crea en tu calendario el evento de una cita pagada. Usa un id fijo derivado del pago,
 * así que si Stripe avisa dos veces no se duplica.
 */
export async function crearEventoCita(cita: {
  referencia: string; titulo: string; descripcion: string; inicio: string; fin: string; ubicacion?: string;
}): Promise<void> {
  if (!calendarioConectado()) return;
  const id = idEvento(cita.referencia);
  const r = await google('/events', {
    method: 'POST',
    body: JSON.stringify({
      id,
      summary: cita.titulo,
      description: cita.descripcion,
      location: cita.ubicacion,
      start: { dateTime: cita.inicio, timeZone: 'Europe/Madrid' },
      end: { dateTime: cita.fin, timeZone: 'Europe/Madrid' },
      extendedProperties: { private: { encartada: cita.referencia } },
      reminders: { useDefault: true },
    }),
  });
  if (r.status === 409) return; // ya existía
  if (!r.ok) throw new Error(`No se pudo crear el evento en Google Calendar (${r.status}): ${await r.text()}`);
}
