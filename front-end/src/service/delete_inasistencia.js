import axios from 'axios';
import verificar_token from './verificar_token.js';
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const Delete_inasistencia = async (id) => {
    if(await verificar_token.verificar_token()){
        var respuesta = false;
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
                }
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/inasistencia/` + id + "/";

            await axios.delete(url_axios, config)
            .then(res=>{
                console.log(res);
                respuesta = true;
            })
            .catch(err=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
        return respuesta;
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}

export default {
    Delete_inasistencia
}