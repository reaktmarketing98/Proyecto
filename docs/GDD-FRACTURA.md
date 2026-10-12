# FRACTURA — Documento de diseño (GDD)

Juego inspirado en la base de **TNT Run** (Minecraft), con identidad, gráficos y UI propios. Sin bloques, sin píxeles, sin TNT.

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

## 2. Nuestro concepto: FRACTURA

> Plataformas de piedra suspendidas en un vacío negro total. Juegas en **primera persona**. Cada baldosa que pisas se agrieta y se hunde en la oscuridad. Los pisos de abajo **no se ven**: solo aparecen cuando cae una baldosa y la luz atraviesa el hueco. Último en pie gana.

### Qué conservamos (la base)
- Baldosas que caen tras pisarlas (con retardo corto).
- 4 niveles apilados + vacío al fondo.
- Prohibido detenerse (la baldosa bajo ti también cae).
- Doble salto como recurso escaso.
- Último en pie gana.

### Qué cambiamos (concepto distinto)
| TNT Run | FRACTURA |
|---|---|
| Bloques cúbicos pixelados | **Baldosas hexagonales** de piedra con textura, sombras y reflejos (PBR) |
| Arena/grava + TNT | Piedra que **se agrieta, se pone incandescente y se desploma** girando, con polvo |
| Mundo Minecraft | **Vacío negro total**, solo motas flotando; los pisos inferiores ocultos en la oscuridad |
| Cámara 3ª persona | **Primera persona** (tensión: no ves lo que hay debajo) |
| Personajes Steve/skins | Corredores estilizados con traje y visor de color |
| Pociones/tienda | **Núcleos de energía**: orbes que aparecen sobre baldosas y dan +1 doble salto (máx. 3) |
| Chat/scoreboard de servidor | **HUD propio**: vivos + tiempo, indicador de nivel, cargas de doble salto, feed de eventos |

**Por qué hexágonos**: 6 vecinos en vez de 4 → rutas más fluidas, menos "carriles" rectos, se ve menos a Minecraft y más a juego moderno.

**Núcleos (giro propio)**: añaden un objetivo activo ("voy por el núcleo") que obliga a arriesgar y cruzar zonas de otros → más interacción y más momentos memorables.

---

## 3. Reglas de juego (prototipo)

| Parámetro | Valor |
|---|---|
| Jugadores | 1 humano + 7 bots |
| Niveles | 4 (separados 7 m) |
| Baldosas por nivel | 271 (hexágono de 9 anillos) |
| Retardo de caída | 0,8 s (la costura del borde se enciende naranja → tiembla → cae) |
| Doble salto | 2 al inicio, máx. 3 |
| Núcleo | Aparece cada ~6 s, +1 doble salto |
| Cuenta regresiva | 3 s (las baldosas no caen) |
| Eliminación | Caer por debajo del nivel 4 |

**Controles**
- PC: `WASD` mover · `Espacio` saltar / doble salto en el aire · ratón (clic para capturar) o flechas para mirar.
- Móvil: joystick izquierdo · arrastrar a la derecha para cámara · botón de salto.

---

## 4. UI / UX (distinta a Minecraft)

Estilo: **minimalista oscuro con vidrio esmerilado**, tipografía condensada, acento naranja (calor de la piedra) + cian (energía de los núcleos).

1. **Pantalla de inicio**: logo FRACTURA, campo de nombre, botón JUGAR, resumen de controles.
2. **HUD en partida**
   - Arriba centro: `VIVOS 8` + cronómetro.
   - Izquierda: barra vertical de 4 niveles, resalta el actual.
   - Abajo centro: cargas de doble salto (rombos que se iluminan).
   - Derecha: feed ("Nova cayó al vacío", "Tú tomaste un núcleo").
   - Cuenta regresiva 3-2-1-¡CORRE! a pantalla completa.
3. **Eliminado**: banner con posición + opción "Ver resultados" (sigue en modo espectador).
4. **Resultados**: posición (#3 de 8), tiempo sobrevivido, baldosas rotas, núcleos, botón REVANCHA.

---

## 5. Prototipo incluido

Archivo: `game/index.html` (un solo archivo, Three.js por CDN).

**Cómo probarlo**
1. Abrir `game/index.html` en Chrome/Edge (requiere internet para cargar Three.js).
   - Si el navegador bloquea módulos desde `file://`: en la carpeta del proyecto ejecutar `npx serve game` y abrir la URL que muestra.
2. Escribir nombre → JUGAR.

**Qué tiene**
- Física propia (gravedad, salto, doble salto, aterrizaje por nivel).
- 1.084 baldosas instanciadas (rendimiento fluido).
- Primera persona con balanceo de cabeza y FOV dinámico al caer.
- Luz cenital por piso: solo el piso actual está iluminado; los inferiores reciben luz únicamente por los huecos (sombras reales).
- Costuras luminosas con bloom, polvo, motas en el vacío, fundido a negro al caer.
- Sonido sintetizado (grietas, saltos, aterrizajes, núcleos).
- 7 bots con IA: buscan baldosas sanas, saltan huecos, usan doble salto para salvarse y persiguen núcleos.

---

## 6. Roadmap sugerido

| Fase | Entregable | Objetivo |
|---|---|---|
| 1. Prototipo (hecho) | Juego local vs bots | Validar diversión |
| 2. Multijugador | Servidor (Colyseus / Node + WebSockets) con salas de 8–16 | Jugar con amigos |
| 3. Contenido | 3–5 arenas (cañón, glaciar, templo), modelos 3D reales (glTF), sonido | Rejugabilidad |
| 4. Progresión | Niveles de cuenta, skins de traje y de estela, ranking semanal | Retención |
| 5. Monetización | Cosméticos (skins, efectos al romper baldosa), pase de temporada | Ingresos sin "pay to win" |
| 6. Distribución | Web (itch.io / CrazyGames / Poki) → móvil (Capacitor) → Steam | Alcance |

**Ideas de modos extra**
- **Duo**: equipos de 2, gana el último equipo.
- **Tormenta**: cada 30 s cae un nivel completo automáticamente.
- **Pulso**: habilidad con recarga que agrieta un anillo de baldosas alrededor (ofensiva).

---

## 7. Riesgos y cuidados legales
- No usar nombre "TNT Run", texturas, sonidos ni assets de Minecraft/Mojang/Hypixel.
- La mecánica (suelo que cae) no es protegible; el arte y la marca sí → todo el arte debe ser propio.

---

## 8. v3 — Ambientación nórdica y movimiento natural

**Mitología**: la arena flota en **Ginnungagap** (el abismo primordial). Los 4 niveles son reinos: **Asgard → Midgard → Svartálfheim → Hel**. Ganar = **Valhalla**.

| Elemento | Implementación |
|---|---|
| Baldosas | Piedra con **runa del Futhark antiguo** tallada; brilla azul hielo en reposo y **arde naranja** al pisarla |
| Personajes | Guerreros vikingos: casco con protector nasal (algunos con cuernos), barba, manto de piel, túnica del clan, cinturón, brazales, botas, **escudo pintado** a la espalda y hacha al cinto |
| Clanes | 8 colores de túnica/escudo; broche luminoso del clan |
| Ambiente | Vacío negro, nieve cayendo, **piedras rúnicas flotando**, **braseros con fuego** y brasas, aurora boreal tenue en lo alto |
| Potenciador | **Runa de Odín** (ᛟ): +1 Salto de Odín |
| UI | Tipografía Cinzel, marcos de hierro con remaches dorados, runas en el HUD |

**Primera persona con cuerpo**: la cámara va en los ojos del guerrero; al mirar abajo ves pecho, brazos, hacha, piernas y botas. El cuerpo se anima (zancada con rodillas, brazos, inclinación al correr, pose en el aire).

**Movimiento natural**
- Aceleración y frenado con inercia (no instantáneo); menos control en el aire.
- Margen de salto al dejar un borde (0,12 s) y salto guardado si pulsas justo antes de aterrizar.
- Cámara: rebote real de la cabeza, balanceo lateral, inclinación al desplazarte de lado, amortiguación al aterrizar y FOV que se abre al correr/caer.

**Sonido (sintetizado, sin archivos)**
- Pasos sincronizados con cada pisada (alternando izquierda/derecha); pasos de bots cercanos con posición estéreo.
- Salto, Salto de Odín (campanas mágicas), aterrizaje según la fuerza de la caída, grietas y derrumbe de baldosas cercanas.
- Viento que aumenta al caer, dron grave de ambiente, tambores de guerra en la cuenta regresiva, cuerno al empezar y al ganar.
- Tecla `M` para silenciar.

## 9. v4 — Más dificultad
| Parámetro | Antes | Ahora |
|---|---|---|
| Tamaño de baldosa (radio) | 1,0 m | **0,6 m** |
| Baldosas por reino | 271 | **721** |
| Reinos | 4 | **5**: Asgard → Álfheim → Midgard → Svartálfheim → Hel |
| Zona de pisada (hitbox de pies) | 0,24 m | **0,12 m**: ya no te sostiene una baldosa que solo rozas |
