import { decryptTokenFromSessionStorage } from "../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const fetchAcademico = async (id_user, id_sede) => {
  //Configuración almacenada en un token encryptado
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  const apiRes = await fetch(
    `${process.env.REACT_APP_API_URL}/academico/lista_historiales_academicos/${id_user}/?id_sede=${id_sede}`,
    {
      method: "GET",
      headers: config,
    }
  );

  if (!apiRes.ok) {
    throw new Error(`estudiante/ fetch not ok`);
  }

  return apiRes.json();
};

export default fetchAcademico;
