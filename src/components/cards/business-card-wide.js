import React from 'react';
import { Card, Button } from 'react-bootstrap';

import EventCarousel from '../carousels/business-carousel';

export default function BusinessCard(props) {
  const { business } = props;

  return (
    <Card>
      <div className="floatLeft">
        <Card.Title>{business.name}</Card.Title>
        <Button>Unsubscribe</Button>
      </div>
      <div className="floatRight">
        <EventCarousel 
          images={[]}
        />
      </div>
    </Card>
  )
}