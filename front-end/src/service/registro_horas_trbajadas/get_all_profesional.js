import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

import Swal from "sweetalert2";

const obtener_registros_profesional = async (data) => {

  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const semestre_id = data.semestre_id;
  const festivos = data.diasFestivos;

  const encryptedIdUsuario = sessionStorage.getItem("id_usuario");
  const id_usuario = desencriptar(encryptedIdUsuario);


  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/${id_usuario}/get_info_profesional/`;

  const params = {semestre: semestre_id, dias_festivos: festivos} 


  try {

    const response = await axios.get(
      url_axios,
      { headers: config,
        params: params
       }
    );

    if (response.status === 200) {
      return response.data;
    }

  } catch (error) {

    console.error(
      "Error al obtener registros del profesional:",
      error
    );

    if (error.response) {

      // errores enviados por el backend
      if (error.response.status === 404) {

        Swal.fire({
          title: "Sin registros",
          text: "No se encontraron registros de subordinados.",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3085d6",
        });

      } else if (error.response.status >= 500) {

        Swal.fire({
          title: "Error del servidor",
          text: "Ocurrió un error interno en el servidor.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#ff0000",
        });

      } else {

        Swal.fire({
          title: "Error",
          text: "No se pudieron obtener los registros.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#ff0000",
        });

      }

    } else {

      // errores de red o conexión
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

export default obtener_registros_profesional;