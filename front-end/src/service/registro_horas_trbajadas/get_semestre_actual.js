import axios from "axios";
import {decryptTokenFromSessionStorage,} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const url_axios = `${process.env.REACT_APP_API_URL}`;

/**
 * Obtiene el semestre actual (semestre_actual=True) de una sede específica.
 *
 * @async
 * @function obtener_semestre_actual
 * @param {number|string} sede_id - Id de la sede.
 * @returns {Promise<Object|false>}
 */
const obtener_semestre_actual = async (sede_id) => {
    const config = {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

  try {
    const response = await axios.get(`${url_axios}/wizard/semestre/${sede_id}/`, {headers: config});

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener el semestre actual:", error);
    return false;
  }
};

export default obtener_semestre_actual;