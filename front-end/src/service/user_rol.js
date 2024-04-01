import axios from "axios";
import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const user_rol = (formData) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`;

  return axios
    .post(url_axios, formData, { headers: config })
    .then((response) => {
      return response.data; // Devuelve los datos de respuesta
    })
    .catch((error) => {
      console.log(error);
      throw error; // Relanza el error para que se maneje donde se llama a la función
    });
};

export default {
  user_rol,
};
