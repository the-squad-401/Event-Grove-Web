import React, { useContext, useEffect, useState } from 'react';
import superagent from 'superagent';

import Card from '../../components/cards/business-card-wide';
import LoginContext from '../../components/auth/login-context';

const URL = process.env.REACT_APP_API

export default function Subscriptions() {
  const context = useContext(LoginContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subsEvents, setSubsEvents] = useState([]);

  useEffect(() => {
    superagent
      .get(`${URL}/user`)
      .set('Authorization', `Bearer ${context.token}`)
        .then(res => {
          let businesses = res.body.subscriptions; 
          for(let i = 0; i < businesses.length; i++) {
            superagent
              .get(`${URL}/business/${businesses[i]}`)
                .then(res => {
                  setSubscriptions(bus => [...bus, res.body]);
                })
            superagent
              .get(`${URL}/events/business/${businesses[i]}`)
                .then(res => {
                  setSubsEvents(events => [...events, res.body]);
                })
          }})
  }, [context.token]);

  if(!context.user) {
    return (
      <h4>Must be logged in to view subscriptions. Please sign in or create an account.</h4>
    )
  } else {
    return (
      <section>
        {subscriptions.map((business, i) => <Card business={business} events={subsEvents[i]} />)}
      </section>
    )
  }

}