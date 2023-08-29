import axios from 'axios';

const create_inasistencia = async (formData) => {
    var respuesta = false;
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/inasistencia/`;

        const inasistencia = {
            "fecha": formData.fecha,
            "observaciones": formData.observaciones,
            "revisado_profesional": formData.revisado_profesional,
            "revisado_practicante": formData.revisado_practicante,
            "id_creador": formData.id_creador,
            "id_modificador": formData.id_modificador,
            "id_estudiante": formData.id_estudiante
        }

        await axios.post(url_axios, inasistencia, config)
        .then(res=>{
            console.log(res);
            respuesta = true;
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
    return respuesta;
}

export default {
    create_inasistencia
}