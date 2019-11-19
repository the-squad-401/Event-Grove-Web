import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EventModal(props) {
  const { event } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button variant="primary" onClick={ handleShow }>Details</Button>
      <Modal
        show={ show }
        onHide={ handleClose }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {event.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={event.image} alt={`${event.name}`} />
          <p>Description: {event.description}</p>
          <p>Time: {event.startDate} - {event.endDate}</p>
        </Modal.Body>
      </Modal>
    </>
  )
}