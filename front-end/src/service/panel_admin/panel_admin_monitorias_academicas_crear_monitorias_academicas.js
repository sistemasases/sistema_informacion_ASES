/**
 * @file panel_admin_monitorias_academicas_crear_monitorias_academicas.js
 * @version 1.0.0
 * @description Service para Crear un nuevo registro de monitoría académica mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 09-04-2026
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_monitoria_academica = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_monitorias_academicas/crear_monitoria_academica/`;

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

export default { crear_monitoria_academica };
