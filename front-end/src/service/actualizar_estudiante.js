import axios from 'axios';

const actualizar_estudiante = (formData) => {
    const url_axios = 'http://localhost:8000/usuario_rol/estudiante_actualizacion/';
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
    actualizar_estudiante
}