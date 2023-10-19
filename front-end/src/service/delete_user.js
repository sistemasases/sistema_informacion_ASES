import axios from 'axios';
import verificar_token from './verificar_token.js';
import close_session from './close_session.js';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const delete_user_rol = async (id_usuario) => {
    if(await verificar_token.verificar_token()){
        try {
            const config = {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
            };
            const url_axios = `${process.env.REACT_APP_API_URL}/usuario_rol/user/` + id_usuario + '/';
            const url_usuario_rol = `${process.env.REACT_APP_API_URL}/usuario_rol/usuario_rol/` + id_usuario + '/';

            axios({
                url:  url_axios,
                method: "DELETE",
                headers: config,
            })
            .catch(err=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        window.alert('Ocurrió un error, debes ingresar nuevamente');
        close_session.close_session()
    }
}
  
export default {
    delete_user_rol
}