import { nanoid } from 'nanoid'; // Human Friendly Room Ids - https://github.com/ai/nanoid
import { DEV } from './environment';
import { IRoomInfo, IUserInfo } from '../utils/types';

class RoomList {
  private record: Record<string, IRoomInfo> = {};

  private all() {
    DEV && console.log(this.record);
  }

  add(room: string) {
    this.record[room] = {
      teamA: { name: 'Team 1', members: [], points: 0 },
      teamB: { name: 'Team 2', members: [], points: 0 },
    };
  }

  addUser(room: string, user: string) {
    if (!this.record[room]) this.add(room);

    const membersA = this.record[room].teamA.members;
    const membersB = this.record[room].teamB.members;

    if (membersA.length <= membersB.length)
      this.record[room].teamA.members = [...membersA, user];
    else this.record[room].teamA.members = [...membersB, user];
  }

  get(room: string) {
    this.all();
    return this.record[room];
  }

  set(room: string, data: Partial<IRoomInfo>) {
    this.record[room] = { ...this.record[room], ...data };
    if (
      this.record[room].teamA.members.length === 0 &&
      this.record[room].teamB.members.length === 0
    )
      return this.remove(room);
    return this.record[room];
  }

  remove(room: string) {
    const data = this.record[room];
    delete this.record[room];
    return data;
  }

  removeUser(room: string, user: string) {
    const membersA = this.record[room].teamA.members;
    const membersB = this.record[room].teamB.members;

    if (membersA.indexOf(user) !== -1)
      this.record[room].teamA.members.splice(membersA.indexOf(user));
    if (membersB.indexOf(user) !== -1)
      this.record[room].teamB.members.splice(membersB.indexOf(user));

    if (
      this.record[room].teamA.members.length === 0 &&
      this.record[room].teamB.members.length === 0
    ) {
      return this.remove(room);
    }
    return this.record[room];
  }
}

class UserList {
  private record: Record<string, IUserInfo> = {};

  add(socketId: string) {
    this.record[socketId] = {
      socket: socketId,
      username: `Player${nanoid(8)}`,
    };
  }

  get(socketId: string) {
    return this.record[socketId];
  }

  getRoom(socketId: string) {
    const { room } = this.record[socketId];
    if (room !== undefined) return roomList.get(room);
    return undefined;
  }

  set(socketId: string, data: Partial<IUserInfo>) {
    const { room: oldRoom } = this.record[socketId];

    this.record[socketId] = { ...this.record[socketId], ...data };

    const { username, room } = this.record[socketId];
    if (room !== oldRoom && oldRoom !== undefined)
      roomList.removeUser(oldRoom, username);
    if (room !== oldRoom && room !== undefined)
      roomList.addUser(room, username);

    return this.record[socketId];
  }

  remove(socketId: string) {
    const data = this.record[socketId];
    data.room && roomList.removeUser(data.room, data.username);
    delete this.record[socketId];
    return data;
  }
}

export const roomList = new RoomList();
export const userList = new UserList();

Object.freeze(roomList);
Object.freeze(userList);
