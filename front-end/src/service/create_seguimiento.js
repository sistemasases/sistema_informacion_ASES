import axios from 'axios';

const create_seguimiento = async (formData) => {
    var respuesta = false;
    try {
        const url_axios = 'http://localhost:8000/seguimiento/seguimiento_individual/';

        const seguimiento = {
            "fecha": "2023-01-04",
            "lugar": "cali",
            "hora_inicio": "04:04:04.148652",
            "hora_finalización": "04:04:04.148652",
            "objetivos": "hola",
            "individual": "hola",
            "riesgo_individual": formData.riesgo_individual,
            "autoconocimiento": formData.autoconocimiento,
            "rasgos_de_personalidad": formData.rasgos_de_personalidad,
            "identificación": formData.identificación,
            "red_de_apoyo": formData.red_de_apoyo,
            "proyecto_de_vida": formData.proyecto_de_vida,
            "salud": formData.salud,
            "aspectos_motivacionales": formData.aspectos_motivacionales,
            "historia_de_vida": formData.historia_de_vida,
            "relación_eriótico_afectivas": formData.relación_eriótico_afectivas,
            "diversidad_sexual": formData.diversidad_sexual,
            "familiar": "hola",
            "riesgo_familiar": formData.riesgo_familiar,
            "dinamica_familiar": formData.dinamica_familiar,
            "academico": "hola",
            "riesgo_academico": formData.riesgo_academico,
            "desempeño_académico": formData.desempeño_académico,
            "elección_vocacional": formData.elección_vocacional,
            "manejo_del_tiempo": formData.manejo_del_tiempo,
            "economico": "hola",
            "riesgo_economico": formData.riesgo_economico,
            "apoyos_económicos_institucionales": formData.apoyos_económicos_institucionales,
            "manejo_finanzas": formData.manejo_finanzas,
            "apoyo_económico_familiar": formData.apoyo_económico_familiar,
            "situación_laboral_ocupacional": formData.situación_laboral_ocupacional,
            "vida_universitaria_ciudad": "hola",
            "riesgo_vida_universitaria_ciudad": formData.riesgo_vida_universitaria_ciudad,
            "motivación_compañamiento": formData.motivación_compañamiento,
            "referencia_geográfica": formData.referencia_geográfica,
            "adaptación_ciudad_Universidad": formData.adaptación_ciudad_Universidad,
            "oferta_servicios": formData.oferta_servicios,
            "vivienda": formData.vivienda,
            "vinculación_grupos_actividades_extracurriculares": formData.vinculación_grupos_actividades_extracurriculares,
            "apoyo_académico": formData.apoyo_académico,
            "taller_par_par": formData.taller_par_par,
            "reconocimiento_ciudad_U": formData.reconocimiento_ciudad_U,
            "rem_profesional_SE": formData.rem_profesional_SE,
            "rem_racticante_SE": formData.rem_racticante_SE,
            "rem_actividades_grupales": formData.rem_actividades_grupales,
            "rem_monitorías_académicas": formData.rem_monitorías_académicas,
            "rem_proyectos_Universidad": formData.rem_proyectos_Universidad,
            "rem_servicio_salud": formData.rem_servicio_salud,
            "rem_registro_académico": formData.rem_registro_académico,
            "rem_matrícula_financiera": formData.rem_matrícula_financiera,
            "rem_desarrollo_humano_promoción_SE": formData.rem_desarrollo_humano_promoción_SE,
            "rem_directores_programa": formData.rem_directores_programa,
            "rem_grupos_universidad": formData.rem_grupos_universidad,
            "rem_externa": formData.rem_externa,
            "Ninguna_acción_realizada": formData.Ninguna_acción_realizada,
            "observaciones": "hola",
            "revisado_profesional": formData.revisado_profesional,
            "revisado_practicante": formData.revisado_practicante,
            "primer_acercamiento": formData.primer_acercamiento,
            "cierre": formData.cierre,
            "id_creador": formData.id_creador,
            "id_modificador": formData.id_modificador,
            "id_estudiante": formData.id_estudiante
        }

        await axios.post(url_axios, seguimiento)
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
    create_seguimiento
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