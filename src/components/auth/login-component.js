import React from 'react';

import LoginContext from './login-context';

export default function Login(props) {
  let handleSubmit = e => {
    e.preventDefault();

    let { username, password } = e.target;
    this.context.login(username.value, password.value);
    e.target.reset();
  }

  if(this.context.user) {
    return (
      <p>Login Successful</p>
    )
  }

  return (
    <form onSubmit={handleSubmit()}>
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

Login.contextType = LoginContext;
