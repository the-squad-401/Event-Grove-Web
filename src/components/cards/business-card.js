import React, { useState, useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginContext from '../auth/login-context';

import superagent from 'superagent';

const URL = process.env.REACT_APP_API;

export default function BusinessCard(props) {
  const context = useContext(LoginContext);  
  const { business } = props;
  const [subbed, setSubbed] = useState(false);

  const subscribe = () => {
    console.log(context);
    superagent
      .post(`${URL}/subscribers/business/${business._id}`)
      .set('Authorization', `Bearer ${context.token}`)
      .then(() => setSubbed(true))
      .catch(console.error);
  }
  const unsubscribe = () => {
    superagent
      .delete(`${URL}/subscribers/business/${business._id}`)
      .set('Authorization', `Bearer ${context.token}`)
      .then(() => setSubbed(false))
      .catch(console.error);
  }

  useEffect(() => {
    setSubbed(props.subscribed);
  }, [props.subscribed]);

  return (
    <Card>
      <Card.Img variant="top" src={business.bannerImage}></Card.Img>
      <Card.Body>
        <Card.Title>{business.name}</Card.Title>
        <Card.Text>{business.description}</Card.Text>
        <Card.Text>{business.category}</Card.Text>
        <section className='btns'>
          <Link className="btn btn-primary" to={`/business/${business._id}`}>Details</Link>
          {context.user ? <button className="subscribe btn btn-primary" onClick={subbed ? unsubscribe : subscribe}>{subbed ? 'Unsubscribe' : 'Subscribe'}</button> : null}
        </section>
      </Card.Body>
    </Card>
  )
}