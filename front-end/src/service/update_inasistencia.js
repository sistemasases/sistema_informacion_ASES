/**
  * @file update_inasistencia.js
  * @version 1.0.0
  * @description service que actualiza una inasistencia.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const Update_inasistencia = async (formData) => {
    // Variable con la respuesta si la consulta fue exitosa
    var respuesta = false;
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            }
        };
        // Constante que va en la url de la API para usarla en el axios
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/inasistencia/` + formData.id + "/";
        // Json con la información de la inasistencia
        const inasistencia = {
            "fecha": formData.fecha,
            "observaciones": formData.observaciones,
            "revisado_profesional": formData.revisado_profesional,
            "revisado_practicante": formData.revisado_practicante,
            "id_creador": formData.id_creador,
            "id_modificador": formData.id_modificador,
            "id_estudiante": formData.id_estudiante
        }
        // Conexion con la API
        await axios.patch(url_axios, inasistencia, config)
        .then(res=>{
            console.log(res);
            respuesta = true;
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
    return respuesta;
}

export default {
    Update_inasistencia
}