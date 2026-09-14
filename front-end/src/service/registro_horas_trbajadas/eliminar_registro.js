import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

/**
 * Elimina un registro de horas trabajadas por su ID.
 *
 * @async
 * @function eliminar_registro
 * @param {number} id - ID del registro a eliminar.
 * @returns {Promise<boolean>} `true` si se eliminó correctamente, `false` si falla.
 *
 * @example
 * const eliminado = await eliminar_registro(5);
 * if (eliminado) {
 *   // quitar el registro del estado local
 * }
 */
const eliminar_registro = async (id) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/${id}/eliminar_registro/`;

  try {
    const response = await axios.delete(url_axios, { headers: config });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Error al eliminar el registro:", error);

    const msg =
      error.response?.data?.error ||
      "No se pudo eliminar el registro. Intenta de nuevo.";

    Swal.fire({
      title: "Error",
      text: msg,
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#D42B2B",
    });
    return false;
  }
};

export default eliminar_registro;