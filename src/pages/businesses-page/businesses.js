import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

import BusinessCard from '../../components/cards/business-card';

const URL = process.env.REACT_APP_API;

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);

  const fetchBusinesses = () => {
    superagent
      .get(`${URL}/businesses`)
      .then(response => {
        console.log(response.body);
        setBusinesses(response.body.results);
      })
      .catch(console.error);
  }

  useEffect(() => {
    (async () => {
      await fetchBusinesses();
    })();
  }, []);

  console.log('Rendering business');
  return (
    <section>
      <div className='cards'>
        {businesses.map(business => <BusinessCard business={ business } />)}
      </div>
    </section>
  );

}
