/**
  * @file create_seguimiento.js
  * @version 1.0.0
  * @description service que crea un seguimiento.
  * @author Deiby A. Rodriguez R.
  * @contact deiby.rodriguez@correounivalle.edu.co
  * @date 13 de febrero del 2024
*/

import { decryptTokenFromSessionStorage } from '../modulos/utilidades_seguridad/utilidades_seguridad.jsx'
import axios from 'axios';


const create_seguimiento = async (formData) => {
    // Variable con la respuesta si la consulta fue exitosa
    var respuesta = false;
    try {
        // Constante que va en el header con información del token para el axios
        const config = {
            headers: {
                Authorization: 'Bearer ' + decryptTokenFromSessionStorage()
            }
        };
        // Constante que va en la url de la API para usarla en el axios
        const url_axios = `${process.env.REACT_APP_API_URL}/seguimiento/seguimiento_individual/`;
        // Json con la información del seguimiento
        const seguimiento = {
            "fecha": formData.fecha,
            "lugar": formData.lugar,
            "hora_inicio": formData.hora_inicio,
            "hora_finalización": formData.hora_finalización,
            "objetivos": formData.objetivos,
            "individual": formData.individual,
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
            "familiar": formData.familiar,
            "riesgo_familiar": formData.riesgo_familiar,
            "dinamica_familiar": formData.dinamica_familiar,
            "academico": formData.academico,
            "riesgo_academico": formData.riesgo_academico,
            "desempeño_académico": formData.desempeño_académico,
            "elección_vocacional": formData.elección_vocacional,
            "manejo_del_tiempo": formData.manejo_del_tiempo,
            "economico": formData.economico,
            "riesgo_economico": formData.riesgo_economico,
            "apoyos_económicos_institucionales": formData.apoyos_económicos_institucionales,
            "manejo_finanzas": formData.manejo_finanzas,
            "apoyo_económico_familiar": formData.apoyo_económico_familiar,
            "situación_laboral_ocupacional": formData.situación_laboral_ocupacional,
            "vida_universitaria_ciudad": formData.vida_universitaria_ciudad,
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
            "observaciones": formData.observaciones,
            "revisado_profesional": formData.revisado_profesional,
            "revisado_practicante": formData.revisado_practicante,
            "primer_acercamiento": formData.primer_acercamiento,
            "cierre": formData.cierre,
            "id_creador": formData.id_creador,
            "id_modificador": formData.id_modificador,
            "id_estudiante": formData.id_estudiante
        }
        // Conexion con la API
        await axios.post(url_axios, seguimiento, config)
        .then(res=>{
            // console.log(res);
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