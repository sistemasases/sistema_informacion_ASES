/**
  * @file user_rol.js
  * @version 1.0.0
  * @description service que crea un usuario_rol.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/
 
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const user_rol = (formData) => {
    // Constante que va en el header con información del token para el axios
    const config = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
    };
    // Constante que va en la url de la API para usarla en el axios
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`;
    // Devuelve la respuesta del API
    return axios.post(url_axios, formData, { headers: config })
                .then(response => {
                    return response.data; // Devuelve los datos de respuesta
                })
                .catch(error => {
                    console.log(error);
                    throw error; // Relanza el error para que se maneje donde se llama a la función
                });
}

export default {
    user_rol
}