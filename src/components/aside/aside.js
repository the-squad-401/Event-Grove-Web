import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import superagent from 'superagent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBuilding, faCalendarAlt, faQuestionCircle, faCheckSquare} from '@fortawesome/free-solid-svg-icons'

import Auth from '../auth/auth';
import LoginContext from '../auth/login-context';
import './aside.scss';

const URL = process.env.REACT_APP_API;

export default function Aside(props) {
  const context = useContext(LoginContext);  
  const [subscriptions, setSubscriptions] = useState([]);


  useEffect(() => {
    (async() => {
      if(!context.user) {
        setSubscriptions([]);
        return
      };

      const subIds = await superagent
        .get(`${URL}/user`)
        .set('Authorization', `Bearer ${context.token}`)
        .then(response => response.body.subscriptions)
        .catch(console.error);
      console.log(subIds);
      const subscriptions = await Promise.all(subIds.map(id => superagent.get(`${URL}/business/${id}`).then(response => ({id, business: response.body}))));
      setSubscriptions(subscriptions);
    })();
  }, [context.user, context.token]);


  return (
    <aside id="aside">
      <Link to="/home">Home <FontAwesomeIcon icon={faHome} /></Link>
      <Link to="/businesses">Businesses <FontAwesomeIcon icon={faBuilding} /></Link>
      <Link to="/events">Events <FontAwesomeIcon icon={faCalendarAlt} /></Link>
      <Link to="/about">About <FontAwesomeIcon icon={faQuestionCircle} /></Link>
      <Auth>
        <Link to="/subscriptions">Subscriptions <FontAwesomeIcon icon={faCheckSquare} /></Link>
        <hr></hr>
        {subscriptions.map(sub => <Link key={sub.id} to={`/business/${sub.id}`}>{sub.business.name}</Link>)}
      </Auth>
    </aside>
    
  )
}
