import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import { Link } from 'react-router-dom';

import './carousel.scss';

export default function BussinessCarousel(props) {
  return(
    <Carousel>
      {
        props.images.map(({src, id}) => {
          return (
            <Carousel.Item>
              <div className="carousel-card" style={{backgroundImage: `url(${src})`}} onClick={(id && (() => window.location = `/business/${id}`)) || null}>

              </div>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}