import React from 'react';
import { Card, Button } from 'react-bootstrap';

import EventCarousel from '../carousels/event-carousel';

const URL = process.env.REACT_APP_API;

export default function BusinessCard(props) {
  const { business, events } = props;

  return (
    <Card>
      <div className="floatLeft">
        <Card.Title>{business.name}</Card.Title>
        <Button>Unsubscribe</Button>
      </div>
      <div className="floatRight">
        <EventCarousel 
          events={events}
        />
      </div>
    </Card>
  )
}