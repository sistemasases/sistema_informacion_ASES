import axios from 'axios';

const all_rols = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
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