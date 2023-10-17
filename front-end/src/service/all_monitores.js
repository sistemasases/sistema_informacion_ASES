import axios from 'axios';
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage, desencriptarInt } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const all_monitores = async () => {
    if(await verificar_token.verificar_token()){
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
                }
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/monitor/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/";
            const res = await axios.get(url_axios, config)
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
    all_monitores
}