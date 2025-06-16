/**
 * @file panel_admin_listar_usuarios.js
 * @version 1.0.0
 * @description Service para listar los usuarios registrados mediante el panel del administrador.
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

const listar_usuarios = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/listar_usuarios/`;

  try {
    const response = await axios.post(url_axios, data, { headers: config });
    return response.data;
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo listar los usuarios. Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      timer: 1500,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#3085d6",
    });
    return false;
  }
};

export default { listar_usuarios };
