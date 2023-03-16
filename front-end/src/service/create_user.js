import axios from 'axios';

const user_rol = (formData) => {

    const url_axios = 'http://localhost:8000/usuario_rol/user/';

    var fecha_actual = new Date();

    var usuario_nuevo = {
        "password": formData.password,
        "last_login": fecha_actual,
        "is_superuser": false,
        "username": formData.username,
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "email": formData.email,
        "is_staff": false,
        "is_active": true,
        "date_joined": fecha_actual,
        "groups": [],
        "user_permissions": []
    }

    axios.post(url_axios, usuario_nuevo);

    // axios({
    //     url:  url_axios,
    //     method: "POST",
    //     data: formData,
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
}
  
export default {
    user_rol
}