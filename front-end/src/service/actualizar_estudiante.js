import axios from 'axios';

const actualizar_estudiante = (formData) => {
    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/estudiante_actualizacion/`;
    axios({
        url:  url_axios,
        method: "POST",
        headers: config,
        data: formData,
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
    actualizar_estudiante
}