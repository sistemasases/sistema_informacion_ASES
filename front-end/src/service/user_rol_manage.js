/**
  * @file user_rol_manage.js
  * @version 1.0.0
  * @description service que trae un usuario_rol por su id.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const user_rol_manage = async(formData,pk) => {
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
        };
        // Constante que va en la url de la API para usarla en el axios
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`+ pk.toString()+"/";
        // Conexion con la API
        await axios({
            url:  url_axios,
            method: "GET",
            data: formData,
            headers: config,
        })
        .then((res => {
            return res.data
        }))
    } catch (err) {
        console.log(err)
    }
}
  
export default {
  user_rol_manage,
};
