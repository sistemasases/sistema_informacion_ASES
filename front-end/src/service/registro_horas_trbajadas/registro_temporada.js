import axios from "axios";
import { decryptTokenFromSessionStorage, desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const crear_temporada_trabajo = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_temporada_trabajo/crear_temporada/`;

 

  const payload = {
    trabajador: data.trabajador,
    semestre: data.semestre,
    fecha_inicio: data.fecha_inicio,
    fecha_fin: data.fecha_fin,
    horas_semanales: data.horas_semanales,
    total_festivos_temporada: data.total_festivos_temporada,
    precio_hora: data.precio_hora,
  };

  console.log(payload)

  try {
    const response = await axios.post(url_axios, payload, { headers: config });

    if (response.status === 201) {
      Swal.fire({
        title: "Temporada creada",
        html: `
          <p><strong>Inicio:</strong> ${data.fecha_inicio.split("-").reverse().join("/")}</p>
          <p><strong>Horas semanales:</strong> ${data.horas_semanales} hrs</p>
          <p><strong>Horas totales contratadas:</strong> ${response.data.horas_total_contratadas} hrs</p>
        `,
        icon: "success",
        timer: 2500,
        showConfirmButton: true,
      });

      return response.data;
    }

  } catch (error) {
    console.error("Error al crear temporada de trabajo:", error);

    if (error.response) {

      if (error.response.status === 400) {
        const errores = error.response.data;
        const mensajes = Object.entries(errores)
          .map(([campo, msgs]) => {
            const msg = Array.isArray(msgs) ? msgs.join(", ") : msgs;
            return `<li><strong>${campo}:</strong> ${msg}</li>`;
          })
          .join("");

        Swal.fire({
          title: "Error de validación",
          html: `<ul style="text-align:left">${mensajes}</ul>`,
          icon: "warning",
          showConfirmButton: true,
          confirmButtonText: "Entendido",
          confirmButtonColor: "#ff0000",
        });

      } else if (error.response.status === 409) {
        Swal.fire({
          title: "Temporada duplicada",
          text: "Ya existe una temporada de trabajo para este trabajador en el semestre indicado.",
          icon: "warning",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#f0a500",
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
          text: "No se pudo crear la temporada. Por favor, inténtelo de nuevo.",
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

export default crear_temporada_trabajo;