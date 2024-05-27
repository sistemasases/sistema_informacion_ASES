/**
 * @file descargar_fichas.js
 * @version 1.0.0
 * @description service que descarga las fichas según sus filtros.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const descargar_fichas = async (form) => {
  // Variable con la respuesta si la consulta fue exitosa
  var response = null;
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    // Constante que va en la url de la API para usarla en el axios
    const url_descarga = `${process.env.REACT_APP_API_URL}/seguimiento/seguimientos_individual/descarga/`;
    // Conexion con la API
    await axios({
      url: url_descarga,
      method: "POST",
      headers: config,
      data: form,
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = false;
      });
  } catch {
    response = false;
  }
  return response;
};

export default {
  descargar_fichas,
};
