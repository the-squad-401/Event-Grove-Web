import React from 'react';
import { Card, Button } from 'react-bootstrap';

import EventCarousel from '../carousels/event-carousel';
import './business-card-wide.scss'

export default function BusinessCard(props) {
  const { business, events } = props;

  return (
    <Card className="cardWide">
      <div className="leftDiv">
        <Card.Title className="subCardTitle">{business.name}</Card.Title>
        <Button className="unsubBtn">Unsubscribe</Button>
      </div>
      <div className="rightDiv">
        <EventCarousel 
          events={events}
        />
      </div>
    </Card>
  )
}