import React, { useContext, useEffect, useState } from 'react';
import superagent from 'superagent';
import jwt from 'jsonwebtoken';

import LoginContext from '../../components/auth/login-context';

const URL = process.env.REACT_APP_API

export default function Subscriptions() {
  const context = useContext(LoginContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    superagent
      .get(`${URL}/user`)
      .set('Authorization', `Bearer ${context.token}`)
        .then(res => {
          console.log(res.body)
        })

  });

  if(!context.user) {
    return (
      <h4>Must be logged in to view subscriptions. Please sign in or create an account.</h4>
    )
  } else {

    return (
      <>
      </>
    )
  }

}