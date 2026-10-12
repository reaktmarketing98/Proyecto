// Servidor de Tumble Tiles: sirve el juego y reparte la "presencia" de cada jugador
// entre los que están en la misma sala (vestíbulo, grupos de amigos y partidas).
// Mismo modelo que la sala en tiempo real de Claude, para que el juego funcione igual en ambos sitios.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;
const GAME = path.join(__dirname, '..', 'game', 'index.html');
const MAX_PRESENCE = 4096;      // bytes por jugador
const MAX_MSG = 8192;
const ROOM_RE = /^[a-z0-9][a-z0-9_.-]{0,47}$/;

const server = http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200); return res.end('ok'); }
  if (req.url === '/' || req.url.startsWith('/?') || req.url === '/index.html') {
    return fs.readFile(GAME, (err, data) => {
      if (err) { res.writeHead(500); return res.end('error'); }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
      res.end(data);
    });
  }
  res.writeHead(404); res.end('not found');
});

const wss = new WebSocketServer({ server, path: '/ws', maxPayload: MAX_MSG });
const rooms = new Map(); // nombre -> Map(peer -> { ws, presence })
let nextId = 1;

const send = (ws, msg) => { if (ws.readyState === 1) ws.send(JSON.stringify(msg)); };
function broadcast(room, msg, except) {
  const members = rooms.get(room); if (!members) return;
  const data = JSON.stringify(msg);
  for (const [peer, m] of members) if (peer !== except && m.ws.readyState === 1) m.ws.send(data);
}
function leave(ws, room) {
  const members = rooms.get(room); if (!members || !members.has(ws.peer)) return;
  members.delete(ws.peer); ws.rooms.delete(room);
  if (!members.size) rooms.delete(room);
  else broadcast(room, { t: 'bye', room, peer: ws.peer });
}

wss.on('connection', ws => {
  ws.peer = (nextId++).toString(36) + Math.random().toString(36).slice(2, 8);
  ws.rooms = new Set();
  ws.alive = true;
  ws.on('pong', () => { ws.alive = true; });
  send(ws, { t: 'hello', peer: ws.peer });

  ws.on('message', raw => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (!m || typeof m.room !== 'string' || !ROOM_RE.test(m.room)) return;
    if (m.t === 'join') {
      if (ws.rooms.size >= 16) return send(ws, { t: 'err', room: m.room, code: 'limit_reached' });
      let members = rooms.get(m.room);
      if (!members) rooms.set(m.room, members = new Map());
      if (!members.has(ws.peer)) { members.set(ws.peer, { ws, presence: {} }); ws.rooms.add(m.room); }
      send(ws, { t: 'state', room: m.room, peers: [...members].map(([peer, v]) => ({ peer, presence: v.presence })) });
      broadcast(m.room, { t: 'p', room: m.room, peer: ws.peer, presence: {} }, ws.peer);
    } else if (m.t === 'leave') {
      leave(ws, m.room);
    } else if (m.t === 'p') {
      const me = rooms.get(m.room)?.get(ws.peer);
      if (!me || !m.patch || typeof m.patch !== 'object') return;
      const next = { ...me.presence };
      for (const k of Object.keys(m.patch)) { if (m.patch[k] === null) delete next[k]; else next[k] = m.patch[k]; }
      if (JSON.stringify(next).length > MAX_PRESENCE) return;
      me.presence = next;
      broadcast(m.room, { t: 'p', room: m.room, peer: ws.peer, presence: next }, ws.peer);
    }
  });
  ws.on('close', () => { for (const r of [...ws.rooms]) leave(ws, r); });
});

// limpia conexiones muertas
setInterval(() => {
  for (const ws of wss.clients) { if (!ws.alive) { ws.terminate(); continue; } ws.alive = false; ws.ping(); }
}, 15000);

server.listen(PORT, () => console.log(`Tumble Tiles en http://localhost:${PORT}`));
