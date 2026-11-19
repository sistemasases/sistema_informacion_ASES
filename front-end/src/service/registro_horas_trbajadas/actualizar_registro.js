import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

/**
 * Actualiza parcialmente un registro de horas trabajadas.
 *
 * @async
 * @function actualizar_registro
 * @param {number} id - ID del registro a actualizar.
 * @param {Object} payload - Campos a actualizar.
 * @param {string} [payload.fecha] - Fecha del registro en formato "YYYY-MM-DD".
 * @param {string} [payload.hora_inicio] - Hora de inicio en formato "HH:MM:SS".
 * @param {string} [payload.hora_fin] - Hora de fin en formato "HH:MM:SS".
 * @param {string} [payload.descripcion] - Descripción de la actividad.
 * @returns {Promise<Object|false>} Los datos actualizados del registro, o `false` si falla.
 *
 * @example
 * const resultado = await actualizar_registro(5, {
 *   fecha: "2025-05-20",
 *   hora_inicio: "08:00:00",
 *   hora_fin: "12:00:00",
 *   descripcion: "Soporte técnico",
 * });
 */
const actualizar_registro = async (id, payload) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/${id}/actualizar_registro/`;

  try {
    const response = await axios.patch(url_axios, payload, { headers: config });

    if (response.status === 200) {
      Swal.fire({
        title: "Actualizado",
        text: "El registro fue actualizado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#D42B2B",
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error al actualizar el registro:", error);

    const data = error.response?.data;
    let msg = "No se pudo actualizar el registro. Intenta de nuevo.";

    if (data) {
      if (data.error) {
        // Error de vista: { error: "mensaje" }
        msg = data.error;
      } else {
        // Errores del serializer: { campo: ["mensaje", ...], ... }
        const mensajes = Object.values(data).flat();
        if (mensajes.length > 0) msg = mensajes.join(" ");
      }
    }

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

export default actualizar_registro;