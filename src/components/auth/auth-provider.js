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
      register: this.register,
      clearError: this.clearError,
      error: null,
      subscriptions: [],
      isSubscribed: this.isSubscribed,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
  }

  isSubscribed = (id) => {
    return !!this.state.subscriptions.find(sub => sub.id === id);
  }

  subscribe = (business) => {
    superagent
      .post(`${URL}/subscribers/business/${business._id}`)
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(() => this.setState(state => ({...state, subscriptions: [...state.subscriptions, {id: business._id, business: business.name}]})))
      .catch(console.error);
  }

  unsubscribe = (business) => {
    superagent
      .delete(`${URL}/subscribers/business/${business._id}`)
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(() => this.setState(state => ({...state, subscriptions: state.subscriptions.filter(subscription => subscription.id !== business._id)})))
      .catch(console.error);
  }

  fetchSubscriptions = (token) => {
    (async () => {
      if (!token) return;
      const subIds = await superagent
        .get(`${URL}/user`)
        .set('Authorization', `Bearer ${token}`)
        .then(response => response.body.subscriptions)
        .catch(console.error);
      const subscriptions = await Promise.all(subIds.map(id => superagent.get(`${URL}/business/${id}`).then(response => ({id, business: response.body.name}))));
      this.setState(state => ({...state, subscriptions}));
    })();
  }

  login = (username, password) => {
    superagent
      .post(`${URL}/signin`)
      .auth(username, password)
        .then(response => {
          let token = response.text;
          this.verifyToken(token);
        })
        .catch(error => { 
          this.setState({error});
        });
  }

  register = (username, password, email, phone) => {
    return superagent
      .post(`${URL}/signup`)
      .send({
        username,
        password,
        email,
        phone,
      })
        .then(res => {
          return res.text;
        })
        .catch(error => {
          this.setState({error});
        })
  }

  logout = () => {
    this.setLoginState(null, null);
  }

  verifyToken = token => {
    try {
      let user = jwt.decode(token);
      this.setLoginState(token, user);
      this.fetchSubscriptions(token);
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