import React, { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './App.css';
import Auth from './components/auth/auth';
import LoginContext from './components/auth/login-context';
import Login from './components/auth/login-component';
import Header from './components/header/header';
import Aside from './components/aside/aside';
import Footer from './components/footer/footer';

export default function App(props) {
  const context = useContext(LoginContext);

  return (
    <>
      <div className="App">
        <Header />
        <section id="content">
          <Aside />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/home" component={null} />
          </Switch>
        </section>
      </div>
      <Footer></Footer>
  </>
  );
}
