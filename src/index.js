import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './assets/scss/argon-design-system-react.scss';
import App from './App';
import LoginProvider from './components/auth/auth-provider';

function Main() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginProvider>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);

