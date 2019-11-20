import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import EventModal from '../modals/event-carousel-modal';
import './event-carousel.scss';

export default function EventCarousel(props) {
  const { events } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log('Clicked:', show)
    setShow(true)}
  ;

  return(
    <Carousel className="eventsCarousel">
      {
        !events.length ?
        (<Carousel.Item>
          <div className="carousel-card" style={{backgroundImage: 'url(https://event-grove-assets.s3.us-east-2.amazonaws.com/No-Event.gif', backgroundPosition: 'center top', backgroundSize: '100% 51%' }} onClick={ handleShow }>
          </div>
        </Carousel.Item>) :

        (events.map((event) => {
          return (
            <Carousel.Item key={event.image}>
              <div className="carousel-card" style={{backgroundImage: `url(${event.image}`} } onClick={ handleShow }>
              </div>
              <EventModal event={event} handleClose={handleClose} show={show}/>
            </Carousel.Item>
          )
        }))
      }
    </Carousel>
  )
}