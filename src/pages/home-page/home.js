import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

const URL = process.env.REACT_APP_API;

export default function Home() {

  const [businesses, setBusinesses] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchBusinesses = () => {
    superagent
      .get(`${URL}/businesses`)
      .then(response => {
        //console.log(response.body);
        setBusinesses(response.body.results);
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
      {events.map(event => {
        return (
          <p>{event.name}</p>
        );
      })}
    </section>
  );
}