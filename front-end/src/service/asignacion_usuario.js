import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx';

const asignacion_usuario = (formData) => {
    const config = {
        Authorization: 'Bearer ' + decryptTokenFromSessionStorage(),
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/asignacion/asignacion_usuario/`;
    axios({
        url:  url_axios,
        method: "POST",
        headers: config,
        data: formData,
        // {
        //     "llamada":"asignar",
        //     "id_jefe":"1",
        //     "id_usuario": "10"
        // }
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
    asignacion_usuario
}