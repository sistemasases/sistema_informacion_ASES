/**
  * @file pagina_inicio.jsx
  * @version 1.0.0
  * @description página de inicio con un banner informativo.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 28 de marzo de 2023
*/

import React from 'react'; 

const Pagina_inicio = () => {
  return (
    <div className='banner' style={{margintop: 20, marginBottom: 20}}>
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={'https://ases.univalle.edu.co/images/banners/1.png'} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={'https://ases.univalle.edu.co/images/banners/1.png'} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={'https://ases.univalle.edu.co/images/banners/1.png'} class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Pagina_inicio