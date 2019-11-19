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
      .get(`${URL}/events/${props.match.params.id}`)
        .then(response => {
          setEvents(response.body.results)
        })
        .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchBusiness();
    fetchEvents();
  }, []);

  console.log(business);

  return business ? (
  <>
  <section>
    <Button>Subscribe</Button>
    <section>
      <BizCar images={gallery} />
    </section>

    <div className="businessInfo">
      <ul>Business Name: {business.name} </ul>
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