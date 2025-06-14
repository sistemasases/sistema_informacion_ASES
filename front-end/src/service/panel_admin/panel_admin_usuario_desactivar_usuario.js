/**
 * @file panel_admin_desactivar_usuario.js
 * @version 1.0.0
 * @description Service para desactivar un usuario existente mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 29 de Abril del 2025
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const desactivar_usuario = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/desactivar_usuario/`;

  try {
    axios.post(url_axios, data, { headers: config }).then((response) => {
      if (response.status === 200) {
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
      } else if (response.status === 400) {
        Swal.fire({
          title: "Error",
          text: response.data.mensaje,
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      }
      return true;
    });
  } catch (error) {
    console.error("Error en la operación:", error);
    return false;
  }
};

export default { desactivar_usuario };
