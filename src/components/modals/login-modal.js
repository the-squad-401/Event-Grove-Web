import React, { useState, useContext  } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LoginContext from '../auth/login-context';

import './login-modal.scss';

export default function LoginModal(props) {
  const context = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registering, setRegistering] = useState(false);

  const handleClose = () => {
    setShow(false);
    context.clearError();
  }

  const handleShow = () => setShow(true);

  const toggleRegistering = () => setRegistering(!registering);

  let handleLogin = async e => {
    e.preventDefault();

    await context.login(username, password);
  }

  let handleRegister = async e => {
    e.preventDefault();
    console.log(username, password, email, phone);

    let token = await context.register(username, password, email, phone);
    if (token) {
      context.login(username, password);
    }
  }
  
  return (
    <>
      <Button variant="primary" onClick={ handleShow }>Login</Button>
      <Modal
        show={ show }
        onHide={ handleClose }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          { registering ? 'Create Account': 'Welcome Back!' }
        </Modal.Header>
        <Modal.Body>
          { registering ? 
            <Form onSubmit={e => handleRegister(e)}> 
              { context.error ? <p>Username Already Taken</p> : <></>}
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" required onChange={e => setUsername(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="5555555555" required onChange={e => setPhone(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>

              { registering ? <Button variant="primary" className="rightButton" onClick={toggleRegistering}>Login</Button> : <Button variant="primary" className="rightButton" onClick={toggleRegistering}>Signup</Button>}
            </Form>
            : 
            <Form onSubmit={e => handleLogin(e)}> 
              { context.error ? <p>Incorrect Username or Password</p> : <></>}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" required onChange={e => setUsername(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              { registering ? <Button variant="primary" className="rightButton" onClick={toggleRegistering}>Login</Button> : <Button variant="primary" className="rightButton" onClick={toggleRegistering}>Signup</Button>}
            </Form>
          }
        </Modal.Body>
      </Modal>
    </>
  )
}