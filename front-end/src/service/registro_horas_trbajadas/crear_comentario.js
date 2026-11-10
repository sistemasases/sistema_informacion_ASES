import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_comentario = async (registroId, contenido) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/${registroId}/crear_comentario/`;

  try {
    const response = await axios.post(url_axios, { contenido }, { headers: config });
    if (response.status === 201) return response.data;
  } catch (error) {
    console.error("Error al crear comentario:", error);
    if (error.response?.status === 400) {
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#ff0000",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el comentario.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ff0000",
      });
    }
    return false;
  }
};

export default crear_comentario;
