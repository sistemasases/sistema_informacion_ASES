/**
 * @file semestres_discapacidad.js
 * @version 1.0.0
 * @description service que retorna los semestres de discapacidad
 * @author Carlos Mauricio Tovar Parra
 * @contact carlos.mauricio.tovar@correounivalle.edu.co
 * @date 7 de agosto del 2024
 */
import {
  desencriptar,
  desencriptarInt,
  desencriptarBigInt,
  decryptTokenFromSessionStorage
} from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const semestres_discapacidad = async (id_estudiante) => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // id de la sede
    const paramsget = {
      id_sede: desencriptar(sessionStorage.getItem("sede_id")),
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/discapacidad/sede_discapacidad/`;
    console.log("url_axios", url_axios);
    // Interacción con la API
    const res = await axios.get(url_axios, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  semestres_discapacidad,
};
