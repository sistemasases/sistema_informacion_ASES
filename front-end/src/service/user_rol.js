import axios from 'axios';

const user_rol = (formData) => {
    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`;
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