import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Swal from "sweetalert2";

const obtener_registros_por_trabajador = async () => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const url_axios = `${process.env.REACT_APP_API_URL}/horas_trabajadas/registrar_horas/by_trabajador/`;

  // Leer el path encriptado
  const path = desencriptar(sessionStorage.getItem("path")) || "";

  // Extraer el id si el path es /hoja_monitor/<id>
  const pathParts = path.split("/").filter(Boolean);
  const tieneId = pathParts[0] === "hoja_monitor" && pathParts[1];
  const id_desde_path = tieneId ? pathParts[1] : null;

  // Usar el id del path si existe, sino el del usuario logueado
  const encryptedIdUsuario = sessionStorage.getItem("id_usuario");
  const id_usuario = id_desde_path || desencriptar(encryptedIdUsuario);

  const encryptedSemestre = sessionStorage.getItem("id_semestre_actual");
  const id_semestre = desencriptar(encryptedSemestre);

  const payload = {
    trabajador: id_usuario,
    semestre: id_semestre,
  };

  try {
    const response = await axios.post(url_axios, payload, { headers: config });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener registros del trabajador:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron obtener los registros.",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#ff0000",
    });
    return false;
  }
};

export default obtener_registros_por_trabajador;