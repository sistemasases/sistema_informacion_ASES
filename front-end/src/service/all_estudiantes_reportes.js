/**
  * @file all_estudiantes_reportes.js
  * @version 1.0.0
  * @description service que retorna todos los reportes por estudiante.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";


const all_estudiantes_reportes = async (formData, id_usuario) => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    // url de la API
    const url_axios =
      `${process.env.REACT_APP_API_URL}/reportes/estudiante_por_rol/` +
      id_usuario.toString() +
      "/";
    // Interacción con la API
    axios({
      url: url_axios,
      method: "GET",
      headers: config,
      data: formData,
    }).then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  all_estudiantes_reportes,
};
