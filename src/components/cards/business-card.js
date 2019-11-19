import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function BusinessCard(props) {
  const { business } = props;

  return (
    <Card>
      <Card.Img variant="top" src={business.bannerImage}></Card.Img>
      <Card.Body>
        <Card.Title>{business.name}</Card.Title>
        <Card.Text>{business.description}</Card.Text>
        <Card.Text>{business.category}</Card.Text>
        <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
  )
}