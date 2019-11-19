import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import './carousel.scss';

export default function BussinessCarousel(props) {
  return(
    <Carousel>
      {
        props.images.map(({src, alt}) => {
          return (
            <Carousel.Item>
              <div className="carousel-card" style={{backgroundImage: `url(${src})`}}>

              </div>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}