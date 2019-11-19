import React from 'react';
import { Card } from 'react-bootstrap';

import EventModal from '../modals/event-modal';

export default function EventCard(props) {
  const { event } = props;

  return (
    <Card>
      <Card.Img variant="top" src={event.image}></Card.Img>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <EventModal event={event} />
      </Card.Body>
    </Card>
  )
}