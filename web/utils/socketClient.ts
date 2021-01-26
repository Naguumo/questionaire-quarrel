import { io } from 'socket.io-client';

const socketURL =
  window.location.hostname === 'localhost'
    ? 'ws://localhost:8000'
    : 'wss://questionaire-quarrel.herokuapp.com';

class Socket {
  socket;

  constructor() {
    this.socket = io(socketURL, { transports: ['websocket'] });
  }

  getSocket() {
    return this.socket;
  }
}

const socketClient = new Socket();
Object.freeze(socketClient);

export default socketClient;
