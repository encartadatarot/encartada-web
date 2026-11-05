import 'server-only';

/** Envía un email con Resend si está configurado (RESEND_API_KEY). Si no, no hace nada. */
export async function enviarEmail(para: string, asunto: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const de = process.env.EMAIL_REMITENTE;
  if (!key || !de || !para) return;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: de, to: [para], subject: asunto, html }),
  });
  if (!r.ok) console.error('Error enviando email', r.status, await r.text());
}
