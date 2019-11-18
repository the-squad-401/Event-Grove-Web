import React, { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './App.css';
import Auth from './components/auth/auth';
import LoginContext from './components/auth/login-context';
import Login from './components/auth/login-component';

export default function App(props) {
  const context = useContext(LoginContext);

  return (
    <>
      <div className="App">
        <nav>
          {context.user ? <li><Link to="" onClick={context.logout}>Logout</Link></li> :
                              <li><Link to="/login">Login</Link></li>
          }
        </nav>

        <Auth>
          <p>Logged In</p>
        </Auth>
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={App} />
    </Switch>
  </>
  );
}
