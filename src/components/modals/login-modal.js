import React, { useState, useContext  } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LoginContext from '../auth/login-context';


export default function LoginModal(props) {
  const context = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setShow(false);
    context.clearError();
  }

  const handleShow = () => setShow(true);

  let handleSubmit = async e => {
    e.preventDefault();

    await context.login(username, password);
   
    if(context.error) {
      console.log(context.error);
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
          Welcome Back!
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => handleSubmit(e)}>
            { context.error ? <p>Incorrect Username or Password</p> : <></>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}