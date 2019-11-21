import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './event-modal.scss'
export default function EventModal(props) {
  const { event } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  return (
    <>
      <Button variant="primary" onClick={ handleShow }>Details</Button>
      <Modal
        show={ show }
        onHide={ handleClose }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="eventModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {event.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="centerDis">
          
          <img className="eventImg" src={event.image} alt={`${event.name}`} />
            <p><span className="boldSpan">Description: </span>{event.description}</p>
            <p><span className="boldSpan">Date: </span>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
            {event.businessName ? 
              <Link className='btn btn-primary' to={`/business/${event.business}`}>{event.businessName}</Link> 
              :
              ''
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}