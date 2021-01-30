import React, { ChangeEvent, useState } from 'react';
import { route } from 'navi';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { css } from '@emotion/css';
import { useAtom } from 'jotai';
import { userAtom } from '../utils/uiAtoms';
import SocketDemo from '../components/socketDemo';

const LandingCSS = css`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  gap: 1% 1%;
  grid-template-areas:
    'socket . .'
    '. center .'
    '. . .';

  .socket {
    grid-area: socket;
  }

  .center {
    grid-area: center;
  }
`;

const LandingPage = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const [room, setRoom] = useState<string>('');
  return (
    <div className={LandingCSS}>
      <Card className='socket'>
        <SocketDemo />
      </Card>
      <Card className='center p-fluid'>
        <InputText
          className='p-mb-2'
          id='username'
          value={user}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setUser(value);
          }}
        />
        <Button label='Host' className='p-mb-2' />
        <InputText
          className='p-mb-2'
          value={room}
          placeholder='Room'
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setRoom(value);
          }}
        />
        <Button label='Join' />
      </Card>
    </div>
  );
};

export default route({ view: LandingPage });
