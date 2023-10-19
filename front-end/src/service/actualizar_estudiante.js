import axios from 'axios';
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad';

const actualizar_estudiante = async (formData) => {
    if(await verificar_token.verificar_token()){
        const config = {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante_actualizacion/`;
        axios({
            url:  url_axios,
            method: "POST",
            headers: config,
            data: formData,
        })
        .catch(err=>{
            console.log(err);
        })
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}
  
export default {
    actualizar_estudiante
}