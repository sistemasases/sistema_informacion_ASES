/**
 * @file panel_admin_roles_actualizar_rol.js
 * @version 1.0.0
 * @description Service para Actualizar los datos de un rol mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 2026-04-20
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const actualizar_rol = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_roles/actualizar_rol/`;

  return axios
    .post(url_axios, data, { headers: config })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      //   console.error("Error en la operación:", error);
      return error.response;
    });
};

export default { actualizar_rol };
