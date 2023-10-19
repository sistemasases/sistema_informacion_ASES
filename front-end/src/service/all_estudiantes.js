import axios from 'axios';
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad';

const all_estudiantes = async () => {
    if(await verificar_token.verificar_token()){
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
                }
            };
            const paramsget = {
                id_sede: sessionStorage.getItem('sede_id'),
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante_selected/`;
            const res = await axios.get(url_axios, config,{paramsget})
            return res.data;

        } catch (error) {
            console.log(error);
        }
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}

export default{
    all_estudiantes
}