import express from 'express'; // Server Framework - https://expressjs.com
import http from 'http';
import path from 'path';
import { Server } from 'socket.io'; // Websocket Server - https://socket.io/
import { nanoid } from 'nanoid'; // Human Friendly Room Ids - https://github.com/ai/nanoid

// Initialize server
const server = express(); // Simple node server - https://expressjs.com
const httpServer = http.createServer(server);
const io = new Server(httpServer); // Websockets - https://socket.io

// Environment variables
const PORT = process.env.PORT || 8000;
const DEV = process.env.NODE_ENV === 'development';

// Serve React production files
server.use(express.static(path.join(__dirname, '../dist')));

// Endpoint to create rooms - Unfinished/Temporary
server.get('/api/create-room', (_req, res) => {
  const roomId = nanoid(8);
  res.send(roomId);
});

// Last Route, For client side routing
server.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Websocket Event Management
io.on('connection', socket => {
  console.info(`Socket(${socket.id}) connected`);

  // Simple Example - Temporary
  socket.on('message', (message: string) => {
    console.log(`Message: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.info(`Socket(${socket.id}) disconnected`);
  });
});

// Set server to listen for requests
httpServer.listen(PORT, () => {
  DEV && console.info(`Listening on http://localhost:${PORT}`);
});
