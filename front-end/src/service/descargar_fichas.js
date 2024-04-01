import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const descargar_fichas = async (form) => {
  var response = null;
  try {
    const config = {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    };
    const url_descarga = `${process.env.REACT_APP_API_URL}/seguimiento/seguimientos_individual/descarga/`;

    await axios({
      url: url_descarga,
      method: "POST",
      headers: config,
      data: form,
    })
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = false;
      });
  } catch {
    response = false;
  }
  return response;
};

export default {
  descargar_fichas,
};
