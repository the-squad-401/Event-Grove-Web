import React, { useState, useEffect } from 'react';
import superagent from 'superagent';

import BusinessCard from '../../components/cards/business-card';

const URL = process.env.REACT_APP_API;

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);

  const fetchBusinesses = async (categories) => {
    console.log(categories);
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

  console.log('Rendering business');
  return (
    <section>
      <div className='cards'>
        {businesses.map(business => <BusinessCard key={business._id} business={ business } />)}
      </div>
    </section>
  );

}
