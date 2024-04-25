/**
  * @file create_user.js
  * @version 1.0.0
  * @description service que crea un usuario.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';
import axios from 'axios';


const user_rol = async (formData) => {
    // Variable con la respuesta si la consulta fue exitosa
    var creacion_exitosa = null;
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            }
        };
        // Constante que va en la url de la API para usarla en el axios del user
        const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/`;
        // Constante que va en la url de la API para usarla en el axios del user_rol
        const url_usuario_rol = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/`;
        //variables con la fecha de cración
        var fecha_actual = new Date();
        var fecha_actual_string = fecha_actual.toISOString();
        // Form con la información del usuario nuevo
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
        // Conexion con el API
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
  user_rol,
};
