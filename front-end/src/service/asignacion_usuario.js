import axios from 'axios';

const asignacion_usuario = (formData) => {
    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`;
    axios({
        url:  url_axios,
        method: "POST",
        headers: config,
        data: formData,
        // {
        //     "llamada":"asignar",
        //     "id_jefe":"1",
        //     "id_usuario": "10"
        // }
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
    asignacion_usuario
}