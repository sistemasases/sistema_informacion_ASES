import React, { useState, useEffect, Component, useRef } from "react";
import { Container, Col, Row, Button, Form, Alert } from "react-bootstrap";
// import Carousel from "react-bootstrap/Carousel";
// import all_estudiantes_reportes from "../../service/all_estudiantes_reportes";
// import Select from "react-select";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import Checkbox from "react-bootstrap/FormCheck";
// import Modal from "react-bootstrap/Modal";
// import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import axios from "axios";
import { CSVLink } from "react-csv";
import writeXlsxFile from "write-excel-file";
import myGif from "../reportes/loading_data.gif";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  desencriptar,
  desencriptarInt,
  decryptTokenFromSessionStorage,
} from "../utilidades_seguridad/utilidades_seguridad.jsx";

export const Contador_alertas = () => {
  const [state, set_state] = useState({ alertas_total: ''});

  useEffect(() => {
    let rol = desencriptar(sessionStorage.getItem("rol"));
    let sede = desencriptarInt(sessionStorage.getItem("sede_id"));
    let id_usuario = desencriptarInt(sessionStorage.getItem("id_usuario"));

    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const estudiantes_por_rol = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alertas/contador_alertas/` +
            id_usuario.toString() +
            "/",
          { params: { usuario_rol: rol, sede: sede } }
        );
        set_state({
          ...state,
          alertas_total: response.data,
        });
        // setFiltered(response.data);
      } catch (error) {
        // // console.log("no capto el dato");
      }
    };

    estudiantes_por_rol();
  }, []);
  return <>{state.alertas_total}</>;
};

// export default contador_alertas;
