import React, { useState, useContext } from 'react';
import superagent from 'superagent';
import { Card, Button } from 'react-bootstrap';
import LoginContext from '../auth/login-context';

import EventCarousel from '../carousels/event-carousel';
import './business-card-wide.scss'

const URL = process.env.REACT_APP_API;

export default function BusinessCard(props) {
  const context = useContext(LoginContext);
  const { business, events } = props;
  const [subbed, setSubbed] = useState(true);

  const subscribe = () => {
    console.log(context);
    superagent
      .post(`${URL}/subscribers/business/${business._id}`)
      .set('Authorization', `Bearer ${context.token}`)
      .then(() => setSubbed(true))
      .catch(console.error);
  }

  const unsubscribe = () => {
    superagent
      .delete(`${URL}/subscribers/business/${business._id}`)
      .set('Authorization', `Bearer ${context.token}`)
      .then(() => setSubbed(false))
      .catch(console.error);
  }

  return (
    <Card className="cardWide">
      <div className="leftDiv">
        <Card.Title className="subCardTitle">{business.name}</Card.Title>
        {subbed ? 
          <Button className="unsubBtn" onClick={unsubscribe}>Unsubscribe</Button>
          :
          <Button className="unsubBtn" onClick={subscribe}>Subscripe</Button>
        }
      </div>
      <div className="rightDiv">
        <EventCarousel 
          events={events}
        />
      </div>
    </Card>
  )
}