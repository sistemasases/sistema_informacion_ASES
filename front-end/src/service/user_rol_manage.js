import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const user_rol_manage = async(formData,pk) => {
    try {
        const config = {
            Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`+ pk.toString()+"/";
        await axios({
            url:  url_axios,
            method: "GET",
            data: formData,
            headers: config,
        })
        .then((res => {
            return res.data
        }))
    } catch (err) {
        console.log(err)
    }
}
  
export default {
    user_rol_manage
}