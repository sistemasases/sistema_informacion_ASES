/**
 * @file all_users.js
 * @version 1.0.0
 * @description service que retorna todos los usuarios.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_users = async () => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/`;
    // Interacción con la API
    const resUserRol = await axios(url_axios, config);
    return resUserRol.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  all_users,
};
