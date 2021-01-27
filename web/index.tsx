import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'; // Remove browser default styles
import 'primereact/resources/themes/vela-blue/theme.css'; // Theming
import 'primereact/resources/primereact.min.css'; // Component Library - https://primefaces.org/primereact
import 'primeicons/primeicons.css'; // Component Icons
import 'primeflex/primeflex.css'; // Spacing utilities
// import PrimeReact from 'primereact/api'; // Currently Bugged
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { Global, css } from '@emotion/react'; // CSS-in-JS - https://emotion.sh
import SocketDemo from './components/socketDemo';

// PrimeReact.ripple = true; // Enable ripple effects - Currently Bugged

const globalStyle = css`
  body {
    background: var(--surface-b);
  }
`;

const App = (): JSX.Element => {
  return (
    <>
      <Global styles={globalStyle} />
      <div className='p-d-flex p-jc-center p-ai-stretch p-mt-6'>
        <Card className='p-mx-3'>
          <SocketDemo />
        </Card>
        <Card className='p-mx-3'>
          <Skeleton shape='rectangle' width='20rem' height='10rem' />
        </Card>
      </div>
    </>
  );
};

// Entry point for DOM manipulation - DO NOT EDIT
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
