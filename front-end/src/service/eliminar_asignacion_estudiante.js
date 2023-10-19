import axios from 'axios';
import verificar_token from './verificar_token.js';
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const eliminar_asignacion = async (id_estudiante) => {
  if(await verificar_token.verificar_token()){
    try {
      const config = {
        headers: {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
        }
      };
      const url_axios = `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante` + id_estudiante.toString()+"/";
      const resUserRol = await axios(url_axios, config)
      return resUserRol.data;
      
    } catch (error) {
        console.log(error);
    }
  } else {
    window.alert('Ocurrió un error, debes ingresar nuevamente');
    close_session.close_session()
  }
}
  
export default {
    eliminar_asignacion
}