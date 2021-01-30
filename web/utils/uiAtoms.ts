import { nanoid } from 'nanoid';
import { atom } from 'jotai'; // State Management - https://github.com/pmndrs/jotai

// Username State
export const userAtom = atom(
  localStorage.getItem('username') || `Player${nanoid(8)}`,
  (get, set, newUser: string) => {
    localStorage.setItem('username', newUser);
    set(userAtom, newUser);
  }
);

export default { userAtom };
