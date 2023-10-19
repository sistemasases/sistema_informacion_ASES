import axios from 'axios'; 
import verificar_token from './verificar_token.js';
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const user_rol = async (formData) => {
    if(await verificar_token.verificar_token()){
        const config = {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`;

        return axios.post(url_axios, formData, { headers: config })
            .then(response => {
                return response.data; // Devuelve los datos de respuesta
            })
            .catch(error => {
                console.log(error);
                throw error; // Relanza el error para que se maneje donde se llama a la función
            });
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}

export default {
    user_rol
}
