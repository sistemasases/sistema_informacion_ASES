import axios from 'axios';

const all_users_rols = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const paramsget = {
            id_sede: sessionStorage.getItem('sede_id'),
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