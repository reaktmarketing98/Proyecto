# Publicar Tumble Tiles en internet (gratis)

El repositorio ya trae todo: el juego (`game/index.html`) y su servidor de multijugador (`server/server.js`).
Se publica como **un solo servicio** en Render: la misma dirección sirve el juego y conecta a los jugadores.

## Opción recomendada: Render (gratis, ~5 minutos)

1. Entra a **https://render.com** → *Get Started* → regístrate con tu cuenta de **GitHub**.
2. Arriba a la derecha: **New +** → **Web Service**.
3. Conecta GitHub y elige el repositorio **reaktmarketing98/Proyecto**.
4. Completa:
   | Campo | Valor |
   |---|---|
   | Name | `tumble-tiles` |
   | Branch | `claude/tnt-run-non-minecraft-9cj7u6` (o `main` si ya lo uniste) |
   | Runtime | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |
5. **Create Web Service**. Espera 2–3 minutos hasta ver *Live*.
6. Copia tu dirección (ej. `https://tumble-tiles.onrender.com`) y envíala a tus amigos.

> Atajo: en Render también puedes usar **New + → Blueprint** y elegir el repo; el archivo `render.yaml` ya trae la configuración.

## Cómo jugar con amigos
1. Todos abren la dirección → escriben su nombre → **Multijugador**.
2. Tú pulsas **Invitar amigos** (copia el mensaje con el código) y lo mandas por WhatsApp.
3. Ellos escriben el código → **Unirse**.
4. Tú (jefe 👑) pulsas **¡Jugar!**. Si hay otras personas buscando, entran a la misma partida; los huecos se llenan con robots.

Funciona en PC (teclado + ratón) y en celular/tablet (joystick táctil).

## A tener en cuenta (plan gratis)
- Si nadie entra en 15 minutos, el servidor "se duerme". La primera visita después tarda ~50 segundos en cargar; luego va normal.
- Cada vez que subas cambios a la rama, Render vuelve a publicar solo.
- Para muchos jugadores a la vez o sin esperas: plan *Starter* (~7 USD/mes).

## Probar en tu computador (opcional)
Con Node.js instalado, en la carpeta del proyecto:
```
npm install
npm start
```
Abre `http://localhost:3000` en dos pestañas o en dos equipos de la misma red (`http://IP-de-tu-PC:3000`).
