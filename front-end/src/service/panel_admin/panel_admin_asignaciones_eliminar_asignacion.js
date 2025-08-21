/**
 * @file panel_admin_asignaciones_actualizar_asignaciones.js
 * @version 1.0.0
 * @description Service para Actualizar una facultad existente mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 2025-06-24
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const eliminar_asignacion = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_asignaciones/eliminar_asignacion/`;

  axios
    .post(url_axios, data, { headers: config })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Operación exitosa",
          text: response.data.mensaje,
          icon: "success",
          timer: 2500,
          showConfirmButton: false,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    })
    .catch((error) => {
      console.error("Error en la operación:", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error || "Solicitud inválida",
        });
      } else if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró la asignación.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Ocurrió un error al realizar la operación.",
        });
      }
    });
};

export default { eliminar_asignacion };
