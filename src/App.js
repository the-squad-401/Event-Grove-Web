import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Home from './pages/home-page/home';
import Businesses from './pages/businesses-page/businesses';
import LoginContext from './components/auth/login-context';
import Header from './components/header/header';
import Aside from './components/aside/aside';
import Footer from './components/footer/footer';
import Business from './pages/business-page/business'
export default function App(props) {
  const context = useContext(LoginContext);

  return (
    <>
      <div className="App">
        <Header />
        <section id="content">

          <Aside />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/businesses" component={Businesses} />
            <Route path="/" component={Home} />
            <Route path="/businesses/:id" component={Business} />
          </Switch>
        </section>
      </div>
      <Footer></Footer>
  </>
  );
}
