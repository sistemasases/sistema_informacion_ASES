/**
 * @file panel_admin_activar_usuario.js
 * @version 1.0.0
 * @description Service para activar un usuario previamente desactivado mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 29 de Abril del 2025
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const activar_usuario = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/activar_usuario/`;

  try {
    axios.post(url_axios, data, { headers: config }).then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Operación exitosa",
          text: response.data.mensaje,
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      return true;
    });
  } catch (error) {
    console.error("Error en la operación:", error);
    return false;
  }
};

export default activar_usuario;
