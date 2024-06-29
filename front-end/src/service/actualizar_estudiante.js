/**
 * @file actualizar_estudiante.js
 * @version 1.0.0
 * @description service para actualizar la información de los estudiantes.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad";
import axios from "axios";

const actualizar_estudiante = (formData) => {
  // Constante que va en el header con información del token para el axios
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  // url de la API
  const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/actualizacion_info_ficha_estuidante/`;
  // Interacción con la API
  axios({
    url: url_axios,
    method: "POST",
    headers: config,
    data: formData,
  }).catch((err) => {
    console.log(err);
  });
};

export default {
  actualizar_estudiante,
};
