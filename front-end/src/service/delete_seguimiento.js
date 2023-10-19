import axios from 'axios';
import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx'


const Delete_seguimiento = async (id) => {
    var respuesta = false;
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/seguimiento_individual/` + id + "/";

        await axios.delete(url_axios, config)
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
    Delete_seguimiento
}

// "fecha": formData.,
//             "lugar": formData.,
//             "hora_inicio": formData.,
//             "hora_finalización": formData.,
//             "objetivos": formData.,
//             "individual": formData.,
//             "riesgo_individual": formData.,
//             "autoconocimiento": formData.,
//             "rasgos_de_personalidad": formData.,
//             "identificación": formData.,
//             "red_de_apoyo": formData.,
//             "proyecto_de_vida": formData.,
//             "salud": formData.,
//             "aspectos_motivacionales": formData.,
//             "historia_de_vida": formData.riesgo_individual,
//             "relación_eriótico_afectivas": false,
//             "diversidad_sexual": false,
//             "familiar": "",
//             "riesgo_familiar": null,
//             "dinamica_familiar": false,
//             "academico": "",
//             "riesgo_academico": null,
//             "desempeño_académico": false,
//             "elección_vocacional": false,
//             "manejo_del_tiempo": false,
//             "economico": "",
//             "riesgo_economico": null,
//             "apoyos_económicos_institucionales": false,
//             "manejo_finanzas": false,
//             "apoyo_económico_familiar": false,
//             "situación_laboral_ocupacional": false,
//             "vida_universitaria_ciudad": "",
//             "riesgo_vida_universitaria_ciudad": null,
//             "motivación_compañamiento": false,
//             "referencia_geográfica": false,
//             "adaptación_ciudad_Universidad": false,
//             "oferta_servicios": false,
//             "vivienda": false,
//             "vinculación_grupos_actividades_extracurriculares": false,
//             "apoyo_académico": false,
//             "taller_par_par": false,
//             "reconocimiento_ciudad_U": false,
//             "rem_profesional_SE": false,
//             "rem_racticante_SE": false,
//             "rem_actividades_grupales": false,
//             "rem_monitorías_académicas": false,
//             "rem_proyectos_Universidad": false,
//             "rem_servicio_salud": false,
//             "rem_registro_académico": false,
//             "rem_matrícula_financiera": false,
//             "rem_desarrollo_humano_promoción_SE": false,
//             "rem_directores_programa": false,
//             "rem_grupos_universidad": false,
//             "rem_externa": false,
//             "Ninguna_acción_realizada": false,
//             "observaciones": "",
//             "revisado_profesional": false,
//             "revisado_practicante": false,
//             "primer_acercamiento": false,
//             "cierre": false,
//             "id_creador": null,
//             "id_modificador": null,
//             "id_estudiante": null