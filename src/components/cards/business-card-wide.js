import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import LoginContext from '../auth/login-context';

import EventCarousel from '../carousels/event-carousel';
import './business-card-wide.scss'

export default function BusinessCard(props) {
  const context = useContext(LoginContext);
  const { subscription, events } = props;

  return (
    <Card className="cardWide">
      <div className="leftDiv">
        <Card.Title className="subCardTitle">{subscription.business}</Card.Title>
        <Button className="unsubBtn" onClick={() => context.unsubscribe({_id: subscription.id})}>Unsubscribe</Button>
      </div>
      <div className="rightDiv">
        <EventCarousel 
          events={events}
        />
      </div>
    </Card>
  )
}