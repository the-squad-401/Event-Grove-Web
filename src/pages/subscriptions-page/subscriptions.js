import React, { useContext, useEffect, useState } from 'react';
import superagent from 'superagent';

import Card from '../../components/cards/business-card-wide';
import LoginContext from '../../components/auth/login-context';
import './subscriptions-page.scss';

const URL = process.env.REACT_APP_API

export default function Subscriptions() {
  const context = useContext(LoginContext);
  const [subsEvents, setSubsEvents] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      let events = {};
  
      if(context.token) {
        await Promise.all(context.subscriptions.map(async (sub) => {
          events[sub.id] = await superagent
            .get(`${URL}/events/business/${sub.id}`)
              .then(res => res.body)
        }));
        setSubsEvents(events);
        setText('No Subscriptions');
      }
    })();
  }, [context, context.subscriptions]);

  const getCards = () => {
    return context.subscriptions.map((subscription) => <Card subscription={subscription} events={subsEvents[subscription.id]} />);
  }

  if(!context.user) {
    return (
      <p className="noSubs">Must be logged in to view subscriptions. Please sign in or create an account.</p>
    )
  } else {
    return (
      <section className='subsPage'>
        { context.subscriptions.length === 0 ? <p className="noSubs">{text}</p> :
        (!subsEvents ? null : getCards())}
      </section>
    )
  }

}