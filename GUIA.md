# Pyme en Regla · Guía para publicar en Google Play

App creada por **Mauroblues** · Contacto: **miperrihijo@gmail.com** · Versión 1.0.0
Identificador de la app: `cl.mauroblues.pymeenregla`

Costo total: **US$ 25, una sola vez** (inscripción en Google Play Console). GitHub, GitHub Pages y AdMob son gratuitos. La app no tiene servidores, así que no hay costos mensuales.

---

## Qué hay en esta carpeta

| Carpeta o archivo | Para qué sirve |
|---|---|
| `www/` | La app completa (pantallas, encuesta, informes, anuncios). |
| `www/ads-config.js` | Los ID de tus anuncios AdMob (paso 4). |
| `admob.json` | El ID de tu app en AdMob (paso 4). |
| `assets/` | Ícono y pantalla de inicio; se convierten solos a todos los tamaños de Android. |
| `docs/privacidad.html` | Política de privacidad pública (paso 3). |
| `.github/workflows/android.yml` | Compila el archivo `.aab` para Google Play, gratis, en GitHub. |
| `scripts/configurar-android.mjs` | Ajusta versión, AdMob y nivel de Android (API 36) en cada compilación. |

La **llave de firma** viene aparte (carpeta `llave`). No la subas a GitHub.

---

## Paso 1 · Crear las cuentas (todas con miperrihijo@gmail.com)

1. **GitHub** (gratis): github.com → Sign up. Idealmente usa el usuario **mauroblues**.
2. **AdMob** (gratis): admob.google.com → registrarse. Completa tus datos de pago para recibir lo que generen los anuncios.
3. **Google Play Console** (US$ 25 una vez): play.google.com/console → cuenta **Personal**. Google verificará tu identidad.

## Paso 2 · Subir el proyecto a GitHub

1. En GitHub, botón **New repository** → nombre `pyme-en-regla` → **Public** → Create.
2. **Add file → Upload files** y arrastra el contenido de esta carpeta (todo menos la carpeta `llave`).
3. Commit changes.

## Paso 3 · Publicar la política de privacidad (gratis)

1. En el repositorio: **Settings → Pages**.
2. Source: *Deploy from a branch* · Branch: `main` · Carpeta: `/docs` → Save.
3. En un par de minutos queda en: `https://mauroalcainosa-rgb.github.io/pyme-en-regla/privacidad.html`
4. Si tu usuario de GitHub **no** es `mauroblues`, cambia esa dirección en `www/index.html` (busca `privacidad:`).

## Paso 4 · Configurar los anuncios

1. En AdMob: **Apps → Agregar app → Android → "¿Está publicada?" No** → nombre *Pyme en Regla*.
2. Copia el **ID de la app** (formato `ca-app-pub-XXXX~YYYY`) y pégalo en `admob.json`, en `appId`.
3. Dentro de la app en AdMob, crea **2 bloques de anuncios**:
   - **Banner** (usa banner adaptativo) → copia su ID en `www/ads-config.js`, campo `banner`.
   - **Intersticial** → copia su ID en `www/ads-config.js`, campo `interstitial`.
4. **Importante:** deja `testing: true` mientras dure la prueba cerrada (tus testers verán anuncios de prueba y no arriesgas tu cuenta por clics inválidos). Cámbialo a `testing: false` solo para la versión de producción.
5. Nunca hagas clic en tus propios anuncios reales.

## Paso 5 · Guardar la llave de firma en GitHub

En el repositorio: **Settings → Secrets and variables → Actions → New repository secret**, crea estos tres (los valores están en `llave/LEEME-llave.txt`):

| Nombre | Valor |
|---|---|
| `KEYSTORE_BASE64` | Todo el texto de `llave/KEYSTORE_BASE64.txt` |
| `KEYSTORE_PASSWORD` | La clave indicada en `LEEME-llave.txt` |
| `KEY_ALIAS` | `pymeenregla` |

Guarda también la carpeta `llave` en un lugar seguro (por ejemplo, tu Google Drive privado).

## Paso 6 · Compilar la app

1. Pestaña **Actions → Compilar app Android (Google Play) → Run workflow**.
2. Espera unos 10 minutos hasta el ✓ verde.
3. Entra a la ejecución y descarga **pyme-en-regla-aab** (un .zip con `app-release.aab`).

Cada vez que quieras publicar una actualización: sube los cambios, cambia `version` en `package.json` (por ejemplo `1.0.1`) y vuelve a ejecutar. El número interno de versión sube solo.

## Paso 7 · Crear la app en Google Play Console

1. **Crear app** → Nombre: *Pyme en Regla – Ley de Datos* · Idioma: Español (Latinoamérica) · App · Gratis.
2. **Configuración → Firma de apps**: acepta que Google administre la llave (Play App Signing).
3. Completa **Contenido de la app**:
   - **Política de privacidad**: la URL del paso 3.
   - **Anuncios**: *Sí, la app contiene anuncios*.
   - **ID de publicidad**: sí se usa, para *Publicidad o marketing*.
   - **Acceso a la app**: todas las funciones están disponibles sin acceso especial.
   - **Clasificación de contenido**: completa el cuestionario (categoría Utilidad/Productividad, sin contenido sensible).
   - **Público objetivo**: 18 años o más.
   - **Seguridad de los datos**: ver tabla de abajo.
   - **App gubernamental**: No.
4. **Ficha de Play Store**: textos de abajo + ícono (`assets/icon-only.png`, redúcelo a 512×512) + gráfico de funciones 1024×500 + al menos 2 capturas del teléfono.
5. **Países**: Chile.

### Seguridad de los datos (lo que recopila el SDK de anuncios de Google)

Tú no recopilas datos (todo queda en el teléfono). El SDK de Google Mobile Ads sí recopila y comparte con Google, con fines de **publicidad**, **análisis** y **prevención de fraude**:

| Tipo de dato | Recopilado | Compartido |
|---|---|---|
| Ubicación aproximada (derivada de la IP) | Sí | Sí |
| Interacciones con la app (anuncios) | Sí | Sí |
| Diagnóstico (fallos, rendimiento) | Sí | Sí |
| ID del dispositivo u otros ID (ID de publicidad) | Sí | Sí |

- Datos cifrados en tránsito: **Sí**.
- ¿Los usuarios pueden pedir que se borren?: indica que los datos de la app se borran desde la propia app y que no hay cuentas.
- Verifica esta tabla con la guía oficial de Google: buscar "Google Mobile Ads SDK Play data disclosure".

## Paso 8 · Prueba cerrada obligatoria (cuenta personal)

1. **Pruebas → Prueba cerrada → Crear pista** → sube el `.aab`.
2. Agrega al menos **12 testers** (sus correos Gmail) y compárteles el enlace de participación.
3. Los 12 deben quedar inscritos y usar la app **14 días seguidos**. Pídeles que respondan la encuesta y descarguen un informe.
4. Pasados los 14 días: **Solicitar acceso a producción** y responde las preguntas sobre la prueba.
5. Con el acceso aprobado: cambia `testing: false` en `www/ads-config.js`, sube `version` a `1.0.1`, compila y publica en **Producción**.

## Antes del lanzamiento público

- Haz revisar por un abogado los textos legales de la app (preguntas, referencias ⓘ y plantillas).
- Verifica en INAPI que "Pyme en Regla" esté disponible como marca.
- Para mejorar los ingresos: AdMob recomienda publicar un archivo `app-ads.txt` en el sitio del desarrollador. Se puede hacer gratis creando un repositorio llamado `mauroalcainosa-rgb.github.io`; AdMob te da el contenido exacto del archivo.

---

## Textos para la ficha de Google Play

**Nombre (máx. 30):** Pyme en Regla – Ley de Datos

**Descripción breve (máx. 80):** Diagnostica y corrige el cumplimiento de la Ley 21.719 de datos en tu pyme.

**Descripción completa:**

¿Tu empresa cumple la nueva Ley 21.719 de protección de datos personales? Desde el 1 de diciembre de 2026, toda empresa que guarde datos de clientes o trabajadores debe cumplirla.

Pyme en Regla te lo dice en 5 minutos y te guía para corregir lo que falta:

✔ Encuesta de 17 preguntas de alternativas, con la referencia legal de cada una.
✔ Informe con tu nivel de cumplimiento por área y las medidas que debes tomar, priorizadas en urgentes (30 días) y de corto plazo (90 días).
✔ Tablero de seguimiento: responsables, plazos, alertas de vencimiento y respaldos (fotos, PDF o notas) de cada corrección.
✔ Informes en PDF del diagnóstico y del estado de avance, listos para compartir.
✔ Registro de solicitudes de personas (con control del plazo legal), incidentes e inventario de datos.
✔ Plantillas: política de privacidad, cláusulas para trabajadores y proveedores, procedimiento ante filtraciones y letrero de cámaras.
✔ Varias empresas en una misma app: ideal para contadores y asesores.

Tus datos se guardan solo en tu teléfono: sin cuentas y sin servidores.

Pyme en Regla es una herramienta de orientación creada por Mauroblues. No reemplaza la asesoría de un abogado ni es un servicio oficial del Estado.

**Categoría:** Empresa · **Correo de contacto:** miperrihijo@gmail.com

---

## Cómo funcionan los anuncios (diseñado para rentar sin estorbar)

- **Banner adaptativo**, anclado sobre la barra inferior, solo en Informe, Seguimiento, Registros y Documentos. Se oculta en la encuesta y al abrir cualquier formulario.
- **Intersticial** (pantalla completa) solo en dos pausas naturales: al pasar del final de la encuesta al informe, y después de generar un PDF.
- Límites: nunca en los primeros 2 minutos de uso y como máximo uno cada 4 minutos (ajustable en `www/ads-config.js`).
- Ninguna función queda bloqueada por anuncios.
