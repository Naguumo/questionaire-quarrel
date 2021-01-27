import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

// Initialize server
const server = express(); // Simple node server - https://expressjs.com
const httpServer = http.createServer(server);
const io = new Server(httpServer); // Websockets - https://socket.io

// Environment variables
const PORT = process.env.PORT || 8000;
const DEV = process.env.NODE_ENV === 'development';

// Serves React production files
server.use(express.static(path.join(__dirname, '../dist')));
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Endpoint to check server requests are working (Temporary)
server.get('/servercheck', (req, res) => {
  res.send('<h1>The Server is Running</h1>');
});

// Websocket Event Management
io.on('connection', socket => {
  console.info('User connected');

  socket.on('message', (message: string) => {
    console.log(`Message: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.info('User disconnected');
  });
});

// Set server to listen for requests
httpServer.listen(PORT, () => {
  if (DEV) console.info(`Listening on http://localhost:${PORT}`);
});
