import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import { Link } from 'react-router-dom';

import './carousel.scss';

export default function BussinessCarousel(props) {
  return(
    <Carousel>
      {
        props.images.map(({src, url}) => {
          return (
            <Carousel.Item key={src}>
              <div className="carousel-card" style={{backgroundImage: `url(${src})`}} onClick={(url && (() => window.location = url)) || null}>

              </div>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}