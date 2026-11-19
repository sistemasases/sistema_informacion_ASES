import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const eliminar_comentario = async (registroId, comentarioId) => {
  const config = { Authorization: "Bearer " + decryptTokenFromSessionStorage() };
  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/${registroId}/eliminar_comentario/`;

  try {
    const response = await axios.delete(url_axios, {
      data: { comentario_id: comentarioId },
      headers: config,
    });
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    if (error.response?.status === 403) {
      Swal.fire({ title: "Sin permiso", text: error.response.data.error, icon: "warning", confirmButtonColor: "#ff0000" });
    } else {
      Swal.fire({ title: "Error", text: "No se pudo eliminar el comentario.", icon: "error", confirmButtonColor: "#ff0000" });
    }
    return false;
  }
};

export default eliminar_comentario;
