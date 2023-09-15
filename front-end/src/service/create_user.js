import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const user_rol = async (formData) => {
    var creacion_exitosa = null;
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/`;
        const url_usuario_rol = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`;

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

        await axios.post(url_axios, usuario_nuevo, config)
        .then(res=> {
            creacion_exitosa = res.data.id
            var usuario_rol = {
                "id_rol": 2,
                "id_usuario": res.data.id,
                "id_sede": sessionStorage.getItem('sede_id'),
            }
            axios.post(url_usuario_rol, usuario_rol, config)
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
    return creacion_exitosa;
}
  
export default {
    user_rol
}