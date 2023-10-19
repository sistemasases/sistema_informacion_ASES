import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
const Update_inasistencia = async (formData) => {
    var respuesta = false;
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/inasistencia/` + formData.id + "/";

        const inasistencia = {
            "fecha": formData.fecha,
            "observaciones": formData.observaciones,
            "revisado_profesional": formData.revisado_profesional,
            "revisado_practicante": formData.revisado_practicante,
            "id_creador": formData.id_creador,
            "id_modificador": formData.id_modificador,
            "id_estudiante": formData.id_estudiante
        }

        await axios.patch(url_axios, inasistencia, config)
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
}

export default {
    Update_inasistencia
}