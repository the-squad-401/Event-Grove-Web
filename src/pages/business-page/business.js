import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import {Button} from 'react-bootstrap'

import BizCar from '../../components/carousels/business-carousel';
import EventCard from '../../components/cards/event-card';

const URL = process.env.REACT_APP_API;

export default function Business(props) {

  const [gallery, setGallery] = useState([]);
  const [business, setBusiness] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchBusiness = () => {
    superagent
      .get(`${URL}/business/${props.match.params.id}`)
        .then(response => {
          setBusiness(response.body)
          setGallery(response.body.gallery.map(img => ({
            src: img,
          })))
        })
        .catch(error => console.log(error))
  }

  const fetchEvents = () => {
    superagent
      .get(`${URL}/events/business/${props.match.params.id}`)
        .then(response => {
          console.log(response.body)
          setEvents(response.body)
        })
        .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchBusiness();
    fetchEvents();
  }, [props.match.params.id]);

  console.log(business);
  console.log(events);

  return business ? (
  <>
  <section>
    
    <section>
      <BizCar images={gallery} />
    </section>
    <Button>Subscribe</Button>
    <div className="businessInfo">
      <ul><h1> {business.name} </h1></ul>
      <ul>Category: {business.category}</ul>
      <ul>Address: {business.address}</ul>
      <ul>Days Open: {business.hours.map(day=> <span> {day.day}</span>)}</ul>
      <ul>Hours: {business.hours.map(openHour => <span> {openHour.open}</span>)}-{business.hours.map(closeHour => <span> {closeHour.close}</span>)}</ul>
      <ul>Website: {business.externalUrl}</ul>
    </div>
    <div className='cards'>
        {events.map(event => <EventCard event={event} />)}
    </div>
  </section>

  </>
  ) : null;

}