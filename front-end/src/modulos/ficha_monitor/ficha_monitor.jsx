import React, { useState } from "react";
import Select from "react-select";
import Switch from "react-switch";

import Info_basica from "../../components/ficha_monitor/info_basica";
import Selector from "../../components/ficha_monitor/selector";
import { Container, Row, Col, Dropdown, Button } from "styled-bootstrap-grid";
import { useEffect } from "react";
import axios from "axios";
import Acceso_denegado from "../../components/componentes_generales/acceso_denegado.jsx";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
  desencriptarInt,
} from "../utilidades_seguridad/utilidades_seguridad";

const Ficha_monitor = (props) => {
  //prueba

  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const userRole = desencriptar(sessionStorage.getItem("permisos"));

  const [switchChecked, setChecked] = useState(false);
  const handleChange = () => setChecked(!switchChecked);

  const [state, set_state] = useState({
    data_user: [],
  });

  useEffect(() => {
    axios({
      // Endpoint to send files
      url:
        `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/` +
        desencriptarInt(sessionStorage.getItem("sede_id")) +
        "/",
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_user: respuesta.data,
        });
      })
      .catch((err) => {
        console.log("el error asfa:" + err);
      });
  }, []);

  return (
    <>
      {userRole.includes("view_ficha_monitores") ? (
        <Col className="contenido_children">
          <Info_basica
            usuario={props.nombreUsuario}
            rolUsuario={props.rolUsuario}
            area={props.area}
            periodo={props.periodo}
            data_user={state.data_user}
          />
        </Col>
      ) : (
        <Acceso_denegado />
      )}
    </>
  );
};

export default Ficha_monitor;
