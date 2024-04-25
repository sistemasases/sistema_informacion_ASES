/**
  * @file all_users_rols_old.js
  * @version 1.0.0
  * @description service que retorna todos los usuarios con rol del semestre anterior.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { desencriptarInt, decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const all_users_rols = async () => {
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        // id de la sede actual
        const paramsget = {
            id_sede: desencriptarInt(localStorage.getItem('id_sede')),
          };
        // url de la API
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol_old/`;
        // Interacción con la API
        const resUserRol = await axios(url_axios, config,{paramsget})
        return resUserRol.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default {
  all_users_rols,
};
