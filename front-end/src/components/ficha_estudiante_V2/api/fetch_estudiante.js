import { decryptTokenFromSessionStorage } from "../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const fetchEstudiante = async (id_user, id_sede) => {
  try {
    //Configuración almacenada en un token encryptado
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };

    const apiRes = await fetch(
      `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante/${id_user}/?id_sede=${id_sede}`,
      {
        method: "GET",
        headers: config,
      }
    );

    if (!apiRes.ok) {
      throw new Error(`estudiante/ fetch not ok`);
    }

    return apiRes.json();
  } catch (error) {
    console.error("Error en fetchEstudiante:", error);
    throw error;
  }
};

export default fetchEstudiante;
