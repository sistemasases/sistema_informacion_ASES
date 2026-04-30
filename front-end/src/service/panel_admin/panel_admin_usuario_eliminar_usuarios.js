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
import Swal from "sweetalert2";

const eliminar_usuario = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/eliminar_usuario/`;

  try {
    axios.post(url_axios, data, { headers: config }).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: "Operación exitosa",
          html: `
            <p><b>Eliminados:</b> ${response.data.eliminados
              .map((u) => `ID: ${u.id} - ${u.username}`)
              .join("<br>")}</p>

            <p><b>No eliminados:</b> ${response.data.bloqueados
              .map((u) => `ID: ${u.id} - ${u.username}`)
              .join("<br>")}</p>

          <p> Total eliminados:${response.data.total_eliminados}</p>
          <p> Total bloqueados:${response.data.total_bloqueados}</p>
          `,
          icon: "success",
          //   timer: 2500,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6",
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
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

export default { eliminar_usuario };
