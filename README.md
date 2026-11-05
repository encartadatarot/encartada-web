# en_cartada · web

Web de **en_cartada** (tarot, sueños y astrología), migrada desde Canva a **Next.js** para publicarla en **Vercel**.

- Mantiene tu estética: fondo negro, Cormorant Garamond + letra gótica, un color por lectura y tus collages de cartas.
- **Reservas con pago dentro de la web**: la clienta elige modalidad, día y hora, y paga con Stripe sin salir de la página (tarjeta, Apple Pay, Google Pay). Monedas: EUR, USD y COP.
- **Preparada para crecer**: cursos, grabaciones y recursos se añaden editando un archivo, sin tocar el diseño.
- Si Stripe no está configurado, los botones llevan a WhatsApp, así que la web funciona desde el primer día.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Lecturas (texto, precio, duración, imagen) | `src/content/servicios.ts` |
| Categorías (sueños, tarot individual, astrología…) | `src/content/categorias.ts` |
| Cursos y grabaciones | `src/content/cursos.ts` |
| Recursos gratuitos | `src/content/recursos.ts` |
| Horario, días libres, antelación, descansos | `src/config/agenda.ts` |
| WhatsApp, Instagram, email, menú | `src/config/sitio.ts` |
| Colores y tipografía | `src/app/globals.css` |
| Imágenes | `public/img/…` |

Formato de los textos: `**negrita**`, `_cursiva_`, `==color de la lectura==`. Cada elemento de la lista es un párrafo.

Para publicar una lectura o curso nuevo: copia un bloque, rellena los datos y pon `publicado: true`.

## Páginas

| URL | Contenido |
| --- | --- |
| `/` | Inicio |
| `/oraculos`, `/suenos`, `/tarot`, `/tarot-individual`, `/tarot-grupal`, `/tarot-de-temporada`, `/astrologia` | Oráculos y lecturas |
| `/reservar`, `/reservar/<lectura>` | Calendario y pago |
| `/aprende`, `/cursos`, `/cursos/<curso>`, `/grabaciones`, `/recursos` | Aprende conmigo |
| `/gracias` | Confirmación después del pago |

Las URLs antiguas de Canva (`/orculos`, `/page-6`, …) redirigen a las nuevas (`next.config.mjs`).

## Cómo funcionan las reservas

1. `/api/disponibilidad` calcula los huecos libres a partir de `src/config/agenda.ts`, quitando las citas ya pagadas.
2. `/api/checkout` vuelve a comprobar que el hueco sigue libre y crea un pago de Stripe embebido (el hueco queda guardado 30 min).
3. Las citas pagadas se guardan en los metadatos del pago en Stripe (fecha, hora, modalidad, datos de la clienta). Así no hace falta otra base de datos: todas tus reservas aparecen en el panel de Stripe.
4. `/api/stripe/webhook` recibe la confirmación y, si configuras Resend, te envía un aviso a ti y la confirmación a la clienta.

Las citas que cierres por WhatsApp se pueden bloquear en `agenda.ocupadoManual`.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y rellena las claves
npm run dev                  # http://localhost:3000
```

## Publicar en Vercel

1. Sube este repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio (Vercel detecta Next.js solo).
3. En *Settings → Environment Variables* añade las variables de `.env.example`.
4. En Stripe crea el webhook `https://TU-DOMINIO/api/stripe/webhook` con el evento `checkout.session.completed` y copia su secreto en `STRIPE_WEBHOOK_SECRET`.
5. En *Settings → Domains* conecta tu dominio.

Prueba primero con las claves *test* de Stripe (tarjeta `4242 4242 4242 4242`).

## Pendiente

- [ ] Copiar desde Canva el texto, precio e imagen de: Interpretación de sueños, La Tertulia, La Brújula, Canción Natal, El Ritmo de las Luminarias, La Consonancia, La Disonancia (están en `servicios.ts` con `publicado: false`; confirmar su categoría).
- [ ] Completar los cursos y grabaciones en `cursos.ts`.
- [ ] Revisar el horario real en `agenda.ts`.
- [ ] Revisar los textos de la página de inicio.
- [ ] Más adelante: sincronizar con Google Calendar, área privada con acceso a los cursos.
