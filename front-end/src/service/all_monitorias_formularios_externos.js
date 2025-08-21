/**
 * @file all_monitorias_formularios_externos.js
 * @version 1.0.0
 * @description Service para obtener monitorias en los formularios externos.
 * @author @iMrStevenS2.
 * @contact steven.bernal@correounivalle.edu.co
 * @date 25 de Junio del 2024
 */

import axios from "axios";

const all_monitorias_formularios_externos = async (id_monitoria) => {
  try {
    // Constante que va en el header con información del token para el axios
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    //   },
    // };

    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/formularios_externos/enviar_monitorias/`;

    // Interacción con la API
    const res = await axios.get(url_axios);
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};

export default { all_monitorias_formularios_externos };
