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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1% 1%;
  grid-template-areas:
    '. . . .'
    '. center-left center-right .'
    '. . . .';

  .center-left {
    grid-area: center-left;
  }

  .center-right {
    grid-area: center-right;
  }
`;

const LandingPage = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const [room, setRoom] = useState('');
  return (
    <div className={LandingCSS}>
      <Card className='center-left'>
        <SocketDemo />
      </Card>
      <Card className='center-right'>
        <div>
          <span className='p-float-label'>
            <InputText
              id='username'
              value={user}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setUser(value);
              }}
            />
            <label htmlFor='username'>Username</label>
          </span>
        </div>
        <div>
          <Button label='Host' />
        </div>
        <div>
          <InputText
            value={room}
            placeholder='Room'
            onChange={({
              target: { value },
            }: ChangeEvent<HTMLInputElement>) => {
              setRoom(value);
            }}
          />
          <Button label='Join' />
        </div>
      </Card>
    </div>
  );
};

export default route({ view: LandingPage });
