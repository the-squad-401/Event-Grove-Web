import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, NavbarBrand, Form, FormControl, Button } from 'react-bootstrap';

import LoginContext from '../auth/login-context';
import LoginModal from '../modals/login-modal';

import './header.scss';

export default function Header(props){
  const context = useContext(LoginContext);

  const [query, setQuery] = useState('');

  const [redirect, setRedirect] = useState(null);

  const go = e => {
    e.preventDefault();
    setRedirect(<Redirect to={'/redirect/search/' + query.replace(' ', '+')} />);
  }

  return (
    <header>
      {redirect}
      <Navbar className="navbar-horizontal"
          expand="lg">
        <Link to="/"><NavbarBrand><img src="https://files.slack.com/files-pri/T3F4FFV5F-FQGKMMNSD/eventgrove_horz.png" alt="Event Grove Logo"></img></NavbarBrand></Link>
        <div>
          <Form inline onSubmit={go}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={e => setQuery(e.target.value)} />
            <Button onClick={go}>Search</Button>
          </Form>
          {context.user ? <Button onClick={context.logout}>Logout</Button>:<LoginModal>Login</LoginModal>}
        </div>
      </Navbar>
    </header>
  );
}

