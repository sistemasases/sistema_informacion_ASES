/**
 * @file pagina_no_encontrada.jsx
 * @version 1.0.0
 * @description Componente que aparecerá cuando el usuario intente ingresar a una página que no exista.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 29 de abril de 2024
 */

import React from "react";
import { Container, Row } from "react-bootstrap";

/**
 * Renderiza un mensaje de error 404, página no encontrada
 * @returns Renderiza un error
 */
const pagina_no_encontrada = () => {

  window.location.replace("/");

  return (
    <Container>
      <Row className="rowJustFlex">
        <h2>Error 404:</h2>
        <p>
          Parece que no hemos encontrado la página que buscas.
        </p>
        <p>
          Por favor vuelve a intentarlo, verifica que la url que pusiste sea correcta
          y en caso tal de no encontrar el error contacta al administrador del sistema para obtener respuesta.
        </p>
      </Row>
    </Container>
  );
};

export default pagina_no_encontrada;
