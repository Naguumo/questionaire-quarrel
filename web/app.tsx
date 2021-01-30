import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'; // Remove browser default styles
import 'primereact/resources/themes/vela-blue/theme.css'; // Theming
import 'primereact/resources/primereact.min.css'; // Component Library - https://primefaces.org/primereact
import 'primeicons/primeicons.css'; // Component Icons
import 'primeflex/primeflex.css'; // Spacing utilities
// import PrimeReact from 'primereact/api'; // Currently Bugged
import { Global, css } from '@emotion/react'; // CSS-in-JS - https://emotion.sh
import { lazy, mount } from 'navi'; // Page Routing - https://frontarm.com/navi/en
import { NotFoundBoundary, Router, View } from 'react-navi'; // Page Routing Components
import error404 from './pages/error404';

// PrimeReact.ripple = true; // Enable ripple effects - Currently Bugged

// App-wide CSS Styles
const globalStyle = css`
  body {
    background: var(--surface-b);
  }
`;

// Client Side Routes
const routes = mount({
  '/': lazy(() => import('./pages/landingPage')),
  '/browse': lazy(() => import('./pages/browsePage')),
  '/room/:id': lazy(() => import('./pages/roomPage')),
});

const App = (): JSX.Element => {
  return (
    <>
      <Global styles={globalStyle} />
      <Router routes={routes}>
        <Suspense fallback={null}>
          <NotFoundBoundary render={error404}>
            <View />
          </NotFoundBoundary>
        </Suspense>
      </Router>
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
