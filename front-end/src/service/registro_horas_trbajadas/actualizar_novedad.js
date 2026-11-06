import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const actualizar_novedad = async (idNovedad, datos) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/novedades_horas/${idNovedad}/actualizar_novedad/`;

  try {
    const response = await axios.patch(url_axios, datos, { headers: config });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al actualizar novedad:", error);

    if (error.response) {
      if (error.response.status === 400) {
        Swal.fire({
          title: "No se puede guardar",
          text: error.response.data.error,
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#ff0000",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar la novedad.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#ff0000",
        });
      }
    } else {
      Swal.fire({
        title: "Error de conexión",
        text: "No fue posible conectarse con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#ff0000",
      });
    }

    return false;
  }
};

export default actualizar_novedad;
