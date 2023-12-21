import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Acceso_denegado from "../../../components/componentes_generales/acceso_denegado";
import {
  desencriptar,
  decryptTokenFromSessionStorage,
  desencriptarInt,
  decryptUserIdFromSessionStorage,
  desencriptarBigInt,
} from "../../utilidades_seguridad/utilidades_seguridad.jsx";
import Acordion from "../../../components/ficha_estudiante_dicapacidad/Componentes/Acordion.jsx";
import Select from "../../../components/ficha_estudiante_dicapacidad/Componentes/Select.jsx";
import Riesgos from "../../../components/ficha_estudiante_dicapacidad/Componentes/Riesgos.jsx";
import Acordiones from "../../../components/ficha_estudiante_dicapacidad/Componentes/Acordiones.jsx";
import "../../../Scss/ficha_estudiante_discapacidad/discapacidad.css";

const FichaEstudianteDiscapacidad = (props) => {
  return (
    <div className="container-ficha">
      <div className="select-container">
        <Select />
      </div>
      <div className="riesgo-container">
        <Riesgos />
      </div>
      <div className="acordion-container">
        <Acordiones />
      </div>
    </div>
  );
};

export default FichaEstudianteDiscapacidad;
