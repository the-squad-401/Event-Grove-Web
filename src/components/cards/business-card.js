import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BusinessCard(props) {
  const { business } = props;

  return (
    <Card>
      <Card.Img variant="top" src={business.bannerImage}></Card.Img>
      <Card.Body>
        <Card.Title>{business.name}</Card.Title>
        <Card.Text>{business.description}</Card.Text>
        <Card.Text>{business.category}</Card.Text>
        <Link className="btn btn-primary" to={`/business/${business._id}`}>Details</Link>
      </Card.Body>
    </Card>
  )
}