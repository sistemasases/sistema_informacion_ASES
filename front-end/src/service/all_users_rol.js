import axios from 'axios'; 
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';


const all_users_rols = async (pk) => {
    if(await verificar_token.verificar_token()){
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
                }
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/actual_usuario_rol/`+ pk +"/";
            const res_usuario_rols = await axios.get(url_axios, config)
            console.log(res_usuario_rols.data)
            return res_usuario_rols;
        } catch (err) {
            console.log(err)
        }
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}

export default{
    all_users_rols
}