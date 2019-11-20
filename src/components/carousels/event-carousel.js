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
    <Carousel>
      {
        events.map((event) => {
          return (
            <>
              <Carousel.Item key={event.image}>
                <div className="carousel-card" style={{backgroundImage: `url(https://iso.500px.com/wp-content/uploads/2015/03/business_cover.jpeg`} } onClick={ handleShow }>
                </div>
              </Carousel.Item>
              <EventModal event={event} handleClose={handleClose} show={show}/>
            </>
          )
        })
      }
    </Carousel>
  )
}