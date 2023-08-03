import axios from 'axios';

const all_estudiantes_reportes = async () => {
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = 'http://localhost:8000/usuario_rol/estudiante_selected2/';
        // const url_axios = 'http://127.0.0.1:8000/reportes/estudiante_por_rol/'
        const res = await axios.get(url_axios, config)
        return res.data;
        
    } catch (error) {
        console.log(error);
    }
}

export default{
    all_estudiantes_reportes
}