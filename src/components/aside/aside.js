import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import superagent from 'superagent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBuilding, faCalendarAlt, faQuestionCircle, faCheckSquare} from '@fortawesome/free-solid-svg-icons'

import Auth from '../auth/auth';
import LoginContext from '../auth/login-context';
import './aside.scss';

export default function Aside(props) {
  const context = useContext(LoginContext);

  console.log(context.subscriptions);

  return (
    <aside id="aside">
      <Link to="/home">Home <FontAwesomeIcon icon={faHome} /></Link>
      <Link to="/businesses">Businesses <FontAwesomeIcon icon={faBuilding} /></Link>
      <Link to="/events">Events <FontAwesomeIcon icon={faCalendarAlt} /></Link>
      <Link to="/about">About <FontAwesomeIcon icon={faQuestionCircle} /></Link>
      <Auth>
        <Link to="/subscriptions">Subscriptions <FontAwesomeIcon icon={faCheckSquare} /></Link>
        <hr></hr>
        {context.subscriptions.map(sub => (<Link key={sub.id} to={`/business/${sub.id}`}>{
          sub.business
        }</Link>))}
      </Auth>
    </aside>
    
  )
}
