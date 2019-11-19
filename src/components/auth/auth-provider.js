import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';

import LoginContext from './login-context';

const URL = process.env.REACT_APP_API;

export default class LoginProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      user: null,
      login: this.login,
      logout: this.logout,
      clearError: this.clearError,
      error: null,
    };
  }

  login = (username, password) => {
    superagent
      .post(`${URL}/signin`)
      .auth(username, password)
        .then(response => {
          let token = response.text;
          this.verifyToken(token)
        })
        .catch(error => { 
          this.setState({error});
        });
  }

  logout = () => {
    this.setLoginState(null, null);
  }

  verifyToken = token => {
    try {
      let user = jwt.decode(token);
      this.setLoginState(token, user);
    } catch(error) {
      this.logout();
    }
  }

  setLoginState = (token, user) => {
    this.setState({token, user});
    token ? cookie.save('auth', token) : cookie.remove('auth');
  }

  clearError = () => {
    this.setState({error: null});
  }

  componentDidMount() {
    const authToken = cookie.load('auth');
    this.verifyToken(authToken);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}