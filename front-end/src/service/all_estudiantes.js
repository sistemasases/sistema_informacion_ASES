/**
  * @file all_estudiantes.js
  * @version 1.0.0
  * @description service que retorna todos los estudiante.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad';
import axios from 'axios';


const all_estudiantes = async () => {
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            }
        };
        // id de la sede
        const paramsget = {
            id_sede: sessionStorage.getItem('sede_id'),
        };
        // url de la API
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante_selected/`;
        // Interacción con la API
        const res = await axios.get(url_axios, config,{paramsget})
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_estudiantes
}