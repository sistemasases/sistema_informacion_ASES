/**
 * @file foromularios_externos_primer_ingreso_envio.js
 * @version 1.0.0
 * @description Service para envíar 
 * @author @iMrStevenS2.
 * @contact steven.bernal@correounivalle.edu.co
 * @date 25 de Junio del 2024
 */

import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const formularios_externos_primer_ingreso_envio = async (formData) => {
  try {
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/form_primer_ingreso/`;
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };

    axios
      .post(url_axios, formData)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // console.error(error);
        return false;
      });

    // const response = await axios.post(url_axios, formData, config);

    // if (response) {
    //   // console.log(response);
    // }

    // if (response.status === 200) {
    //   return true;
    // } else {
    //   return false;
    // }
  } catch (error) {
    // console.error(error);
    return false;
  }
};

export default { formularios_externos_primer_ingreso_envio };
