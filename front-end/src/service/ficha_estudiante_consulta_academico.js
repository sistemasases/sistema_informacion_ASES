/**
 * @file ficha_estudiante_consulta_academico.js
 * @version 1.0.0
 * @description Service para consultar si el estudiante asiste a monitorias academicas.
 * @author @iMrStevenS2
 * @contact steven.bernal@correounivalle.edu.co
 * @date 28 de Agosto del 2025
 */

import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const ficha_estudiante_consulta_academico = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/ficha_consulta_academico/consulta_academico/`;

  try {
    const response = await axios.post(url_axios, data, { headers: config });
    return response.data;
  } catch (error) {
    // Swal.fire({
    //   title: "Error",
    //   text: "Ocurrió un error al consultar las asistencias academicas.Por favor, inténtelo de nuevo más tarde.",
    //   icon: "error",
    //   timer: 1500,
    //   showConfirmButton: true,
    //   confirmButtonText: "Aceptar",
    //   confirmButtonColor: "#3085d6",
    // });
    return false;
  }
};

export default { ficha_estudiante_consulta_academico };
