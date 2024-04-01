import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const update_estado = async (semestre_id) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    const url_axios =
      `${process.env.REACT_APP_API_URL}/wizard/semestre/` +
      semestre_id.toString() +
      "/";
    const resUserRol = await axios(url_axios, config);
    return resUserRol.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  update_estado,
};
