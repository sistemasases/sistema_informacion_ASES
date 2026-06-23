/**
 * @file panel_admin_usuarios_crear.js
 * @version 1.0.0
 * @description Service para crear un nuevo usuario mediante el panel del administrador.
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

const crear_usuario = async (data) => {
  // Recibe el objeto data con los datos del nuevo usuario
  // usuario  nombre	apellido	correo	clave

  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/crear_usuario/`;

  try {
    const response = await axios.post(url_axios, data, { headers: config });

    if (response.status === 201) {
      Swal.fire({
        title: "Creación exitosa",
        text: response.data.mensaje,
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return true;
    }

    Swal.fire({
      title: "Error",
      text: response.data.mensaje || "No se pudo crear el usuario.",
      icon: "error",
      timer: 2500,
      showConfirmButton: false,
    });
    return false;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    Swal.fire({
      title: "Error",
      text: error.response?.data?.mensaje || "No se pudo crear el usuario. Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      timer: 2500,
      showConfirmButton: false,
    });
    return false;
  }
};

export default { crear_usuario };
