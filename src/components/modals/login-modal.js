import React, { useState, useContext  } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import LoginContext from '../auth/login-context';


export default function LoginModal(props) {
  const { event } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(LoginContext);

  let handleSubmit = e => {
    e.preventDefault();

    let { username, password } = e.target;
    console.log(username.value, password.value);
    context.login(username.value, password.value);
    e.target.reset();
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
          <Form>
            <Form.Group controlId="formBasicEmail" onSubmit={e => handleSubmit(e)}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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