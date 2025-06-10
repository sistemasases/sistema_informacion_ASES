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
} from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_usuario = async (data) => {
  // Recibe el objeto data con los datos del nuevo usuario
  // usuario  nombre	apellido	correo	clave

  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_usuario/crear_usuario/`;

  try {
    axios.post(url_axios, data, { headers: config }).then((response) => {
      if (response.status === 201) {
        // Registro creado exitosamente
        // alert(response.data.mensaje);
        Swal.fire({
          title: "Creación exitosa",
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
    console.error("Error al crear el usuario:", error);
    return false;
  }
};

export default crear_usuario;
