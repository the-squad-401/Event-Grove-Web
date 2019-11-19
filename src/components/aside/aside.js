import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import superagent from 'superagent';

import Auth from '../auth/auth';
import LoginContext from '../auth/login-context';
import './aside.scss';

const URL = process.env.REACT_APP_API;

export default function Aside(props) {
  const context = useContext(LoginContext);  
  const [subscriptions, setSubscriptions] = useState([]);


  useEffect(() => {
    if(context.user) {
      superagent
        .get(``)
    }
  })

  return (
    <aside id="aside">
      <Link to="/home">Home</Link>
      <Link to="/businesses">Businesses</Link>
      <Link to="/events">Events</Link>
      <Link to="/about">About</Link>
      <Auth>
        <Link to="/subscriptions">Subscriptions</Link>
        {subscriptions.map(business => <Link to={`/business:${business._id}`}>{business.name}</Link>)}
      </Auth>
    </aside>
    
  )
}
