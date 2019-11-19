import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Form, FormControl, Button } from 'react-bootstrap';
import LoginModal from '../modals/login-modal';

import './header.scss';

export default function Header(props){
  return (
    <header>
      <Navbar className="navbar-horizontal"
          expand="lg">
        <Link to="/"><NavbarBrand><img src="https://files.slack.com/files-pri/T3F4FFV5F-FQGKMMNSD/eventgrove_horz.png" alt="Event Grove Logo"></img></NavbarBrand></Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button >Search</Button>
          <LoginModal>Login</LoginModal>
        </Form>
      </Navbar>
    </header>
  );
}

