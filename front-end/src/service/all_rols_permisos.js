/**
 * @file all_rols_permisos.js
 * @version 1.1.0
 * @description Service que retorna todos los roles y sus permisos.
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_rols_permisos = async () => {
  try {
    // Constante que va en el header con información del token para axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // url de la API para roles y permisos
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/rol_permiso/`;
    // Interacción con la API
    const resRolPermiso = await axios.get(url_axios, config);
    return resRolPermiso.data;
  } catch (error) {
    console.error("Error al consultar roles y permisos:", error);
    return [];
  }
};

export default {
  all_rols_permisos,
};
  