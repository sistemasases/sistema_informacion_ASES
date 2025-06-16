/**
 * @file panel_admin_roles_listar_roles.js
 * @version 1.0.0
 * @description Service para Listar roles de estudiantes mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 2025-06-10
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const listar_roles = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_roles/listar_roles/`;

  try {
    const response = await axios.post(url_axios, data, { headers: config });
    return response.data;
  } catch (error) {
    console.error("Error en la operación:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo listar los roles. Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      timer: 1500,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#3085d6",
    });
    return false;
  }
};

export default { listar_roles };
