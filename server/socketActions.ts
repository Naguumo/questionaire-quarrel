import { Server } from 'socket.io';
import { DEV } from './environment';
import { IUserInfo, userList } from './roomService';

export const socketActions = (io: Server): void => {
  io.on('connection', socket => {
    DEV && console.info(`Socket(${socket.id}) connected`);
    userList.add(socket.id);

    socket.on('user', (user: Partial<IUserInfo>) => {
      DEV && console.log(`Changing user ${socket.id} with data`, user);
      userList.set(socket.id, { ...user });
    });

    socket.on('room', (room: string) => {
      DEV && console.log(`${socket.id} is entering room ${room}`);
      userList.set(socket.id, { room });
    });

    socket.on('disconnect', () => {
      DEV && console.info(`Socket(${socket.id}) disconnected`);
      userList.remove(socket.id);
    });
  });
};
