import { io } from 'socket.io-client'; // Websocket Client - https://socket.io/

const socketURLList: Record<string, string> = {
  'localhost': 'ws://localhost:8000',
  'questionaire-quarrel.herokuapp.com':
    'wss://questionaire-quarrel.herokuapp.com',
};
const socketURL = socketURLList[window.location.hostname];

export const socket = io(socketURL, {
  transports: ['websocket'],
});
