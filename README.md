# en_cartada · web

Web de **en_cartada** (tarot, sueños y astrología), migrada desde Canva a **Next.js** para publicarla en **Vercel**.

- Mantiene tu estética: fondo negro, Cormorant Garamond + letra gótica, un color por lectura y tus collages de cartas.
- **Reservas con pago dentro de la web**: la clienta elige modalidad, día y hora, y paga con Stripe sin salir de la página (tarjeta, Apple Pay, Google Pay). Monedas: EUR, USD y COP.
- **Preparada para crecer**: cursos, grabaciones y recursos se añaden editando un archivo, sin tocar el diseño.
- Todo se resuelve en la web, sin WhatsApp: la clienta elige lectura, fecha y hora, y paga. Mientras Stripe no esté configurado, el calendario se ve pero el botón de pago queda desactivado.
- La integración con WhatsApp queda para más adelante (el número sigue en `src/config/sitio.ts`).

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

1. `/api/disponibilidad` calcula los huecos libres a partir de `src/config/agenda.ts`, quitando las citas ya pagadas. Hay dos agendas: **Europa**, mañana y tarde (9:00-12:00 y 14:00-19:00, hora de Madrid), y **América**, las mañanas de cada persona (8:00-12:00 en su hora local; si no está en América, hora de Colombia). El calendario muestra la de la zona horaria de quien reserva y se puede cambiar con un selector. La pausa de 12:00 a 14:00 (hora de Madrid) se respeta en las dos agendas. Las citas empiezan solo a horas en punto, hay un máximo de 4 horas de citas por día (en hora de Madrid, sumando las dos agendas) y el calendario bloquea los días que ya no tienen hueco para esa lectura. Una cita en una agenda bloquea ese momento en la otra.
2. `/api/checkout` vuelve a comprobar que el hueco sigue libre y crea un pago de Stripe embebido (el hueco queda guardado 30 min).
3. Las citas pagadas se guardan en los metadatos del pago en Stripe (fecha, hora, modalidad, datos de la clienta). Así no hace falta otra base de datos: todas tus reservas aparecen en el panel de Stripe.
4. `/api/stripe/webhook` recibe la confirmación y, si configuras Resend, te envía un aviso a ti y la confirmación a la clienta.

Las citas que no vengan de la web se bloquean solas si están en tu Google Calendar (o a mano en `agenda.ocupadoManual`).

## Conectar Google Calendar

La web lee tu Google Calendar (cualquier evento bloquea ese horario y cuenta para el máximo de 4 horas al día; los marcados como «Disponible» no) y apunta en él cada cita pagada.

Se conecta con una **cuenta de servicio**: una cuenta técnica de Google con la que compartes tu calendario. Se crea una vez:

1. Entra en [console.cloud.google.com](https://console.cloud.google.com) con encartada.tarot@gmail.com y crea un proyecto (por ejemplo «encartada-web»).
2. En *APIs y servicios → Biblioteca*, busca **Google Calendar API** y pulsa **Habilitar**.
3. En *IAM y administración → Cuentas de servicio*, pulsa **Crear cuenta de servicio**. Ponle un nombre (por ejemplo «reservas-web») y pulsa **Listo**; no hace falta darle roles.
4. Abre la cuenta creada → pestaña **Claves** → *Agregar clave → Crear clave nueva → JSON*. Se descarga un archivo `.json`. Guárdalo bien: es una contraseña.
5. Copia el email de la cuenta de servicio (termina en `.iam.gserviceaccount.com`).
6. En Google Calendar → *Configuración* → tu calendario **encartada.tarot@gmail.com** → *Compartir con determinadas personas* → añade ese email con el permiso **«Hacer cambios en eventos»**.
7. En Vercel → proyecto *encartada-web* → *Settings → Environment Variables*, crea `GOOGLE_SERVICE_ACCOUNT_JSON` y pega como valor **todo el contenido** del archivo `.json`. (`GOOGLE_CALENDAR_ID` ya está puesto.)
8. Vuelve a publicar y abre `https://TU-DOMINIO/api/calendario`: debe decir `"lectura":"ok"`.

Si Google falla, la web sigue funcionando con las citas de Stripe y el error queda en el registro de Vercel. Para que los eventos de tu calendario no cuenten en el máximo diario (solo bloqueen su horario), pon `eventosDeGoogleCuentanEnMaximo: false` en `src/config/agenda.ts`.

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

## Contenido

Los textos, precios y nombres salen del repositorio de la práctica, [`encartadatarot/encartada`](https://github.com/encartadatarot/encartada) (`oferta/`, `identidad/`). Sus reglas aplican aquí:

- Las palabras de Camila se copian tal cual, sin las erratas de la web de Canva.
- No se inventan textos, precios ni fechas.
- Lo marcado **[por confirmar]** en ese repositorio no se publica (queda comentado en el código).

Cuando cambie algo en `oferta/`, hay que llevarlo a `src/content/`.

## Pendiente (no publicado hasta confirmarlo)

- [ ] **El tropo**: número de cartas (9 en la web, 8 en el PDF 2023). Ahora se muestra solo la duración.
- [ ] **Astrología**: precios en COP (la web pone "400.00"). Ahora solo se muestran EUR y USD.
- [ ] **Los puntos cardinales del tarot**: oculto porque las inscripciones están cerradas. Para la próxima edición falta confirmar el precio (1.800.000 COP en Canva frente a 300.000 COP en la web).
- [ ] **El revés de Saturno**: el flyer escribe «17 de enero, 2026»; corregir el año en Canva y volver a subir la imagen.
- [ ] Ciclo de iniciación, Hacia el otro lado, Tarot para tarotistas: faltan datos o están en curso.
- [ ] Grafía de la marca (en_cartada / en cartada) y logo original.
- [ ] Confirmar los días de atención (ahora, de lunes a viernes en las dos agendas) en `src/config/agenda.ts`.
- [ ] Imágenes para las lecturas que aún no tienen collage (sueños, grupales, temporada, astrología).
- [ ] Crear la cuenta de servicio de Google y poner `GOOGLE_SERVICE_ACCOUNT_JSON` en Vercel (ver «Conectar Google Calendar»).
- [ ] Más adelante: área privada con acceso a los cursos y grabaciones.
