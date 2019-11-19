import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import {Button} from 'react-bootstrap'

import BizCar from '../../components/carousels/business-carousel';
import EventCard from '../../components/cards/event-card';

const URL = process.env.REACT_APP_API;

export default function Business(props) {

  const [business, setBusiness] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchBusiness = () => {
    superagent
      .get(`${URL}/business/${props.match.params.id}`)
        .then(response => {
          console.log(response.body);
          setBusiness(response.body);
        })
        .catch(error => console.log(error))
  }

  const fetchEvents = () => {
    superagent
      .get(`${URL}/events/${props.match.params.id}`)
        .then(response => {
          console.log(response.body);
          setEvents(response.body.results)
        })
        .catch(error => console.log(error))
  }

  useEffect(() => {
    (async () => {
      await fetchBusiness();
      await fetchEvents();
    })();
  }, []);

  return (
  <>
    <Button>Subscribe</Button>
    <section>
      <BizCar images={business} />
    </section>

    <div className="businessInfo">
      <span>Business Name: {business.name} </span>
      <span>Category: {business.category}</span>
      <span>Address: {business.address}</span>
      <span>Hours: {business.hours}</span>
      <span>Website: {business.externalUrl}</span>
    </div>
    <div className='cards'>
        {events.map(event => <EventCard event={event} />)}
      </div>

  </>
  )

}