import axios from 'axios';

const user_rol = (formData) => {
    const url_axios = 'http://127.0.0.1:8000/usuario_rol/user_rol/';
    axios({
        url:  url_axios,
        method: "POST",
        data: formData,
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
    user_rol
}