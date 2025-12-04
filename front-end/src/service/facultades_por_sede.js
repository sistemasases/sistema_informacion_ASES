import { decryptTokenFromSessionStorage } from "../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import axios from "axios";

const facultades_por_sede = async (id_sede) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + decryptTokenFromSessionStorage(),
      },
    };

    const url_axios = `${process.env.REACT_APP_API_URL}/reportes/estadisticas_monitorias/` + id_sede + "/facultades_sede/";

    const res = await axios.get(url_axios, config);
    return res.data;
  } catch (error) {
    console.error("Error cargando facultades por sede:", error);
    return [];
  }
};

export default {
  facultades_por_sede,
};
