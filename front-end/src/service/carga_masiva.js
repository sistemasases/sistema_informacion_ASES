import axios from 'axios';
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva`;

const carga_masiva = async (file,option) => {
  if(await verificar_token.verificar_token()){
    let formData = new FormData();
    const config = {
      Authorization: 'Bearer ' +   decryptTokenFromSessionStorage()
    };
  
    //Adding files to the formdata
    formData.append("tipo_de_carga", option);
    formData.append("file", file);
  
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
  } else {
    window.alert('Ocurrió un error, debes ingresar nuevamente');
    close_session.close_session()
  }
}

  export default {
    carga_masiva
}