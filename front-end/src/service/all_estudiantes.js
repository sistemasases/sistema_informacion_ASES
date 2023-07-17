import axios from 'axios';

const all_estudiantes = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = 'http://localhost:8000/usuario_rol/estudiante_selected/';
        const res = await axios.get(url_axios, config)
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_estudiantes
}