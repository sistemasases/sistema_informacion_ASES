import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Tabla_sin_seguimientos from "../../components/sin_seguimientos/tabla_sin_seguimientos";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import { useEffect } from "react";
import axios from "axios";
import {
  encriptar,
  desencriptar,
  decryptTokenFromSessionStorage,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const Sin_seguimientos = () => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const userRole = desencriptar(sessionStorage.getItem("permisos"));
  const [state, set_state] = useState({
    semestre_Seleccionado: "",
  });

  return (
    <>
      {userRole.includes("view_estudiantes_sin_segui") ? (
        <Col className="contenido_children">
          <Row className="containerRow">
            <Tabla_sin_seguimientos></Tabla_sin_seguimientos>
          </Row>
        </Col>
      ) : (
        <Acceso_denegado />
      )}
    </>
  );
};

export default Sin_seguimientos;
