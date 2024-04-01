/**
 * @file acceso_denegado.jsx
 * @version 1.0.0
 * @description Componente que aparecerá cuando el usuario no tenga acceso a la página que quiere acceder.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 15 de mayo de 2023
 */

import React from "react";
import { Container, Row } from "react-bootstrap";

const acceso_denegado = () => {
  return (
    <Container>
      <Row className="rowJustFlex">
        <h2>Error 403:</h2>
        <p>
          Acceso denegado. No tienes los permisos necesarios para ver esta
          página.
        </p>
        <p>
          Por favor, contacta al administrador del sistema para obtener acceso.
        </p>
      </Row>
    </Container>
  );
};

export default acceso_denegado;
