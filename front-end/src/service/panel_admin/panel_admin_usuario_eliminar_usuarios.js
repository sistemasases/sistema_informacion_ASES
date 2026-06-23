/**
 * @file panel_admin_usuario_eliminar_usuarios.js
 * @version 1.0.0
 * @description Service para eliminar un usuario existente mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 27 de marzo del 2026
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const eliminar_usuario = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/eliminar_usuario/`;

  return axios
    .post(url_axios, data, { headers: config })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export default { eliminar_usuario };
