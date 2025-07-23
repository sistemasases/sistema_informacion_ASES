/**
 * @file panel_admin_semestres_crear_semestre.js
 * @version 1.0.0
 * @description Service para Crear un nuevo semestre mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 2025-07-23
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_semestre = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/admin_ases/panel_admin_semestres/crear_semestre/`;

  axios
    .post(url_axios, data, { headers: config })
    .then((response) => {
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
    })
    .catch((error) => {
      console.error("Error en la operación:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo crear el semestre. Por favor, inténtelo de nuevo más tarde.",
        icon: "error",
        timer: 1500,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      });
      return false;
    });
};

export default { crear_semestre };
