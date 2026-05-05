/**
 * @file panel_admin_monitorias_academicas_desactivar_monitorias_academicas.js
 * @version 1.0.0
 * @description Service para Desactivar una monitoria académica existente mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 08-04-2026
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const desactivar_monitorias = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_monitorias_academicas/desactivar_monitorias/`;

  return axios
    .post(url_axios, data, { headers: config })
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.error("Error en la operación:", error);
      return error.response;
    });
};

export default { desactivar_monitorias };
