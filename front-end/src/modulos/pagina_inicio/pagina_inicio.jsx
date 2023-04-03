/**
  * @file pagina_inicio.jsx
  * @version 1.0.0
  * @description página de inicio con un banner informativo.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Pagina_inicio = () => {
  return (
    <div className='banner' style={{marginTop: 20, marginBottom: 20, marginLeft: 22}}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Pagina_inicio