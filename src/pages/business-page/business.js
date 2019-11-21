/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BizCar from '../../components/carousels/business-carousel';
import EventCard from '../../components/cards/event-card';
import LoginContext from '../../components/auth/login-context';
import './business.scss'
const URL = process.env.REACT_APP_API;

export default function Business(props) {

  const context = useContext(LoginContext);
  const [gallery, setGallery] = useState([]);
  const [business, setBusiness] = useState(null);
  const [events, setEvents] = useState([]);
  const [subbed, setSubscription] = useState(false);

  const fetchBusiness = async (categories) => {
    await superagent
      .get(`${URL}/business/${props.match.params.id}`)
        .then(response => {
          const business = response.body;
          business.category = categories[business.category];
          setBusiness(business)
          setGallery(business.gallery.map(img => ({
            src: img,
          })))
        })
        .catch(error => console.log(error))
  }

  const fetchEvents = async () => {
     await superagent
      .get(`${URL}/events/business/${props.match.params.id}`)
        .then(response => {
          setEvents(response.body)
        })
        .catch(error => console.log(error))
  }
  const fetchCategories = async () => {
    return await superagent
      .get(`${URL}/categories`)
      .then(response => response.body.results.reduce((map, category) => ({...map, [category._id]: category.name}), {}))
      .catch(console.error);
  }

  const fetchSubscription = async () => {
    if(!context.token) return;
      await superagent
        .get(`${URL}/user`)
        .set('Authorization', `Bearer ${context.token}`)
        .then(results => setSubscription(results.body.subscriptions.includes(props.match.params.id)))
        .catch(console.error);
  }

  const subscribe = () => {
    superagent
    .post(`${URL}/subscribers/business/${props.match.params.id}`)
    .set(`Authorization`, `Bearer ${context.token}`)
    .then(() => setSubscription(true))
    .catch(console.error);
  }
  const unsubscribe = () => {
    superagent
    .delete(`${URL}/subscribers/business/${props.match.params.id}`)
    .set(`Authorization`, `Bearer ${context.token}`)
    .then(() => setSubscription(false))
    .catch(console.error);
  }
  useEffect(() => {
    (async function fetchData() {
      fetchBusiness(await fetchCategories());
    })()
    fetchEvents();

  }, [props.match.params.id]);


  useEffect(() => {
    fetchSubscription();
  }, [context.token]);


  return business ? (
  <>
  <section>
    
    <section>
      <BizCar images={gallery} />
    </section>
    <div id="businessDetails">
    <div>
      <h1 className="bizTitle"> {business.name} </h1>
      <Button id="subButton" onClick={subbed ? unsubscribe : subscribe}>{subbed ? 'unsubscribe' : 'subscribe'}</Button>
      <p id="bizDescription">{business.description}</p>
    </div>
      <div className="businessInfo">
        <div id="addHours">
        <p><span className="descriptionSpan">Category:</span> {business.category}</p>
        <p><span className="descriptionSpan">Address:</span> {business.address}</p>
        <p><span className="descriptionSpan">Days Open:</span> {business.hours.map(day=> <span> {day.day}</span>)}</p>
        <p><span className="descriptionSpan">Hours: </span>{business.hours.map(day => <span> {day.open}</span>)}-{business.hours.map(day => <span> {day.close}</span>)}</p>
        <p><span className="descriptionSpan">Website: </span><Link to={business.externalUrl}>{business.externalUrl} </Link> </p>
        </div>
        

      </div>
    </div>
    <div className='cards'>
        {events.map(event => <EventCard key={event._id} event={event} />)}
    </div>
  </section>

  </>
  ) : null;

}