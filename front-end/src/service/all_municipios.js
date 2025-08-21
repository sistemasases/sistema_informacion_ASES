/**
 * @file all_municipios.js
 * @version 1.0.0
 * @description service que retorna todos los municipios.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 12 de noviembre del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_municipios = async () => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/discapacidad/municipios_discapacidad/`;
    // Interacción con la API
    const resInst = await axios.get(url_axios, config);
    return resInst.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
    all_municipios,
};
