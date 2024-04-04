/**
  * @file update_estado_semestre.js
  * @version 1.0.0
  * @description service que actualiza el estado del semestre.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const update_estado = async (semestre_id) => {
  try {
    // Constante que va en el header con información del token para el axios
    const config = {
      headers: {
          Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
      }
    };
    // Constante que va en la url de la API para usarla en el axios
    const url_axios = `${process.env.REACT_APP_API_URL}/wizard/semestre/` + semestre_id.toString()+"/";
    // Conexion con la API
    const resUserRol = await axios(url_axios, config)
    return resUserRol.data;

  } catch (error) {
      console.log(error);
  }
}
  
export default {
    update_estado
}