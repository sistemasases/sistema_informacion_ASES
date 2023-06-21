import axios from 'axios';

const all_rols = async () => {
    try {
        const url_axios = 'http://localhost:8000/usuario_rol/rol/';
        const resRol = await axios.get(url_axios 
        //     {
        //         headers: {
        //         Authorization: 'Bearer ' + sessionStorage.getItem('token')
        //         }
        //    }
        )
        return resRol.data;
        
    } catch (error) {
    //     const resRol = {'data': 'error'}
    //     return(resRol.data);
        console.log(error);
    }
}

export default{
    all_rols
}