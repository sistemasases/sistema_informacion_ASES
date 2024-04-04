/**
  * @file asignar_rol.js
  * @version 1.0.0
  * @description service que asigna a un usuario un rol.
  * @author César Becerra
  * @contact cesar.becerra@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


// url de la API
const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva`;

const carga_masiva = (file,option) => {
    // Form a pasar por la API
    let formData = new FormData();
    // Constante que va en el header con información del token para el axios
    const config = {
      Authorization: 'Bearer ' +   decryptTokenFromSessionStorage()
    };
    // Añade archivos al formdata
    formData.append("tipo_de_carga", option);
    formData.append("file", file);
    // Conexion con la API
    axios({
      // Endpoint to send files
      url: url_carga,
      method: "POST",
      headers: config,
      // Attaching the form data
      data: formData,
    })
    .then(res=>{console.log(res.data)})
    .catch(err=>console.log(err))
  }

  export default {
    carga_masiva
}