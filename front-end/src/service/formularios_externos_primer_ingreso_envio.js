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
import Swal from "sweetalert2";

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
        if (response.status === 201) {
          // Registro creado exitosamente
          // alert(response.data.mensaje);
          Swal.fire({
            title: "Creación exitosa",
            text: response.data.mensaje,
            icon: "success",
            timer: 2500,
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        return true;
      })
      .catch((error) => {
        // console.error(error);
        if (error.response.status === 400) {
          // alert(error.response.data.mensaje);
          Swal.fire({
            title: "Error",
            text: error.response.data.mensaje,
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
          return false;
        } else if (error.response.status === 404) {
          // alert(error.response.data.mensaje);
          Swal.fire({
            title: "Error",
            text: error.response.data.mensaje,
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
          return false;
        } else if (error.response.status === 409) {
          // alert(error.response.data.mensaje);
          Swal.fire({
            title: "Error",
            text: error.response.data.mensaje,
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
          return false;
        } else if (error.response.status === 500) {
          // alert("Error interno del servidor, por favor intente más tarde.");
          Swal.fire({
            title: "Error",
            text: "Error interno del servidor, por favor intente más tarde.",
            icon: "error",
            timer: 2500,
            showConfirmButton: false,
          });
          return false;
        }
      });
  } catch (error) {
    // console.error(error);
    return false;
  }
};

export default { formularios_externos_primer_ingreso_envio };
