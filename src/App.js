import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Home from './pages/home-page/home';
import Businesses from './pages/businesses-page/businesses';
import Header from './components/header/header';
import Aside from './components/aside/aside';
import Footer from './components/footer/footer';
import Business from './pages/business-page/business'
import Subscriptions from './pages/subscriptions-page/subscriptions';
import About from './pages/about-page/about';

export default function App(props) {

  return (
    <>
      <div className="App">
        <Header />
        <section id="content">
          <Aside />
          <section id="page-content">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/businesses" component={Businesses} />
              <Route path="/business/:id" component={Business} />
              <Route path="/subscriptions" component={Subscriptions} />
              <Route path="/" component={Home} />
            </Switch>
          </section>
        </section>
      </div>
      <Footer></Footer>
  </>
  );
}
