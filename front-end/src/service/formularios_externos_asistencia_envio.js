/**
 * @file foromularios_externos_primer_ingreso_envio.js
 * @version 1.0.0
 * @description Service para envíar observaciones desde el registro de una ficha.
 * @author @iMrStevenS2.
 * @contact steven.bernalz@correounivalle.edu.co
 * @date 25 de Junio del 2024
 */

import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const formularios_externos_asistencia_envio = async (formData) => {
  try {
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/form_asistencia_academica/`;

    axios
      .post(url_axios, formData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Datos enviados correctamente");
          return response;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 404) {
          alert(error.response.data.mensaje);
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

export default { formularios_externos_asistencia_envio };
