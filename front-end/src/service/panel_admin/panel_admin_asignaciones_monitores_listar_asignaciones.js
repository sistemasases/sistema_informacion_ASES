/**
 * @file panel_admin_asignaciones_listar_asignaciones_monitor.js
 * @version 1.0.0
 * @description Service para Listar todas las facultades mediante el panel del administrador.
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

const listar_asignaciones_monitores = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_asignaciones_monitores/listar_asignaciones_monitores/`;

  try {
    const response = await axios.post(url_axios, data, { headers: config });
    return response.data;
  } catch (error) {
    console.error("Error en la operación:", error);
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: "No se pudo completar la operación. Por favor, inténtelo de nuevo más tarde.",
    // });

    return false;
  }
};

export default { listar_asignaciones_monitores };
