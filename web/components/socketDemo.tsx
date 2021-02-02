import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { socket } from '../utils/socket';

const SocketDemo = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const toast = useRef<Toast>(null);

  useEffect(() => {
    socket.on('message', (data: string) => {
      if (toast.current) toast.current.show({ severity: 'info', detail: data });
    });
  }, []);

  return (
    <div className='p-d-flex p-flex-column p-ai-center'>
      <h2 className='p-text-center p-mb-3'>Socket Demo</h2>
      <InputText
        value={value}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          setValue(value);
        }}
        className='p-mb-3'
      />
      <Button
        onClick={() => {
          socket.emit('message', value);
        }}
        label='Send'
      />
      <Toast ref={toast} />
    </div>
  );
};

export default SocketDemo;
