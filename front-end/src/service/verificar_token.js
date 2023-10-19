import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const verificar_token = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        const token = {
            "token": decryptTokenFromSessionStorage()
        }
        const url_axios = `${process.env.REACT_APP_API_URL}/validate`;
        const resInst = await axios.post(url_axios, token, config)
        if('Tienes un token activo' === resInst.data['message']){
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
  }

  export default {
    verificar_token
}