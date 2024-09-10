/**
 * @file caracterizacion_discapacidad.js
 * @version 1.0.0
 * @description service que retorna la caracterización del estudiante con discapacidad.
 * @author Steven Bernal Ortiz
 * @contact steven.bernal@correounivalle.edu.co
 * @date 15 de agosto del 2024
 */
import {
  desencriptar,
  desencriptarInt,
  desencriptarBigInt,
  decryptTokenFromSessionStorage,
} from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const caracterizacionDiscapacidad = async (id_estudiante, id_semestre_id) => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };

    // url de la API
    const url_axios =
      `${process.env.REACT_APP_API_URL}/discapacidad/estudiante_discapacidad/` +
      id_estudiante.toString() +
      `/datos_caracterizacion/?id_semestre=${id_semestre_id}`;

    const response = await axios.get(url_axios, config);
    console.log(response); // Para verificar que se recibe la respuesta
    return response.data; // Retornas solo los datos que te interesan
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error);
    } else {
      alert("Error al enviar los datos, vuelva a intentarlo");
    }
    return false;
  }
};

export default {
  caracterizacionDiscapacidad,
};
