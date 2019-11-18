import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EventCard(props) {
  const { event } = props;

  return (
    <Card>
      <Card.Img variant="top" src={event.image}></Card.Img>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
  )
}