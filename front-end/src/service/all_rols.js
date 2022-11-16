import axios from 'axios';

const all_rols = async () => {
    try {
        const url_axios = 'http://localhost:8000/usuario_rol/rol/';
        const resRol = await axios(url_axios)
        return resRol.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_rols
}