import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import socketClient from '../utils/socketClient';

const SocketDemo = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    socketClient.getSocket().on('message', (data: string) => {
      if (toast.current) toast.current.show({ severity: 'info', detail: data });
    });
  }, []);

  return (
    <div className='p-d-flex p-flex-column p-ai-center'>
      <h2 className='p-text-center p-mb-3'>Socket Demo</h2>
      <InputText
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        className='p-mb-3'
      />
      <Button
        onClick={() => {
          socketClient.getSocket().emit('message', value);
        }}
        label='Send'
      />
      <Toast ref={toast} />
    </div>
  );
};

export default SocketDemo;
