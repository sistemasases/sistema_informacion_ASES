import axios from 'axios';

const all_profesionales = async () => {
    try {
        const url_axios = 'http://localhost:8000/usuario_rol/profesional/';
        const res = await axios.get(url_axios 
        //     {
        //         headers: {
        //         Authorization: 'Bearer ' + sessionStorage.getItem('token')
        //         }
        //    }
        )
        return res.data;
        
    } catch (error) {
    //     const resRol = {'data': 'error'}
    //     return(resRol.data);
        console.log(error);
    }
}

export default{
    all_profesionales
}