/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';

import LoginContext from '../../components/auth/login-context';
import BusinessCard from '../../components/cards/business-card';

//.set('Authorization', `Bearer ${context.token}`)

const URL = process.env.REACT_APP_API;

/* Banjo was here
*/

export default function BusinessesSearch(props) {
  const context = useContext(LoginContext); 
  const [businesses, setBusinesses] = useState([]);
  const [subscriptions, setSubscriptions] = useState({});
  const [resultsText, setResultsText] = useState('');

  const fetchSubscriptions = async () => {
    if (!context.token) return;
    await superagent
      .get(`${URL}/user`)
      .set('Authorization', `Bearer ${context.token}`)
      .then(results => setSubscriptions(results.body.subscriptions.reduce((subs, sub) => ({...subs, [sub]: true}), {})))
      .catch(console.error);
  };

  const filterBusinesses = businesses => {
    if (!props.match.params.query) return businesses;
    const queries = props.match.params.query.toLowerCase().split('+');
    return businesses.filter(business => {
      for (const query of queries) {
        if (business.name.toLowerCase().includes(query)) return true;
        if (business.description.toLowerCase().includes(query)) return true;
        if (business.category.toLowerCase().includes(query)) return true;
      }
      return false;
    })
  }

  const fetchBusinesses = async (categories) => {
    await superagent
      .get(`${URL}/businesses`)
      .then(response => {
        let businesses = filterBusinesses(response.body.results.map(business => ({...business, category: categories[business.category]})));
        setResultsText('No results found');
        setBusinesses(businesses);
      })
      .catch(e => {
        console.error(e);
        setResultsText('No results found');
      });
  }

  const fetchCategories = async () => {
    return await superagent
      .get(`${URL}/categories`)
      .then(response => response.body.results.reduce((map, category) => ({...map, [category._id]: category.name}), {}))
      .catch(console.error);
  }

  useEffect(() => {
    (async () => {
      setResultsText('');
      await fetchBusinesses(await fetchCategories());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchSubscriptions();
    })();
  }, [context.token]);

  return (
    <section>
      <div className='cards businesses'>
        {businesses.length > 0 ? 
          businesses.map(business => <BusinessCard key={business._id} business={ business } subscribed={subscriptions[business._id]} />) :
          <h2>{resultsText}</h2>}
      </div>
    </section>
  );

}
