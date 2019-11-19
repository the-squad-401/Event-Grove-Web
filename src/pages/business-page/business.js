import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

import BizCar from '../../components/carousels/business-carousel';
import EventCard from '../../components/cards/event-card';

const URL = process.env.REACT_APP_API;

export default function Business(props) {

  const [business, setBusiness] = useState([]);
  const [events, setEvents] = useState([]);
  const [bizInfo, setBizInfo] = useState([]);

  const fetchBusiness = () => {
    superagent
      .get(`${URL}/businesses/:${props.match.params.id}`)
        .then(response => {
          console.log(response.body);
          setBizInfo(response.body.results);
        })
        .catch(error => console.log(error))
  }

  const fetchEvents = () => {
    superagent
      .get(`${URL}/events/:${props.match.params.id}`)
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
    <section>
      <BizCar images={business} />

    </section>
  )

}