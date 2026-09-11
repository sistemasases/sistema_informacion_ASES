import axios from "axios";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const actualizar_temporada_trabajo = async (idTemporada, data) => {

  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_temporada_trabajo/${idTemporada}/actualizar_temporada/`;

  const payload = {
    fecha_inicio: data.fecha_inicio,
    fecha_fin: data.fecha_fin,
    horas_semanales: data.horas_semanales,
    total_festivos_temporada: data.total_festivos_temporada,
  };

  console.log(payload);

  try {

    const response = await axios.patch(
      url_axios,
      payload,
      { headers: config }
    );

    if (response.status === 200) {

      Swal.fire({
        title: "Temporada actualizada",
        html: `
          <p><strong>Inicio:</strong> ${response.data.fecha_inicio.split("-").reverse().join("/")}</p>
          <p><strong>Fin:</strong> ${response.data.fecha_fin.split("-").reverse().join("/")}</p>
          <p><strong>Horas semanales:</strong> ${response.data.horas_semanales} hrs</p>
          <p><strong>Horas totales contratadas:</strong> ${response.data.horas_total_contratadas} hrs</p>
        `,
        icon: "success",
        timer: 2500,
        showConfirmButton: true,
      });

      return response.data;
    }

  } catch (error) {

    console.error("Error al actualizar temporada:", error);

    if (error.response) {

      if (error.response.status === 400) {

        const errores = error.response.data;

        let mensajes = "";

        if (typeof errores.error === "string") {

          mensajes = `<p>${errores.error}</p>`;

        } else {

          mensajes = Object.entries(errores)
            .map(([campo, msgs]) => {
              const msg = Array.isArray(msgs)
                ? msgs.join(", ")
                : msgs;

              return `<li><strong>${campo}:</strong> ${msg}</li>`;
            })
            .join("");

          mensajes = `<ul style="text-align:left">${mensajes}</ul>`;
        }

        Swal.fire({
          title: "Error de validación",
          html: mensajes,
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#ff0000",
        });

      } else if (error.response.status >= 500) {

        Swal.fire({
          title: "Error del servidor",
          text: "Ocurrió un error interno. Por favor, inténtelo más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#ff0000",
        });

      } else {

        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar la temporada.",
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

export default actualizar_temporada_trabajo;