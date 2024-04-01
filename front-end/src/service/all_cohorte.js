import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_cohorte = async () => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/wizard/cohorte/`;
    const resInst = await axios.get(url_axios, config);
    return resInst.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  all_cohorte,
};
