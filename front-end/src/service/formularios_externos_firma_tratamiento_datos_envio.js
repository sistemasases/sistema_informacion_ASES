/**
 * @file formularios_externos_firma_tratamiento_datos_envio.js
 * @version 1.0.0
 * @description Service para
 * @author @iMrStevenS2.
 * @contact steven.bernal@correounivalle.edu.co
 * @date 25 de Junio del 2024
 */

import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const formularios_externos_firma = async (formData) => {
  try {
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/firma_tratamiento_datos/`;

    axios
      .post(url_axios, formData)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          alert(response.data.Respuesta);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // console.error(error);
        if (error.response.status === 400) {
          alert(error.response.data.Respuesta);
        } else if (error.response.status === 404) {
          alert(error.response.data.Respuesta);
        } else if (error.response.status === 500) {
          alert(error.response.data.Respuesta);
        } else {
          alert("Error al enviar los datos, vuelva a intentarlo");
        }
        return false;
      });
  } catch (error) {
    // console.error(error);
    return false;
  }
};

export default { formularios_externos_firma };
