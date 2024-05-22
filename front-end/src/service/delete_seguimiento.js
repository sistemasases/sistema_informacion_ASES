/**
  * @file delete_inasistencia.js
  * @version 1.0.0
  * @description service que elimina una inasistencia.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx'
import axios from 'axios';


const Delete_seguimiento = async (id) => {
    // Variable con la respuesta si la consulta fue exitosa
    var respuesta = false;
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        // Constante que va en la url de la API para usarla en el axios
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/seguimiento_individual/` + id + "/";
        // Conexion con la API
        await axios.delete(url_axios, config)
        .then(res=>{
            // console.log(res);
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
    Delete_seguimiento
}