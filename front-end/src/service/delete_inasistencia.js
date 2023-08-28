import axios from 'axios';

const Delete_inasistencia = async (id) => {
    var respuesta = false;
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/inasistencia/` + id + "/";

        await axios.delete(url_axios, config)
        .then(res=>{
            console.log(res);
            respuesta = true;
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
    return respuesta;
}

export default {
    Delete_inasistencia
}