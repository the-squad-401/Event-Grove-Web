import React from 'react';
import { Card } from 'react-bootstrap';

import EventModal from '../modals/event-modal';

export default function EventCard(props) {
  const { event } = props;

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <Card>
      <Card.Img variant="top" src={event.image}></Card.Img>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.businessName || ''}</Card.Text>
        <Card.Text>Starts: {startDate.toLocaleDateString()}</Card.Text>
        <Card.Text>Ends: {endDate.toLocaleDateString()}</Card.Text>
        <EventModal event={event} />
      </Card.Body>
    </Card>
  )
}