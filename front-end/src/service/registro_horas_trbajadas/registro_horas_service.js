import axios from "axios";
import { decryptTokenFromSessionStorage, desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

import Swal from "sweetalert2";

const crear_registro_horas = async (data) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/crear_registro/`;

  // Sacar el id_usuario y el semestre del sessionStorage desencriptándolos
  const encryptedIdUsuario = sessionStorage.getItem("id_usuario");
  const id_usuario = desencriptar(encryptedIdUsuario);

  const encryptedSemestre = sessionStorage.getItem("id_semestre_actual");
  const id_semestre = desencriptar(encryptedSemestre);

  const payload = {
    trabajador: id_usuario,
    semestre: id_semestre,
    fecha: data.fecha,
    hora_inicio: data.hora_inicio,
    hora_fin: data.hora_fin,
    rol: data.rol,
    descripcion: data.descripcion || "",
  };

  try {
    const response = await axios.post(url_axios, payload, { headers: config });

    if (response.status === 201) {
      Swal.fire({
        title: "Registro exitoso",
        html: `
          <p><strong>Fecha:</strong> ${data.fecha.split("-").reverse().join("/")}</p>
          <p><strong>Horario:</strong> ${data.hora_inicio} – ${data.hora_fin}</p>
          <p><strong>Horas trabajadas:</strong> ${response.data.horas_trabajadas} hrs</p>
        `,
        icon: "success",
        timer: 2500,
        showConfirmButton: true,
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error al registrar horas:", error);

    if (error.response && error.response.status === 400) {
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

      return false;
    }

    Swal.fire({
      title: "Error",
      text: "No se pudo guardar el registro. Por favor, inténtelo de nuevo más tarde.",
      icon: "error",
      timer: 1500,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff0000",
    });

    return false;
  }
};

export default { crear_registro_horas };