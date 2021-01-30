import React, { ChangeEvent, useState } from 'react';
import { route } from 'navi';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { userAtom } from '../utils/uiAtoms';
import SocketDemo from '../components/socketDemo';

const LandingPage = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const [room, setRoom] = useState('');
  return (
    <>
      <div className='p-d-flex p-jc-center p-ai-stretch p-mt-6'>
        <Card className='p-mx-3'>
          <SocketDemo />
        </Card>
        <Card className='p-mx-3'>
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
    </>
  );
};

export default route({ view: LandingPage });
