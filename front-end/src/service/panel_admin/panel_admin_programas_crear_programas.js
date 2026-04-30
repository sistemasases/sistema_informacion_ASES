/**
 * @file panel_admin_programas_crear_programas.js
 * @version 1.0.0
 * @description Service para Crear un nuevo registro de programa mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 20-04-2026
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_programa = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_programas/crear_programa/`;

  return axios
    .post(url_axios, data, { headers: config })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error en la operación:", error);
      return error.response;
    });
};

export default { crear_programa };
