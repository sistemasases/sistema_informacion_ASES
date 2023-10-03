import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';


const all_sede = async () => {

    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/wizard/instancia/`;
        console.log("URL de la API:", url_axios); // Agrega este log para verificar la URL
        const resInst = await axios.get(url_axios, config)
        return resInst.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_sede
}