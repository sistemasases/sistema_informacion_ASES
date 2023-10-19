import axios from 'axios'; 
import {  decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const all_rols = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/rol/`;
        const resRol = await axios.get(url_axios, config)
        return resRol.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_rols
}