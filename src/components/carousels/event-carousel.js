import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import EventModal from '../modals/event-modal';
import './event-carousel.scss';

export default function EventCarousel(props) {
  const { events } = props;

  return(
    <Carousel>
      {
        events.map((event) => {
          return (
            <>
              <Carousel.Item key={event.image}>
                <div className="carousel-card" style={{backgroundImage: `url(${event.image})`}}>
                </div>
              </Carousel.Item>
              <EventModal event={event} />
            </>
          )
        })
      }
    </Carousel>
  )
}