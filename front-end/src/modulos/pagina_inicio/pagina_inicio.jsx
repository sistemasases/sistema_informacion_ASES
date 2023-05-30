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

  const userRole = localStorage.getItem('rol');

  return (
    <>{userRole === 'superAses' || userRole === 'sistemas' ? 
    <div className='banner' style={{marginTop: 20, marginBottom: 20, marginLeft: 22}}>
      <h1>Ingresaste como admin.</h1>

      <div className='banner' style={{marginTop: 20, marginBottom: 20, marginLeft: 22}}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
        </Carousel.Item>
      </Carousel>
    </div>
      
    </div> : <div className='banner' style={{marginTop: 20, marginBottom: 20, marginLeft: 22}}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={'https://ases.univalle.edu.co/images/banners/1.png'}
          />
        </Carousel.Item>
      </Carousel>
    </div>}</>
  );
}

export default Pagina_inicio