import React, { useContext, useEffect, useState } from 'react';
import Superagent from 'superagent';

import LoginContext from '../../components/auth/login-context';

export default function Subscriptions() {
  const context = useContext(LoginContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {

  })

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