import axios from 'axios';

const crear_asignacion = (formData) => {
    const url_axios = 'http://localhost:8000/asignacion/asignacion_estudiante';
    axios({
        url:  url_axios,
        method: "POST",
        data: formData,
        // {
        //     "id_usuario":"14",
        //     "id_estudiante": "16"
        // }
    })
    .catch(err=>{
        console.log(err);
    })
}
  
export default {
    crear_asignacion
}