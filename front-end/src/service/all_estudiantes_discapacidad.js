/**
 * @file all_estudiantes_discapacidad.js
 * @version 1.0.0
 * @description service que retorna todos los estudiantes de discapacidad.
 * @author Carlos Mauricio Tovar Parra
 * @contact carlos.mauricio.tovar@correounivalle.edu.co
 * @date 6 de agosto del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_estudiantes_discapacidad = async () => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // id de la sede
    const paramsget = {
      id_sede: sessionStorage.getItem("sede_id"),
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/discapacidad/estudiante_discapacidad/`;
    // Interacción con la API
    const res = await axios.get(url_axios, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  all_estudiantes_discapacidad,
};