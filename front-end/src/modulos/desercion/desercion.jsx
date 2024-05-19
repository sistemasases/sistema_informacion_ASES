/**
 * @file desercion.jsx
 * @version 1.0.0
 * @description modulo para visualizar la desercion.
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../utilidades_seguridad/utilidades_seguridad";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import Tabla_desercion from "../../components/desercion/tabla_desercion";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Desercion = () => {
  // Constante para guardar el token
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  // Constante para obtener los permisos del usuario.
  const userRole = desencriptar(sessionStorage.getItem("permisos"));
  // Guarda la información del usuario
  const [state, set_state] = useState({
    periodo: "",
    usuario: "",
    data_user: [],
    data_periodo: [],
    data_rol: [],
    id_cohorte: 1,
  });
  // Constante  para cambiar el estado de la busqueda
  const [switchChecked, setChecked] = useState(false);
  // Constante para manejar el estado de la busqueda
  const handleChange = () => setChecked(!switchChecked);
  // Llamada al back
  useEffect(() => {
    axios({
      // Endpoint to send files
      url:
        `${process.env.REACT_APP_API_URL}/usuario_rol/cohorte_estudiante_info/` +
        state.id_cohorte +
        "/",
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_cohorte: respuesta.data,
        });
      })
      .catch((err) => {
        console.log("estos son los pr:" + state.data_user);
      });
  }, []);

  return (
    <>
      {userRole.includes("view_reporte_desercion") ? (
        <Col className="contenido_children">
          <Row className="containerRow">
            <Tabla_desercion data_cohorte={state.data_cohorte} />
          </Row>
        </Col>
      ) : (
        <Acceso_denegado />
      )}
    </>
  );
};

export default Desercion;
