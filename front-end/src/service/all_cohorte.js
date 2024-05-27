/**
 * @file all_cohortes.js
 * @version 1.0.0
 * @description service que retorna todos los cohortes.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_cohorte = async () => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/wizard/cohorte/`;
    // Interacción con la API
    const resInst = await axios.get(url_axios, config);
    return resInst.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  all_cohorte,
};
