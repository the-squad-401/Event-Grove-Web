import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

export default function BussinessCarousel(props){

  
  return(
    <Carousel>
      {
        props.images.map(({src, alt}) => {
          return (
            <Carousel.Item>
              <img
                className="carousel-card"
                src={src}
                alt={alt}
              />
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}