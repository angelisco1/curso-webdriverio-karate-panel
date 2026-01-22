const http = require('http');
const express = require('express');
const path = require('path');


const app = express();

const usuariosValidos = [
  {email: 'cfalco@gmail.com', password: 'cfalco'},
];

app.use(express.urlencoded({extended: false}));

app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res, next) => {
  const params = req.body;

  const usuario = usuariosValidos.find(u => {
    return ((u.password === params.password) && (u.email === params.email));
  });

  if (usuario) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'historial-transacciones.html'));
});

const server = http.createServer(app);
server.listen('4001', () => {
    console.log('Server running on http://localhost:4001');
});
