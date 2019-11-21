import React from 'react';
import { Modal } from 'react-bootstrap';
import './event-modal.scss'

export default function EventModal(props) {
  const { event, show, handleClose } = props;
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  
  return (
    <>
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
          <div className="centerDis"> 
            <img className="eventImg" src={event.image} alt={`${event.name}`} />
            <p><span className="boldSpan">Description:</span> {event.description}</p>
            <p><span className="boldSpan">Date:</span> {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}