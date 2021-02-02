import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { route } from 'navi';
import { useNavigation } from 'react-navi';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { css } from '@emotion/css';
import { useAtom } from 'jotai';
import { userAtom } from '../utils/uiAtoms';
import { nanoid } from 'nanoid'; // Human Friendly Room Ids - https://github.com/ai/nanoid

const LandingCSS = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr auto;
  gap: 1% 1%;
  grid-template-areas:
    '. . .'
    '. center .'
    '. . .';

  .center {
    grid-area: center;
  }
`;

const LandingPage = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const [userValueHolder, setUserValueHolder] = useState(user);

  const [room, setRoom] = useState<string>('');

  const navigation = useNavigation();

  useEffect(() => {
    setUserValueHolder(user);
  }, [user]);

  return (
    <div className={LandingCSS}>
      <Card className='center p-fluid'>
        <InputText
          className='p-mb-2'
          id='username'
          value={userValueHolder}
          onBlur={({ target: { value } }: FocusEvent<HTMLInputElement>) => {
            setUser(value);
          }}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setUserValueHolder(value);
          }}
        />
        <Button
          label='Host'
          className='p-mb-2'
          onClick={() => {
            navigation.navigate(`/room/${nanoid(8)}`);
          }}
        />
        <InputText
          className='p-mb-2'
          value={room}
          placeholder='Room'
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setRoom(value);
          }}
        />
        <Button
          label='Join'
          onClick={() => {
            // Check for valid room
            if (false) navigation.navigate(`/room/${room}`);
          }}
        />
      </Card>
    </div>
  );
};

export default route({ view: LandingPage });
