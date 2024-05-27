/**
 * @file carga_masiva.jsx
 * @version 1.0.0
 * @description modulo para visualizar la carga masiva.
 * @author César Becerra
 * @contact cesar.becerra@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import Carga_masiva_component from "../../components/carga_masiva/carga_masiva_component";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import { Row, Col } from "react-bootstrap";
import React from "react";

const Carga_masiva = () => {
  //Desencriptar los permisos del usuario desde el sessionStorage
  const userRole = desencriptar(sessionStorage.getItem("permisos"));
  return (
    <>
      {userRole.includes("view_carga_masiva") ? (
        <Col className="contenido_children">
          <Row className="justify-content-md-center">
            <h1>CARGA MASIVA</h1>
          </Row>
          <Row className="containerRow">
            <Carga_masiva_component />
          </Row>
          <Row></Row>
        </Col>
      ) : (
        <Acceso_denegado />
      )}
    </>
  );
};

export default Carga_masiva;
