/**
  * @file delete_user.js
  * @version 1.0.0
  * @description service que elimina un usuario y su usuario_rol.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const delete_user_rol = (id_usuario) => {
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
        };
        // Constante que va en la url de la API para usarla en el axios usuario
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/` + id_usuario + '/';
        // Constante que va en la url de la API para usarla en el axios usuario_rol
        const url_usuario_rol = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/` + id_usuario + '/';
        // Conexion con la API
        axios({
            url:  url_axios,
            method: "DELETE",
            headers: config,
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}
  
export default {
  delete_user_rol,
};
