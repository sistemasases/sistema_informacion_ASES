import axios from 'axios';
import verificar_token from './verificar_token.js'
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx'

const create_inasistencia = async (formData) => {
    if(await verificar_token.verificar_token()){
        var respuesta = false;
        try {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
                }
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/inasistencia/`;

            const inasistencia = {
                "fecha": formData.fecha,
                "observaciones": formData.observaciones,
                "revisado_profesional": formData.revisado_profesional,
                "revisado_practicante": formData.revisado_practicante,
                "id_creador": formData.id_creador,
                "id_modificador": formData.id_modificador,
                "id_estudiante": formData.id_estudiante
            }

            await axios.post(url_axios, inasistencia, config)
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
    create_inasistencia
}