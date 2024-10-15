/**
 * @file update_datos_entrevistador_disc.js
 * @version 1.0.0
 * @description Service para
 * @author @iMrStevenS2.
 * @contact steven.bernal@correounivalle.edu.co
 * @date 9 de Septiembre del 2024
 */

import {
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const Update_datos_entrevistador_disc = async (FormData) => {
  try {
    const url_axios = `${process.env.REACT_APP_API_URL}/discapacidad/estudiante_discapacidad/datos_caracterizacion_edit/`;
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    axios
      .post(url_axios, FormData, config)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert(response.data.Respuesta);
          return response;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 404) {
          alert(error.response.data.mensaje);
        } else if (error.response.status === 500) {
          alert(
            "En caso de que los campos se encuentren vacios, por favor llenarlos"
          );
        } else {
          alert("Error al enviar los datos, vuelva a intentarlo");
        }
        return false;
      });
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default { Update_datos_entrevistador_disc };
