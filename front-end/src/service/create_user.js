import axios from 'axios';

const user_rol = (formData) => {

    const url_axios = 'http://localhost:8000/usuario_rol/user/';

    var fecha_actual = new Date();
    var fecha_actual_string = fecha_actual.toISOString();

    var usuario_nuevo = {
        "password": formData.password,
        "last_login": null,
        "is_superuser": false,
        "username": formData.username,
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "email": formData.email,
        "is_staff": false,
        "is_active": false,
        "date_joined": fecha_actual_string
    }

    console.log(fecha_actual)
    console.log(fecha_actual_string)
    console.log(usuario_nuevo)

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