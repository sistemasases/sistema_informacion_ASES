/**
 * @file seguimiento_enviar_observaciones.js
 * @version 1.0.0
 * @description Service para envíar observaciones desde el registro de una ficha.
 * @author @iMrStevenS2.
 * @contact steven.bernal@correounivalle.edu.co
 * @date 25 de Junio del 2024
 */

import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const seguimiento_enviar_observaciones_inasistencia = async (formData) => {
  // Variable con la respuesta si la consulta fue exitosa
  var respuesta = false;
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    // Constante que va en la url de la API para usarla en el axios
    const url_axios = `${process.env.REACT_APP_API_URL}/correos/enviar_observaciones_inasistencia/`;
    // Json con la información del seguimiento
    const seguimiento = {
      fecha: formData.fecha,
      lugar: formData.lugar,
      hora_inicio: formData.hora_inicio,
      hora_finalización: formData.hora_finalización,
      identificación: formData.identificación,
      observaciones_correos: formData.observaciones_correo,
      id_creador: formData.id_creador,
      id_modificador: formData.id_modificador,
      id_estudiante: formData.id_estudiante,
    };
    // Conexion con la API
    if (seguimiento.observaciones_correos !== "") {
      await axios
        .post(url_axios, seguimiento, config)
        .then((res) => {
          // console.log(res);
          respuesta = true;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No se envió el correo porque no hay observaciones");
    }
  } catch (error) {
    console.log(error);
  }
  return respuesta;
};

export default {
  seguimiento_enviar_observaciones_inasistencia,
};
