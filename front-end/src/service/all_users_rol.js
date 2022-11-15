import axios from 'axios';

const all_users_rols = async () => {
    try {
        const url_axios = 'http://127.0.0.1:8000/usuario_rol/all_user_rol/';
        const resUserRol = await axios(url_axios)
        return resUserRol.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_users_rols
}