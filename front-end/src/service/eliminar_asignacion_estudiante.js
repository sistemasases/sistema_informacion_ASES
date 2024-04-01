import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const eliminar_asignacion = async (id_estudiante) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    const url_axios =
      `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante` +
      id_estudiante.toString() +
      "/";
    const resUserRol = await axios(url_axios, config);
    return resUserRol.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  eliminar_asignacion,
};
