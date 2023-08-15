import axios from 'axios';

const crear_asignacion = (formData) => {
    const config = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
    };
    const url_axios = `${process.env.REACT_APP_API_URL}/asignacion/asignacion_estudiante`;
    axios({
        url:  url_axios,
        method: "POST",
        headers: config,
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