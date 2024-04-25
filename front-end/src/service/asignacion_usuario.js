/**
  * @file asignacion_usuario.js
  * @version 1.0.0
  * @description service que asigna un usuario a otro según su rol.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const asignacion_usuario = (formData) => {
    // Constante que va en el header con información del token para el axios
    const config = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
    };
    // url de la API
    const url_axios = `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`;
    // Interacción con la API
    axios({
        url:  url_axios,
        method: "POST",
        headers: config,
        data: formData,
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
  asignacion_usuario,
};
