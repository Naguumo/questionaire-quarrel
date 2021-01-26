import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <p>THIS WORKS OR DOES IT?</p>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
