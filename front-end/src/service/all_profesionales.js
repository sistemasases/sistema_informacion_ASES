import axios from 'axios';
import { decryptTokenFromSessionStorage, desencriptarInt } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const all_profesionales = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/profesional/`+desencriptarInt(sessionStorage.getItem('sede_id'))+"/";
        const res = await axios.get(url_axios, config)
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_profesionales
}