import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const all_program_formularios_externos = async () => {
  try {
    // Constante que va en el header con información del token para el axios
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    //   },
    // };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/enviar_programas/`;
    // Interacción con la API
    const resInst = await axios.get(url_axios);
    return resInst.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  all_program_formularios_externos,
};
