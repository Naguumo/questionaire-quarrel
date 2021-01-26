import { io } from 'socket.io-client';

const socketURLList: Record<string, string> = {
  'localhost': 'ws://localhost:8000',
  'questionaire-quarrel.herokuapp.com':
    'wss://questionaire-quarrel.herokuapp.com',
};
const socketURL = socketURLList[window.location.hostname];

class Socket {
  socket;

  constructor() {
    this.socket = io(socketURL, {
      transports: ['websocket'],
    });
  }

  getSocket() {
    return this.socket;
  }
}

const socketClient = new Socket();
Object.freeze(socketClient);

export default socketClient;
