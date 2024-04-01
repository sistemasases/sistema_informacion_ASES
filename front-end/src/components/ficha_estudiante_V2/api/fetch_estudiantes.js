import { decryptTokenFromSessionStorage } from "../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const fetchEstudiantes = async (id_user, id_sede, user_rol) => {
  try {
    //Configuración almacenada en un token encryptado
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const apiRes = await fetch(
      `${process.env.REACT_APP_API_URL}/reportes/estudiante_por_rol/${id_user}/?usuario_rol=${user_rol}&sede=${id_sede}`,
      {
        method: "GET",
        headers: config,
      }
    );

    if (!apiRes.ok) {
      throw new Error(`estudiante_por_rol/ fetch not ok`);
    }

    return apiRes.json();
  } catch (error) {
    console.error("Error en fetchEstudiantes:", error);
    throw error;
  }
};

export default fetchEstudiantes;
