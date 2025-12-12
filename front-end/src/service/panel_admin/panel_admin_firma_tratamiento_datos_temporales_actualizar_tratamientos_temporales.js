/**
 * @file panel_admin_firma_tratamiento_datos_temporales_actualizar_tratamientos_temporales.js
 * @version 1.0.0
 * @description Service para Actualizar la autorización del tratamiento de datos de un estudiante mediante el panel del administrador.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 2025-12-12
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const actualizar_tratamientos_temporales = async () => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/firma_tratamiento_datos_temp/pasarFirmasTemporales/`;

  try {
    axios.post(url_axios, { headers: config }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          title: "Operación exitosa",
          html: `
    <p><strong>Firmas creadas:</strong> ${response.data.firmas_creadas}</p>
    <p><strong>Firmas omitidas:</strong> ${response.data.firmas_omitidas}</p>
    <p> ${response.data.mensaje}</p>
  `,
          icon: "success",
          timer: 2500,
          showConfirmButton: true,
        });
      }
      return true;
    });
  } catch (error) {
    console.error("Error en la operación:", error);
    Swal.fire({
      title: "Error",
      text:
        error.response.data.Respuesta ||
        "No se pudo actualizar los tratamientos de datos temporales. Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      timer: 1500,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#3085d6",
    });
    return false;
  }
};

export default { actualizar_tratamientos_temporales };
