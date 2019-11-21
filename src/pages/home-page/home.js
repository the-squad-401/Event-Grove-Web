import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

import BizCar from '../../components/carousels/business-carousel';
import EventCard from '../../components/cards/event-card';

import './home.scss';

const URL = process.env.REACT_APP_API;


//Locally sourced, Nail Spa, The Vinyl, Very Good Construction
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
  const [events, setEvents] = useState([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);

  const fetchBusinesses = async () => {
    return await superagent
      .get(`${URL}/businesses`)
      .then(response => {
        setFeaturedBusinesses(selectRandom(response.body.results).map(business => ({
          src: business.bannerImage,
          url: `/business/${business._id}`,
        })));
        return response.body.results;
      })
      .catch(console.error);
  }

  const fetchEvents = async (businesses) => {
    return await superagent
      .get(`${URL}/events`)
        .then(response => {
          const events = response.body.results.map(event => {
            return {...event, businessName: businesses.find(business => {
              return business._id === event.business
            }).name};
          });
          setEvents(events);
        })
        .catch(error => console.log(error));
  }

  useEffect(() => {
    (async () => {
      await fetchEvents(await fetchBusinesses());
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