import axios from 'axios';

const all_rols = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = 'http://localhost:8000/usuario_rol/rol/';
        const resRol = await axios.get(url_axios, config)
        return resRol.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_rols
}