import React from 'react';

import Carousel from 'react-bootstrap/Carousel'

import {useState} from 'react';

export default function BussinessCarousel(props){

  
  return(
    <Carousel>
      <Carousel.Item>
        <img
          className="bizCar"
          src="src\assets\img\348s.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="bizCar"
          src="src\assets\img\0ba5bead0a1e4b1ed557fdaea6dd50ee.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}