import { nanoid } from 'nanoid';
import { atom } from 'jotai'; // State Management - https://github.com/pmndrs/jotai
import { socket } from './socket';

// Username State
export const userAtom = atom(
  localStorage.getItem('username') || `Player${nanoid(8)}`,
  (get, set, newUser: string) => {
    const curr = get(userAtom);
    if (curr !== newUser && newUser !== '') {
      socket.emit('user', { username: newUser });
      localStorage.setItem('username', newUser);
      set(userAtom, newUser);
    }
  }
);

export default { userAtom };
