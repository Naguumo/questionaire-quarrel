import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import socketClient from './utils/socketClient';

const App = () => {
  const [value, setValue] = useState<string>('');
  const [response, setResponse] = useState<unknown>(null);

  useEffect(() => {
    socketClient.getSocket().on('message', (data: unknown) => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <input
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          socketClient.getSocket().emit('message', value);
        }}>
        Send
      </button>
      <p>The Response is {response}</p>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
