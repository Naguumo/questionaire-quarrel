import express from 'express'; // Server Framework - https://expressjs.com
import http from 'http';
import path from 'path';
import { Server } from 'socket.io'; // Websocket Server - https://socket.io/
import { PORT, DEV } from './environment';
import { socketActions } from './socketActions';

// Initialize server
const server = express();
const httpServer = http.createServer(server);
const io = new Server(httpServer); // Websockets - https://socket.io

// Serve React production files
server.use(express.static(path.join(__dirname, '../dist')));

// Last Route, For client side routing
server.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Websocket Event Management
socketActions(io);

// Set server to listen for requests
httpServer.listen(PORT, () => {
  DEV && console.info(`Listening on http://localhost:${PORT}`);
});
