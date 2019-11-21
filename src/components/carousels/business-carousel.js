import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';

import './carousel.scss';

export default function BussinessCarousel(props) {
  const [redirect, setRedirect] = useState(null);

  const go = url => {
    setRedirect(<Redirect to={url} />);
  }
  return(
    <Carousel>
      {redirect}
      {
        props.images.map(({src, url}) => {
          return (
            <Carousel.Item key={src}>
              <div className="carousel-card" style={{backgroundImage: `url(${src})`}} onClick={url ? () => go(url) : () => {}}>

              </div>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}