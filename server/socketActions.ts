import { Server } from 'socket.io';
import { DEV } from './environment';
import { userList } from './roomService';
import { IUserInfo } from '../utils/types';

export const socketActions = (io: Server): void => {
  io.on('connection', socket => {
    DEV && console.info(`Socket(${socket.id}) connected`);
    userList.add(socket.id);

    socket.on('user', (user: Partial<IUserInfo>) => {
      DEV && console.log(`Changing user ${socket.id} with data`, user);
      userList.set(socket.id, { ...user });

      if (user) io.emit('roomState', userList.getRoom(socket.id));
    });

    socket.on('disconnect', () => {
      DEV && console.info(`Socket(${socket.id}) disconnected`);
      userList.remove(socket.id);
    });
  });
};
