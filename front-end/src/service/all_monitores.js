import axios from 'axios';

const all_monitores = async () => {
    try {
        const url_axios = 'http://localhost:8000/usuario_rol/monitor/';
        const res = await axios.get(url_axios 
        //     {
        //         headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem('token')
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
    all_monitores
}