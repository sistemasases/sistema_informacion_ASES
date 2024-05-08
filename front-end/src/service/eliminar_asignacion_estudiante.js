/**
  * @file eliminar_asignacion_estudiante.js
  * @version 1.0.0
  * @description service que elimina la asignacion de un estudiante.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const eliminar_asignacion = async (id_estudiante) => {
    try {
      // Constante que va en el header con información del token para el axios
      const config = {
        headers: {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
        }
      };
      // Constante que va en la url de la API para usarla en el axios
      const url_axios = `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante` + id_estudiante.toString()+"/";
      // Conexion con la API
      const resUserRol = await axios(url_axios, config)
      return resUserRol.data;
      
    } catch (error) {
        console.log(error);
    }
  }
  
export default {
    eliminar_asignacion
}