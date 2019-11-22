import React, { useState, useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginContext from '../auth/login-context';

export default function BusinessCard(props) {
  const context = useContext(LoginContext);  
  const { business } = props;
  const [subbed, setSubbed] = useState(false);

  useEffect(() => {
    setSubbed(context.isSubscribed(business._id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.subscriptions])

  return (
    <Card>
      <Card.Img variant="top" src={business.bannerImage}></Card.Img>
      <Card.Body>
        <Card.Title>{business.name}</Card.Title>
        <Card.Text>{business.description}</Card.Text>
        <Card.Text>{business.category}</Card.Text>
        <section className='btns'>
          <Link className="btn btn-primary" to={`/business/${business._id}`}>Details</Link>
          {context.user ? <button className="subscribe btn btn-primary" onClick={subbed ? () => context.unsubscribe(business) : () => context.subscribe(business)}>{subbed ? 'Unsubscribe' : 'Subscribe'}</button> : null}
        </section>
      </Card.Body>
    </Card>
  )
}