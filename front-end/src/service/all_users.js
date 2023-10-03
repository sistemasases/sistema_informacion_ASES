import axios from 'axios'; 
import {decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const all_users = async () => {
  try {
    const config = {
      headers: {
          Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
      }
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/`;
    const resUserRol = await axios(url_axios, config)
    return resUserRol.data;
    
  } catch (error) {
      console.log(error);
  }
}

  export default {
    all_users
}