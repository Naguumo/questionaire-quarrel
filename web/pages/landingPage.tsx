import React from 'react';
import { route } from 'navi';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import SocketDemo from '../components/socketDemo';
import { useAtom } from 'jotai';
import { userAtom } from '../utils/uiAtoms';

const LandingPage = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <>
      <div className='p-d-flex p-jc-center p-ai-stretch p-mt-6'>
        <Card className='p-mx-3'>
          <SocketDemo />
        </Card>
        <Card className='p-mx-3'>
          <span className='p-float-label'>
            <InputText
              id='username'
              value={user}
              onChange={({ target: { value } }) => {
                setUser(value);
              }}
            />
            <label htmlFor='username'>Username</label>
          </span>
        </Card>
      </div>
    </>
  );
};

export default route({ view: LandingPage });
