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
    let subs = [];
    let events = [];

    if(context.token) {
      superagent
        .get(`${URL}/user`)
        .set('Authorization', `Bearer ${context.token}`)
          .then(res => {
            let businesses = res.body.subscriptions;
            return Promise.all(businesses.map(async (business) => {
              subs.push(await superagent
                .get(`${URL}/business/${business}`)
                  .then(res => res.body));
              events.push(await superagent
                .get(`${URL}/events/business/${business}`)
                  .then(res => res.body))
            }));
          })
            .then(() => {
              console.log(subs, events);
              setSubsEvents(events);
              setSubscriptions(subs);
            })
    }
  }, [context]);

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