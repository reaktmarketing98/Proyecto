# TUMBLE TILES — Documento de diseño (GDD)

Juego para niños (6–12 años) inspirado en la mecánica base de **TNT Run** (Minecraft) y en el estilo visual y social de **Fall Guys / Stumble Guys**. Sin bloques, sin píxeles, sin TNT.

---

## 1. Investigación: qué es TNT Run

Minijuego de Minecraft popularizado por Hypixel (dentro de "TNT Games").

**Mecánica central**
1. Todos aparecen en el piso superior de una arena con **varios pisos apilados** (normalmente 3–4).
2. Cada bloque que pisas **desaparece ~0,5 s después** (arena/grava sobre TNT que cae).
3. **No puedes quedarte quieto**: el bloque bajo tus pies también se rompe, así que estar parado = caer.
4. Al caer por un hueco aterrizas en el piso de abajo. Si caes del último piso → **vacío = eliminado**.
5. **Gana el último en pie.** Partidas cortas (1–3 min), hasta ~16–24 jugadores.

**Herramientas del jugador**
- **Doble salto limitado** (en Hypixel, 2 por partida en su versión base; se amplían con mejoras).
- Salto normal para cruzar huecos de 1–2 bloques.
- Mejoras compradas con monedas: más dobles saltos, pociones de velocidad/salto, pociones de lentitud para lanzar a rivales (variantes).

**Por qué engancha**
| Factor | Efecto |
|---|---|
| Regla simple (no te detengas) | Se entiende en 5 segundos |
| Cada jugador destruye el mapa | Interacción indirecta entre jugadores, caos emergente |
| Pisos múltiples | "Segunda oportunidad" → tensión sostenida |
| Recurso escaso (doble salto) | Decisiones de alto impacto |
| Rondas cortas | Loop "una más" (retención) |

**Estrategias que surgen**: trazar rutas en espiral para no encerrarse, cortar el camino de otros, guardar el doble salto para el último piso, bajar de piso a propósito cuando el actual está agotado.

---

## 2. Concepto: Tumble Tiles

> Personajes tipo gominola corren sobre plataformas de baldosas de colores flotando en el cielo. Cada baldosa que pisas parpadea en rojo y se cae. Hay 5 niveles, uno debajo de otro. ¡El último en pie gana!

**Principios para niños**
- Se entiende en 5 segundos: *corre, salta, no te caigas*.
- Colores vivos, formas redondas, nada de violencia ni miedo (caer = aterrizar en las nubes).
- Textos cortos, botones grandes, iconos, 4 idiomas.

| TNT Run (base) | Tumble Tiles |
|---|---|
| Bloques que desaparecen | Baldosas hexagonales de colores que parpadean en rojo y caen |
| 3–4 pisos | **5 niveles**, cada uno de un color (rosa, amarillo, menta, azul, lila) |
| Vacío | Mar de nubes |
| Doble salto limitado | **Doble salto** (2 al inicio, máx. 3) |
| Pociones/tienda | **Estrellas** ⭐ que aparecen en el suelo: +1 doble salto |
| Skins de Minecraft | Personajes gominola con ojos grandes y gorros (corona, gorro de lana, hélice, orejas de conejo, gorra, lazo) |

## 3. Modos de juego

### 🎮 Un jugador (contra robots)
| Dificultad | Robots |
|---|---|
| ★☆☆ **Fácil** | Lentos, dudan y se caen solos |
| ★★☆ **Normal** | Leen el terreno y se salvan a veces con doble salto |
| ★★★ **Difícil** | Más rápidos que tú, ven lejos y nunca desperdician el doble salto |

### 🌍 Multijugador
- **Tu grupo**: al entrar recibes un **código de 4 letras**. Tus amigos lo escriben en "Unirse" y quedan en tu grupo (máx. 8). El primero es el **jefe** 👑.
- **Invitar amigos**: copia un mensaje listo para enviar por WhatsApp con el código.
- **¡Jugar!** (búsqueda rápida): el jefe pulsa y el sistema junta a todos los grupos que están buscando.
  - Prioriza **personas reales**: espera hasta **6 segundos** o hasta llenar 8 jugadores.
  - Si faltan jugadores, los huecos se llenan con **robots** al instante.
  - Todo el grupo entra junto a la misma partida.

**Cómo funciona por dentro (prototipo)**
- Usa la sala en tiempo real del enlace de Claude: cada jugador publica su posición ~30 veces por segundo.
- El jugador que abre la partida (anfitrión) mueve a los robots, reparte las estrellas y decide las posiciones.
- Cada pantalla rompe las baldosas que pisa cada jugador, así todos ven el mismo mapa.

**Límites del prototipo**
- Solo pueden jugar personas que puedan abrir el enlace (cuenta de tu organización o invitados desde *Compartir*).
- Si el anfitrión se va, la partida termina para los demás.
- Para un lanzamiento público (miles de niños) se necesita un servidor propio: ver roadmap.

## 4. Controles
- PC: `WASD` correr · `Espacio` saltar (en el aire: doble salto) · ratón o flechas para mirar.
- Móvil/tablet: joystick a la izquierda, arrastrar a la derecha para mirar, botón **Saltar**.
- `M` silencia sonido y música.

## 5. Idiomas
Español, English, Português y Français. Se detecta el idioma del dispositivo y se puede cambiar en la pantalla inicial (se recuerda).

## 6. Sonido
Todo sintetizado (sin archivos): pasos de goma, salto "boing", doble salto con campanitas, aterrizaje, baldosas que caen cerca, estrella, pitidos de cuenta atrás, fanfarria al ganar y música alegre de fondo.

## 7. Roadmap sugerido
| Fase | Entregable |
|---|---|
| 1. Prototipo (hecho) | Un jugador con 3 dificultades + multijugador con grupos y búsqueda rápida |
| 2. Servidor propio | Node.js + WebSockets (Colyseus) para jugar sin cuenta de Claude, salas públicas y anti‑trampas |
| 3. Personalización | Elegir color y gorro, desbloquear trajes con estrellas |
| 4. Más mapas | Mapas temáticos (dulces, espacio, playa) y modos (equipos, tiempo) |
| 5. Seguridad infantil | Sin chat libre (solo emojis), nombres filtrados, control parental |
| 6. Distribución | Web (Poki / CrazyGames) → móvil (Capacitor) |

## 8. Historial de versiones
- v1: prototipo realista (piedra, cañón).
- v2: primera persona, vacío negro, pisos ocultos.
- v3: ambientación vikinga, cuerpo visible, movimiento natural, sonidos.
- v4: baldosas pequeñas, 5 niveles, zona de pisada reducida.
- **v5 (actual): cambio a público infantil — Tumble Tiles, modos Un jugador / Multijugador, 4 idiomas.**
