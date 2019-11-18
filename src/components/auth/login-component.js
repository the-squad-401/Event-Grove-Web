import React, { useContext } from 'react';

import LoginContext from './login-context';

export default function Login(props) {
  const context = useContext(LoginContext);

  let handleSubmit = e => {
    e.preventDefault();

    let { username, password } = e.target;
    console.log(username.value, password.value);
    context.login(username.value, password.value);
    e.target.reset();
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input 
        placeholder="username"
        name="username"
      />
      <input
        type="password"
        placeholder="password"
        name="password"
      />
      <button>Login</button>
    </form>
  )

}
