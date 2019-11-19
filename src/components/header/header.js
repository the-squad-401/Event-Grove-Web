import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Form, FormControl, Button } from 'react-bootstrap';

import LoginContext from '../auth/login-context';
import LoginModal from '../modals/login-modal';

import './header.scss';

export default function Header(props){
  const context = useContext(LoginContext);

  console.log(context.user);

  return (
    <header>
      <Navbar className="navbar-horizontal"
          expand="lg">
        <Link to="/"><NavbarBrand><img src="https://files.slack.com/files-pri/T3F4FFV5F-FQGKMMNSD/eventgrove_horz.png" alt="Event Grove Logo"></img></NavbarBrand></Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button>Search</Button>
          {context.user ? <Button onClick={context.logout}>Logout</Button>:<LoginModal>Login</LoginModal>}
        </Form>
      </Navbar>
    </header>
  );
}

