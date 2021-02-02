export interface IRoomInfo {
  teamA: {
    name: string;
    memberIds: Array<string>;
    points: number;
  };
  teamB: {
    name: string;
    memberIds: Array<string>;
    points: number;
  };
  buzzedPlayer?: string;
  questions?: Array<string>;
}

export interface IUserInfo {
  readonly socket: string;
  username?: string;
  room?: string;
}

class RoomList {
  private record: Record<string, IRoomInfo> = {};

  add(room: string) {
    this.record[room] = {
      teamA: { name: 'Team 1', memberIds: [], points: 0 },
      teamB: { name: 'Team 2', memberIds: [], points: 0 },
    };
  }

  addUser(room: string, userId: string) {
    const membersA = this.record[room].teamA.memberIds;
    const membersB = this.record[room].teamB.memberIds;

    if (membersA.length <= membersB.length)
      this.record[room].teamA.memberIds = [...membersA, userId];
    else this.record[room].teamA.memberIds = [...membersB, userId];
  }

  get(room: string) {
    return this.record[room];
  }

  set(room: string, data: Partial<IRoomInfo>) {
    this.record[room] = { ...this.record[room], ...data };
    if (
      this.record[room].teamA.memberIds.length === 0 &&
      this.record[room].teamB.memberIds.length === 0
    )
      return this.remove(room);
    return this.record[room];
  }

  remove(room: string) {
    const data = this.record[room];
    delete this.record[room];
    return data;
  }

  removeUser(room: string, userId: string) {
    const membersA = this.record[room].teamA.memberIds;
    const membersB = this.record[room].teamB.memberIds;

    if (membersA.indexOf(userId) !== -1)
      this.record[room].teamA.memberIds.splice(membersA.indexOf(userId));
    if (membersB.indexOf(userId) !== -1)
      this.record[room].teamB.memberIds.splice(membersB.indexOf(userId));
  }
}

class UserList {
  private record: Record<string, IUserInfo> = {};

  add(socketId: string) {
    this.record[socketId] = { socket: socketId };
  }

  get(socketId: string) {
    return this.record[socketId];
  }

  set(socketId: string, data: Partial<IUserInfo>) {
    const { room: oldRoom } = this.record[socketId];

    this.record[socketId] = { ...this.record[socketId], ...data };

    const { room } = this.record[socketId];
    if (room !== oldRoom && oldRoom !== undefined)
      roomList.removeUser(oldRoom, socketId);
    if (room !== oldRoom && room !== undefined)
      roomList.addUser(room, socketId);
  }

  remove(socketId: string) {
    const data = this.record[socketId];
    delete this.record[socketId];
    return data;
  }
}

export const roomList = new RoomList();
export const userList = new UserList();

Object.freeze(roomList);
Object.freeze(userList);
