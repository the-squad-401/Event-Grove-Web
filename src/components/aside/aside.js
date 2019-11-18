import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth/auth';
import LoginContext from '../auth/login-context';

import './aside.scss';

export default function Aside(props) {
  const context = useContext(LoginContext);  
  const [subscriptions, setSubscriptions] = useState([]);
  let loginLink;
  if

  return (
    <aside id="aside">
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/businesses">Businesses</Link>
      <Link to="/events">Events</Link>
      <Auth>
        <Link to="/subscriptions">Subscriptions</Link>
        {subscriptions.map(business => <Link to={`/business:${business._id}`}>{business.name}</Link>)}
      </Auth>
    </aside>
    
  )
}
