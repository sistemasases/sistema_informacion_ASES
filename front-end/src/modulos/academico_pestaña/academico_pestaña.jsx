/**
 * @file academico_pestaña.jsx
 * @version 1.0.0
 * @description modulo para visualizar la pestaña academico.
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import Academico_desplegables from "../../components/academico_pestaña/academico_desplegables";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { desencriptar } from "../utilidades_seguridad/utilidades_seguridad.jsx";
import { Row, Col } from "react-bootstrap";
import React from "react";

const Academico_pestaña = () => {
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(localStorage.getItem("permisos"));

  return (
    <>
      {userRole === "super_ases" || userRole === "sistemas" || "profesor" ? (
        <Col className="contenido_children">
          <Row className="containerRow">
            <Academico_desplegables />
          </Row>
        </Col>
      ) : (
        <Acceso_denegado />
      )}
    </>
  );
};

export default Academico_pestaña;
