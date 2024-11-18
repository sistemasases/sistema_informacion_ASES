/**
 * @file formularios_externos_asistencia_envio.js
 * @version 1.0.0
 * @description Service para
 * @author @iMrStevenS2.
 * @contact steven.bernal@correounivalle.edu.co
 * @date 25 de Junio del 2024
 */

import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const formularios_externos_asistencia_envio = async (formData) => {
  try {
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/form_asistencia_academica/`;

    axios
      .post(url_axios, formData)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          // alert("Datos enviados correctamente");
          Swal.fire({
            title: "Creación exitosa",
            text: response.data.mensaje,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
          });
          return response;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // console.error(error);
        if (error.response.status === 404) {
          // alert(error.response.data.mensaje);
          Swal.fire({
            title: "Error",
            text: error.response.data.mensaje,
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
        } else {
          // alert("Error al enviar los datos, vuelva a intentarlo");
          Swal.fire({
            title: "Error",
            text: "Error al enviar los datos, vuelva a intentarlo",
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
        }
        return false;
      });
  } catch (error) {
    // console.error(error);
    return false;
  }
};

export default { formularios_externos_asistencia_envio };
