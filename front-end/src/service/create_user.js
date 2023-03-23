import axios from 'axios';

const user_rol = (formData) => {
    try {
        const url_axios = 'http://localhost:8000/usuario_rol/user/';
        const url_usuario_rol = 'http://localhost:8000/usuario_rol/usuario_rol/';

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

        axios({
            url:  url_axios,
            method: "POST",
            data: usuario_nuevo,
        })
        .then(res=> {
            var usuario_rol = {
                "id_rol": 2,
                "id_usuario": res.data.id,
            }
            axios.post(url_usuario_rol, usuario_rol)
            .catch(err=>{
                console.log(err);
            });
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}
  
export default {
    user_rol
}