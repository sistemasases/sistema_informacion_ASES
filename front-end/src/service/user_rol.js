import axios from 'axios';

const user_rol = (formData) => {
    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
    const url_axios = 'http://localhost:8000/usuario_rol/usuario_rol/';
    axios({
        url:  url_axios,
        method: "POST",
        data: formData,
        headers: config,
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
    user_rol
}