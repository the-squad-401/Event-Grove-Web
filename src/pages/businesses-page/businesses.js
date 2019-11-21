import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';

import LoginContext from '../../components/auth/login-context';
import BusinessCard from '../../components/cards/business-card';

//.set('Authorization', `Bearer ${context.token}`)

const URL = process.env.REACT_APP_API;

/* Banjo was here
*/

export default function BusinessPage() {
  const context = useContext(LoginContext); 
  const [businesses, setBusinesses] = useState([]);
  const [subscriptions, setSubscriptions] = useState({});

  const fetchSubscriptions = async () => {
    if (!context.token) return;
    await superagent
      .get(`${URL}/user`)
      .set('Authorization', `Bearer ${context.token}`)
      .then(results => setSubscriptions(results.body.subscriptions.reduce((subs, sub) => ({...subs, [sub]: true}), {})))
      .catch(console.error);
  };

  const fetchBusinesses = async (categories) => {
    await superagent
      .get(`${URL}/businesses`)
      .then(response => {
        const businesses = response.body.results.map(business => ({...business, category: categories[business.category]}));
        setBusinesses(businesses);
      })
      .catch(console.error);
  }

  const fetchCategories = async () => {
    return await superagent
      .get(`${URL}/categories`)
      .then(response => response.body.results.reduce((map, category) => ({...map, [category._id]: category.name}), {}))
      .catch(console.error);
  }

  useEffect(() => {
    (async () => {
      await fetchBusinesses(await fetchCategories());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchSubscriptions();
    })();
  }, [context.token, fetchSubscriptions]);

  return (
    <section>
      <div className='cards businesses'>
        {businesses.map(business => <BusinessCard key={business._id} business={ business } subscribed={subscriptions[business._id]} />)}
      </div>
    </section>
  );

}
