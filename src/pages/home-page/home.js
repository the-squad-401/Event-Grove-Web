import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

import BizCar from '../../components/carousels/business-carousel';
import EventCard from '../../components/cards/event-card';

import './home.scss';

const URL = process.env.REACT_APP_API;

function selectRandom(items, count = 3) {
  if (count >= items.length) return items;
  const selected = [];
  do {
    const item = items[Math.floor(Math.random() * items.length)];
    if (selected.includes(item)) continue;
    selected.push(item);
  } while (selected.length < count);
  return selected;
}

export default function Home() {

  const [businesses, setBusinesses] = useState([]);
  const [events, setEvents] = useState([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);

  const fetchBusinesses = () => {
    superagent
      .get(`${URL}/businesses`)
      .then(response => {
        //console.log(response.body);
        setBusinesses(response.body.results);
        setFeaturedBusinesses(selectRandom(response.body.results).map(business => ({
          src: business.bannerImage,
          url: `/business/${business._id}`,
        })));
      })
      .catch(console.error);
  }

  const fetchEvents = () => {
    superagent
      .get(`${URL}/events`)
        .then(response => {
          console.log(response.body);
          setEvents(response.body.results);
        })
        .catch(error => console.log(error));
  }

  useEffect(() => {
    (async () => {
      await fetchBusinesses();
      await fetchEvents();
    })();
  }, []);

  return (
    <section>
      <BizCar images={featuredBusinesses} />
      <div className='cards'>
        {events.map(event => <EventCard key={event._id} event={event} />)}
      </div>
    </section>
  );
}