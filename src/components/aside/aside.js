import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import superagent from 'superagent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBuilding, faCalendarAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import Auth from '../auth/auth';
import LoginContext from '../auth/login-context';
import './aside.scss';

const URL = process.env.REACT_APP_API;

export default function Aside(props) {
  const context = useContext(LoginContext);  
  const [subscriptions, setSubscriptions] = useState([]);


  useEffect(() => {
    (async() => {
      if(!context.user) return;

      const subIds = await superagent
        .get(`${URL}/user`)
        .set('Authorization', `Bearer ${context.token}`)
        .then(response => response.body.subscriptions)
        .catch(console.error);
      const subscriptions = await Promise.all(subIds.map(id => superagent.get(`${URL}/business/${id}`).then(response => ({id, business: response.body}))));
      setSubscriptions(subscriptions);
    })();
  }, [context])

  return (
    <aside id="aside">
      <Link to="/home"><FontAwesomeIcon icon={faHome} /> Home</Link>
      <Link to="/businesses"><FontAwesomeIcon icon={faBuilding} /> Businesses</Link>
      <Link to="/events"><FontAwesomeIcon icon={faCalendarAlt} /> Events</Link>
      <Link to="/about"><FontAwesomeIcon icon={faQuestionCircle} /> About</Link>
      <Auth>
        <Link to="/subscriptions">Subscriptions</Link>
        <hr></hr>
        {subscriptions.map(sub => <Link key={sub.id} to={`/business/${sub.id}`}>{sub.business.name}</Link>)}
      </Auth>
    </aside>
    
  )
}
