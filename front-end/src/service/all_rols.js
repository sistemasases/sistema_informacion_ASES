import axios from 'axios';

const all_rols = async () => {
    try {
        const url_axios = 'http://127.0.0.1:8000/usuario_rol/allrol/';
        const resRol = await axios(url_axios)
        return resRol.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_rols
}