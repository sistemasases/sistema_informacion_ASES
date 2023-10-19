import axios from 'axios';
import { desencriptar, desencriptarInt, decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';


const all_users_rols = async () => {
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
}

export default{
    all_users_rols
}