/**
 * @file fetch_estudiantes.js
 * @version 1.0.0
 * @description Este archivo se encarga de realizar la petición para obtener un
 *              estudiante en específico.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */


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
