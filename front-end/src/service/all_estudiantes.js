import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad';

const all_estudiantes = async () => {
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
}

export default{
    all_estudiantes
}