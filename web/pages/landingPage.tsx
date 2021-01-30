import React from 'react';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import SocketDemo from '../components/socketDemo';
import { route } from 'navi';

const LandingPage = (): JSX.Element => {
  return (
    <div className='p-d-flex p-jc-center p-ai-stretch p-mt-6'>
      <Card className='p-mx-3'>
        <SocketDemo />
      </Card>
      <Card className='p-mx-3'>
        <Skeleton shape='rectangle' width='20rem' height='10rem' />
      </Card>
    </div>
  );
};

export default route({ view: LandingPage });
