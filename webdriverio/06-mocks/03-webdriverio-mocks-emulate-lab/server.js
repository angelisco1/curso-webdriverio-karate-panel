const http = require('http');
const express = require('express');
const path = require('path');

const app = express()

app.get('/get-ciudad', (req, res, next) => {
  const { lat, lon } = req.query
  if (lat === '46.874396' && lon === '-96.835556') {
    res.json({ciudad: 'Fargo'})
  } else if (lat === '36.848044' && lon === '-83.320589') {
    res.json({ciudad: 'Harlan'})
  } else if (lat === '52.485973' && lon === '-1.890715') {
    res.json({ciudad: 'Birmingham'})
  } else if (lat === '35.110816' && lon === '-106.668173') {
    res.json({ciudad: 'Albuquerque'})
  } else {
    res.json({ciudad: 'Una ciudad cualquiera...'})
  }
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const server = http.createServer(app)
server.listen('4003')