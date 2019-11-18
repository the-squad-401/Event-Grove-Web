import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Form, FormControl, Button } from 'react-bootstrap';

import './header.scss';

export default function Header(props){
  return (
    <header>
      <Navbar className="navbar-horizontal"
          expand="lg">
        <Link to="/"><NavbarBrand><img src="https://event-grove-assets.s3.us-east-2.amazonaws.com/eventgroveOrange.png" alt="Event Grove Logo"></img></NavbarBrand></Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button >Search</Button>
        </Form>
      </Navbar>
    </header>
  );
}
