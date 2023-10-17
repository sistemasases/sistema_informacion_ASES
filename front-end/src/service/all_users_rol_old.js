import axios from 'axios';
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { desencriptar, desencriptarInt, decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';


const all_users_rols = async () => {
    if(await verificar_token.verificar_token()){
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
                }
            };
            const paramsget = {
                id_sede: desencriptarInt(localStorage.getItem('id_sede')),
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol_old/`;
            const resUserRol = await axios(url_axios, config,{paramsget})
            return resUserRol.data;

        } catch (error) {
            console.log(error);
        }
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}

export default{
    all_users_rols
}