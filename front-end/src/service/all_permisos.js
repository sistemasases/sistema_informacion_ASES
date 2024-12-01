/**
 * @file all_rols.js
 * @version 1.0.0
 * @description service que retorna todos los roles.
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_permisos = async () => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/permiso/`;
    // Interacción con la API
    const resRol = await axios.get(url_axios, config);
    return resRol.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  all_permisos,
};
