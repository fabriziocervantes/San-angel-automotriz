# San Ángel Automotriz

Landing page de una sola página para San Ángel Automotriz, lote de autos seminuevos y de ocasión en Ciudad Juárez, Chihuahua. Construida a partir de un diseño hecho en Claude Design (ver `chats/` en el repo de diseño original para el historial completo de decisiones).

## Contenido

- `index.html` — estructura de la página (header, hero, barra de confianza, inventario con filtros, por qué elegirnos, reseñas, ubicación con mapa, formulario de contacto, footer).
- `css/styles.css` — estilos, mobile-first, con la paleta azul marino / azul rey / plateado / blanco pedida.
- `js/main.js` — filtros de inventario por marca y precio, enlaces de WhatsApp (general y por auto), envío del formulario por WhatsApp, animaciones de aparición al hacer scroll.
- `images/` — logo y foto del lote.

No requiere build ni dependencias: es HTML/CSS/JS estático, se puede servir desde cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.).

## Pendientes señalados en el diseño original

- **Inventario real**: hoy trae 9 autos de ejemplo (marca, año, km, precio). Sustituir el arreglo `ALL_CARS` en `js/main.js` con las unidades reales.
- **Fotos de autos**: cada tarjeta muestra un fondo con degradado y el nombre del auto como placeholder — falta la foto real de cada unidad.
- **Redes sociales**: los íconos de Facebook / Instagram / TikTok en el footer apuntan a `#` — falta el enlace real de cada red.
- Deliberadamente **no** se incluyen frases como "garantía" o "unidades 100% revisadas", tal como se pidió en el diseño original.

## Desarrollo local

Al ser estático, basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```
