/**
  * @file all_users_rols.js
  * @version 1.0.0
  * @description service que retorna todos los usuarios con rol activos en este semestre y sede.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios'; 


const all_users_rols = async (pk) => {
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        // url de la API
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/actual_usuario_rol/`+ pk +"/";
        // Interacción con la API
        const res_usuario_rols = await axios.get(url_axios, config)
        return res_usuario_rols;
    } catch (err) {
        console.log(err)
    }
}

export default{
    all_users_rols
}