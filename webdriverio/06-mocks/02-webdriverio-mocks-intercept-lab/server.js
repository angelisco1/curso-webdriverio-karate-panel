const http = require('http');
const express = require('express');
const path = require('path');

function getTiempo() {
  const tiempos = ['soleado', 'parcialmente-nublado', 'nublado', 'lluvioso', 'tormenta', 'nevado'];
  const pos = Math.floor(Math.random() * tiempos.length);
  return tiempos[pos];
}

const app = express();

app.get('/get-tiempo', (req, res, next) => {
  res.json({ tiempo: getTiempo() });
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);
server.listen('4002');