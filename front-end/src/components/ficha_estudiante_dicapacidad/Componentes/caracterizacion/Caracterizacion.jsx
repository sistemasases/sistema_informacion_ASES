import Acordion from "../Acordion";
import DatosEntrevistador from "./DatosEntrevistador";
import DatosEntrevistado from "./DatosEntrevistado";
import DatosEconomicos from "./DatosEconomicos";
import DatosAcademicosAdicionales from "./DatosAcademicosAdicionales";
import AccesoServiciosSalud from "./AccesoServiciosSalud";
import PercepcionCaracteristicasDiscapacidad from "./PercepcionCaracteristicasDiscapacidad";
import ConclusionJornadaCaracterizacion from "./ConclusionJornadaCaracterizacion";
import semestres_discapacidad from "../../../../service/semestres_discapacidad";
import withSwal from "../withSwal";
import DatosAcademicos from "./DatosAcademicos";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../../../modulos/utilidades_seguridad/utilidades_seguridad";
import { useEffect, useState } from "react";
import CaracterizacionDiscapacidad from "../../../../service/caracterizacion_discapacidad";
import { useAuthStore } from "../../store/auth";
import { set } from "date-fns";

const Caracterizacion = () => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage,
  };
  const [semestres, setSemestres] = useState([]);
  const [semestreActual, setSemestreActual] = useState("");
  const { estudianteSelected } = useAuthStore();
  const id_semestre = 40;

  useEffect(() => {
    semestres_discapacidad.semestres_discapacidad().then((res) => {
      setSemestres(res);
      console.log(res);
    });

    const semestre = desencriptar(sessionStorage.semestre_actual);
    setSemestreActual(semestre);
  }, []);

  const [datos_entrevistador, setDatosEntrevistador] = useState({
    entrevistador: "",
    cargo: "",
    celular: "",
    profesion: "",
  });

  const [datos_estudiante_entrevistado, setDatosEstuidanteEntrevistado] =
    useState({
      fecha_nac: "",
      ciudad: "lentuang",
      pais: "paris",
      // profesion: "",
    });

  const [datos_economicos, setDatosEconomicos] = useState({
    estrato_socio: 3,
    expectativas_laborales: "Trabajar en el área de tecnología",
    id: 1,
    nivel_educativo_madre: "Secundario",
    nivel_educativo_padre: "Universitario",
    ocupacion_madre: "Profesora",
    ocupacion_padre: "Ingeniero",
    recibe_beca: false,
    recibe_finan_materiales: false,
    recibe_prestacion_econo: true,
    recibe_transporte: true,
    situacion_madre: "Empleo estable",
    situacion_padre: "Empleo estable",
    solvencia_economica: true,

    permanencia_ingresos_propios: "",
    permanencia_ingresos_familiares: "",
    permanencia_ingresos_otros: "",
    permanencia_ingresos_otros_texto: "",
    requiere_materiales: "",
    valor_materiales: "",
    transporte_privado: "",
    transporte_publico: "",
    transporte_propio: "",
    transporte_otro: "",
    valor_transporte: "",
    valor_sostenimiento: "",
    actualmente_vive_estado: "",
    actualmente_vive_parentezco: "",
    tiene_hijos: "",
    hijos_numero: "",
    motivo_ingreso: "",
    expectativas_carrera: "",
    expectativas_grado: "",
    labor_padre: "",
    labor_madre: "",
    otro_familiar_nivel_educativo: "",
    otro_familiar_situacion_economica: "",
    otro_familiar_actividad_economica: "",
    otro_familiar_labor_desempena: "",
  });

  const [datos_academicos, setDatosAcademicos] = useState({
    id: 1,
    numero_resolucion: 123456789,
    creditos_programa: 120,
    titulo_obtenido: "Ingeniería en Sistemas",
    institucion: "Universidad Nacional",
    nivel_formacion: "Pregrado",
    apoyos_recibidos: "Beca parcial",
    observaciones: "Excelente desempenio académico.",
    dificultades: "Ninguna significativa",
  });

  const [datos_academicos_adicionales, setDatosAcademicosAdicionales] =
    useState({});

  const [percepcion_discapacidad, setPercepcionDiscapacidad] = useState({
    id: 1,
    considera_discapacidad: true,
    consideracion: "Considera que la discapacidad impacta significativamente.",
    adquisicion: "Discapacidad adquirida.",
    cuenta_con_diagnostico: true,
    tipo_diagnostico: "Diagnóstico clínico",
    certificado_invalidez: true,
    documento_soporte: true,
    vision: true,
    vision_texto: "Visión reducida",
    audicion: false,
    audicion_texto: null,
    voz_y_habla: true,
    voz_y_habla_texto: "Dificultades en la articulación",
    movimiento_cuerpo: false,
    movimiento_cuerpo_texto: null,
    cognicion: true,
    cognicion_texto: "Disminución leve",
    estado_socio_emocional: true,
    estado_socio_emocional_texto: "Estrés moderado",
    relaciones_sexuales: false,
    relaciones_sexuales_texto: null,
    deglucion: true,
    deglucion_texto: "Dificultades ocasionales",
    ojos: true,
    ojos_texto: "Visión reducida",
    oidos: false,
    oidos_texto: null,
    vocales: true,
    vocales_texto: "Problemas con la articulación",
    manos: false,
    manos_texto: null,
    piernas: true,
    piernas_texto: "Dificultades ocasionales",
    piel: false,
    piel_texto: null,
    cerebro: true,
    cerebro_texto: "Impacto leve en funciones cognitivas",
    sistema_nervioso: false,
    sistema_nervioso_texto: null,
    sistema_cardio: true,
    sistema_cardio_texto: "Condición leve",
    sistema_genital: false,
    sistema_genital_texto: null,
    sistema_digestivo: true,
    sistema_digestivo_texto: null,
    cursos: true,
    cursos_texto: "Curso de adaptación",
    clases_magistrales: false,
    clases_magistrales_texto: null,
    laboratorios: true,
    laboratorios_texto: "Adaptación a laboratorios",
    secuencias_numericas: false,
    secuencias_numericas_texto: null,
    talleres: true,
    talleres_texto: "Participación en talleres",
    conferencias: false,
    conferencias_texto: null,
    practica_deportiva: true,
    practica_deportiva_texto: "Adaptación en deportes",
    ocio: false,
    ocio_texto: null,
    movilizacion: true,
    movilizacion_texto: "Asistencia en movilidad",
    conciertos: false,
    conciertos_texto: null,
    servicios_salud: true,
    servicios_salud_texto: "Atención médica regular",
    asambleas: false,
    asambleas_texto: null,
    alimentos_cafeteria: true,
    alimentos_cafeteria_texto: "Acceso a alimentos adaptados",
    tramites: false,
    tramites_texto: null,
    otra: false,
    otra_texto: null,
    condicion_discapacidad: true,
    contexto_universitario: false,
    ausencia_ayuda_tec: true,
    ausencia_espacios_fisicos: false,
    ausencia_materiales_impresos: false,
    ausencia_personas_apoyo: false,
    actitudes_negativas_personas: true,
    ausencia_servicios_discapacidad: false,
    otros_factores: true,
    otros_factores_texto: "Factores adicionales",
    condicion_psicoemocional: true,
    otra_psicoemocional: false,
    otra_psicoemocional_texto: null,
    escritos_impresos: true,
    escritos_impresos_numero: 10,
    imagenes_pantalla: false,
    imagenes_pantalla_numero: null,
    copia_dictado: true,
    copia_dictado_numero: 5,
    transcripcion_textos: true,
    transcripcion_textos_numero: 3,
    manuales_escritos: false,
    manuales_escritos_numero: null,
    textos_pantalla: true,
    textos_pantalla_numero: 7,
    redactar: false,
    redactar_numero: null,
    elaborar_ideas: true,
    elaborar_ideas_numero: 4,
    escuchar: true,
    escuchar_numero: 6,
    expre_oral: false,
    expre_oral_numero: null,
    compren_oral: true,
    compren_oral_numero: 8,
    interactuar: false,
    interactuar_numero: null,
    rel_interpersonales: true,
    rel_interpersonales_numero: 2,
    desplazarse: true,
    desplazarse_numero: 9,
    manipular_obj: false,
    manipular_obj_numero: null,
    mant_sentado: true,
    mant_sentado_numero: 12,
    asearse: true,
    asearse_numero: 15,
    vestirse_desves: false,
    vestirse_desves_numero: null,
    consumier_alimen: true,
    consumier_alimen_numero: 11,
    evacuar: false,
    evacuar_numero: null,
    otro: false,
    otro_texto: null,
    amigo_apoyo: true,
    pareja_apoyo: false,
    familia_apoyo: true,
    salud_apoyo: false,
    otro_apoyo: true,
    privado_desplazar: false,
    publico_desplazar: true,
    propio_desplazar: true,
    otro_desplazar: false,
    participa_org: true,
    act_otras_per: false,
    apoyo_inst: true,
    nombre_institucion: "Instituto Ejemplo",
    tipo_apoyo: "Apoyo educativo",
  });

  const [
    conclusion_jornada_caracterizacion,
    setConclusionJornadaCaracterizacion,
  ] = useState({});

  const [acceso_servicios_salud, setAccesoServiciosSalud] = useState({
    id: 1,
    regimen_vinculado: true,
    servicio_salud: true,
    salud_otra_texto: "Servicio de salud especializado",
    servicio_general: true,
    servicio_optometra: false,
    servicio_psiquiatria: true,
    servicio_alternativas: false,
    servicio_especializado: true,
    servicio_fisioterapia: false,
    servicio_otro: true,
    servicio_ocupacional: false,
    servicio_fonoaudiologia: true,
    servicio_psicologia: false,
    servicio_social: true,
  });

  useEffect(() => {
    CaracterizacionDiscapacidad.caracterizacionDiscapacidad(
      estudianteSelected.id,
      40
    )
      .then((res) => {
        console.log(res);
        console.log(estudianteSelected);
        // Reorganizar y formar la nueva fecha en formato día-mes-anio
        const fechaOriginal = res.datos_caracterizacion.fecha;
        console.log(fechaOriginal);
        // Dividir la fecha en partes [anio, mes, día]
        const [anio, mes, día] = fechaOriginal.split("-");
        // Reorganizar y formar la nueva fecha en formato día-mes-anio
        const fechaConvertida = `${día}-${mes}-${anio}`;
        console.log(fechaConvertida);

        // Fecha nacimiento
        const fechaNacimiento = estudianteSelected.fecha_nac;
        console.log(fechaNacimiento);
        // Dividir la fecha en partes [anio, mes, día]
        const fechaNacimientoMod = fechaNacimiento.split("T")[0]; // "1900-01-01"
        const [anioF, mesF, diaF] = fechaNacimientoMod.split("-");
        // Reorganizar y formar la nueva fecha en formato anio-mes-día
        const fechaConvertidaNacimiento = `${anioF}-${mesF}-${diaF}`;
        console.log(fechaConvertidaNacimiento);

        const fechaIngreso = estudianteSelected.anio_ingreso;
        const fechaConvertidaTIngreso = fechaIngreso.split("T")[0];
        const [anioIngreso, mesIngreso, diaIngreso] =
          fechaConvertidaTIngreso.split("-");
        const fechaConvertidaIngreso = `${anioIngreso}-${mesIngreso}-${diaIngreso}`;
        console.log(fechaConvertidaIngreso);
        // setDatosEntrevistador
        setDatosEntrevistador({
          entrevistador:
            res.datos_user.first_name + " " + res.datos_user.last_name,
          cargo: res.datos_entrevistador.cargo,
          celular: res.datos_entrevistador.celular,
          profesion: res.datos_entrevistador.profesion,
          fecha_aplicacion: res.datos_caracterizacion.fecha,
          lugar: res.datos_caracterizacion.lugar,
        });

        console.log("Datos entrevistador");
        console.log(datos_entrevistador);

        setDatosEstuidanteEntrevistado({
          fecha_nac: fechaConvertidaNacimiento,
          ciudad: estudianteSelected.ciudad_nac,
          pais: "Colombia",

          desarrollaActividad: res.datos_entrevistado.desarrollaActividad,
          desarrollaActividadData:
            res.datos_entrevistado.desarrollaActividadData,
          orientacionSexual: res.datos_entrevistado.orientacionSexual,
          orientacionSexualOtro: res.datos_entrevistado.orientacionSexualOtro,
          autoreconocimientoEtnico:
            res.datos_entrevistado.autoreconocimientoEtnico,
          autoreconocimientoEtnicoOtro:
            res.datos_entrevistado.autoreconocimientoEtnicoOtro,
          estadoCivil: res.datos_entrevistado.estadoCivil,
          actividadesOcio: res.datos_entrevistado.actividadesOcio,
          actividadesOcioData: res.datos_entrevistado.actividadesOcioData,
          actividadDeportiva: res.datos_entrevistado.actividadDeportiva,
          actividadDeportivaData: res.datos_entrevistado.actividadDeportivaData,
          programaAcompanamiento: res.datos_entrevistado.programaAcompanamiento,
          programaAcompanamientoOtro:
            res.datos_entrevistado.programaAcompanamientoOtro,
          programaAcompanamientoOtroData:
            res.datos_entrevistado.programaAcompanamientoOtroData,
        });

        // setDatosEconomicos
        setDatosEconomicos({
          estrato_socio: res.datos_economicos.estrato_socio,
          expectativas_laborales: res.datos_economicos.expectativas_laborales,
          id: res.datos_economicos.id,
          nivel_educativo_madre: res.datos_economicos.nivel_educativo_madre,
          nivel_educativo_padre: res.datos_economicos.nivel_educativo_padre,
          ocupacion_madre: res.datos_economicos.ocupacion_madre,
          ocupacion_padre: res.datos_economicos.ocupacion_padre,
          recibe_beca: res.datos_economicos.recibe_beca,
          recibe_finan_materiales: res.datos_economicos.recibe_finan_materiales,
          recibe_prestacion_econo: res.datos_economicos.recibe_prestacion_econo,
          recibe_transporte: res.datos_economicos.recibe_transporte,
          situacion_madre: res.datos_economicos.situacion_madre,
          situacion_padre: res.datos_economicos.situacion_padre,
          solvencia_economica: res.datos_economicos.solvencia_economica,

          permanencia_ingresos_propios:
            res.datos_economicos.permanencia_ingresos_propios,
          permanencia_ingresos_familiares:
            res.datos_economicos.permanencia_ingresos_familiares,
          permanencia_ingresos_otros:
            res.datos_economicos.permanencia_ingresos_otros,
          permanencia_ingresos_otros_texto:
            res.datos_economicos.permanencia_ingresos_otros_texto,
          requiere_materiales: res.datos_economicos.requiere_materiales,
          valor_materiales: res.datos_economicos.valor_materiales,
          transporte_privado: res.datos_economicos.transporte_privado,
          transporte_publico: res.datos_economicos.transporte_publico,
          transporte_propio: res.datos_economicos.transporte_propio,
          transporte_otro: res.datos_economicos.transporte_otro,
          transporte_otro_data: res.datos_economicos.transporte_otro_data,
          valor_transporte: res.datos_economicos.valor_transporte,
          valor_sostenimiento: res.datos_economicos.valor_sostenimiento,
          actualmente_vive_estado: res.datos_economicos.actualmente_vive_estado,
          actualmente_vive_parentezco:
            res.datos_economicos.actualmente_vive_parentezco,
          tiene_hijos: res.datos_economicos.tiene_hijos,
          hijos_numero: res.datos_economicos.hijos_numero,
          motivo_ingreso: res.datos_economicos.motivo_ingreso,
          expectativas_carrera: res.datos_economicos.expectativas_carrera,
          expectativas_grado: res.datos_economicos.expectativas_grado,
          labor_padre: res.datos_economicos.labor_padre,
          labor_madre: res.datos_economicos.labor_madre,
          otro_familiar_nivel_educativo:
            res.datos_economicos.otro_familiar_nivel_educativo,
          otro_familiar_situacion_economica:
            res.datos_economicos.otro_familiar_situacion_economica,
          otro_familiar_actividad_economica:
            res.datos_economicos.otro_familiar_actividad_economica,
          otro_familiar_labor_desempena:
            res.datos_economicos.otro_familiar_labor_desempena,
        });

        // setDatosAcademicos
        setDatosAcademicos({
          id: res.datos_academicos.id,
          numero_resolucion: res.datos_academicos.numero_resolucion,
          creditos_programa: res.datos_academicos.creditos_programa,
          titulo_obtenido: res.datos_academicos.titulo_obtenido,
          institucion: res.datos_academicos.institucion,
          nivel_formacion: res.datos_academicos.nivel_formacion,
          apoyos_recibidos: res.datos_academicos.apoyos_recibidos,
          observaciones: res.datos_academicos.observaciones,
          dificultades: res.datos_academicos.dificultades,

          anio_ingreso: fechaConvertidaIngreso,
          otros_programas_academicos:
            res.datos_academicos.otros_programas_academicos,
          edu_media_nombre_institucion:
            res.datos_academicos.edu_media_nombre_institucion,
          edu_media_titulo_obtenido:
            res.datos_academicos.edu_media_titulo_obtenido,
          edu_media_tipo_institucion:
            res.datos_academicos.edu_media_tipo_institucion,
          edu_media_dificultad_apoyo:
            res.datos_academicos.edu_media_dificultad_apoyo,
          edu_superior_tipo_institucion:
            res.datos_academicos.edu_superior_tipo_institucion,
          edu_superior_dificultad_apoyo:
            res.datos_academicos.edu_superior_dificultad_apoyo,
          periodo_ingreso: res.datos_academicos.periodo_ingreso,
          observaciones_adicionales:
            res.datos_academicos.observaciones_adicionales,
        });

        // setDatosAcademicosAdicionales

        // setPercepcionCaracteristicasDiscapacidad
        setPercepcionDiscapacidad({
          id: res.percepcion_discapacidad.id,
          considera_discapacidad:
            res.percepcion_discapacidad.considera_discapacidad,
          consideracion: res.percepcion_discapacidad.consideracion,
          adquisicion: res.percepcion_discapacidad.adquisicion,
          cuenta_con_diagnostico:
            res.percepcion_discapacidad.cuenta_con_diagnostico,
          tipo_diagnostico: res.percepcion_discapacidad.tipo_diagnostico,
          certificado_invalidez:
            res.percepcion_discapacidad.certificado_invalidez,
          documento_soporte: res.percepcion_discapacidad.documento_soporte,
          vision: res.percepcion_discapacidad.vision,
          vision_texto: res.percepcion_discapacidad.vision_texto,
          audicion: res.percepcion_discapacidad.audicion,
          audicion_texto: res.percepcion_discapacidad.audicion_texto,
          voz_y_habla: res.percepcion_discapacidad.voz_y_habla,
          voz_y_habla_texto: res.percepcion_discapacidad.voz_y_habla_texto,
          movimiento_cuerpo: res.percepcion_discapacidad.movimiento_cuerpo,
          movimiento_cuerpo_texto:
            res.percepcion_discapacidad.movimiento_cuerpo_texto,
          cognicion: res.percepcion_discapacidad.cognicion,
          cognicion_texto: res.percepcion_discapacidad.cognicion_texto,
          estado_socio_emocional:
            res.percepcion_discapacidad.estado_socio_emocional,
          estado_socio_emocional_texto:
            res.percepcion_discapacidad.estado_socio_emocional_texto,
          relaciones_sexuales: res.percepcion_discapacidad.relaciones_sexuales,
          relaciones_sexuales_texto:
            res.percepcion_discapacidad.relaciones_sexuales_texto,
          deglucion: res.percepcion_discapacidad.deglucion,
          deglucion_texto: res.percepcion_discapacidad.deglucion_texto,
          ojos: res.percepcion_discapacidad.ojos,
          ojos_texto: res.percepcion_discapacidad.ojos_texto,
          oidos: res.percepcion_discapacidad.oidos,
          oidos_texto: res.percepcion_discapacidad.oidos_texto,
          vocales: res.percepcion_discapacidad.vocales,
          vocales_texto: res.percepcion_discapacidad.vocales_texto,
          manos: res.percepcion_discapacidad.manos,
          manos_texto: res.percepcion_discapacidad.manos_texto,
          piernas: res.percepcion_discapacidad.piernas,
          piernas_texto: res.percepcion_discapacidad.piernas_texto,
          piel: res.percepcion_discapacidad.piel,
          piel_texto: res.percepcion_discapacidad.piel_texto,
          cerebro: res.percepcion_discapacidad.cerebro,
          cerebro_texto: res.percepcion_discapacidad.cerebro_texto,
          sistema_nervioso: res.percepcion_discapacidad.sistema_nervioso,
          sistema_nervioso_texto:
            res.percepcion_discapacidad.sistema_nervioso_texto,
          sistema_cardio: res.percepcion_discapacidad.sistema_cardio,
          sistema_cardio_texto:
            res.percepcion_discapacidad.sistema_cardio_texto,
          sistema_genital: res.percepcion_discapacidad.sistema_genital,
          sistema_genital_texto:
            res.percepcion_discapacidad.sistema_genital_texto,
          sistema_digestivo: res.percepcion_discapacidad.sistema_digestivo,
          sistema_digestivo_texto:
            res.percepcion_discapacidad.sistema_digestivo_texto,
          cursos: res.percepcion_discapacidad.cursos,
          cursos_texto: res.percepcion_discapacidad.cursos_texto,
          clases_magistrales: res.percepcion_discapacidad.clases_magistrales,
          clases_magistrales_texto:
            res.percepcion_discapacidad.clases_magistrales_texto,
          laboratorios: res.percepcion_discapacidad.laboratorios,
          laboratorios_texto: res.percepcion_discapacidad.laboratorios_texto,
          secuencias_numericas:
            res.percepcion_discapacidad.secuencias_numericas,
          secuencias_numericas_texto:
            res.percepcion_discapacidad.secuencias_numericas_texto,
          talleres: res.percepcion_discapacidad.talleres,
          talleres_texto: res.percepcion_discapacidad.talleres_texto,
          conferencias: res.percepcion_discapacidad.conferencias,
          conferencias_texto: res.percepcion_discapacidad.conferencias_texto,
          practica_deportiva: res.percepcion_discapacidad.practica_deportiva,
          practica_deportiva_texto:
            res.percepcion_discapacidad.practica_deportiva_texto,
          ocio: res.percepcion_discapacidad.ocio,
          ocio_texto: res.percepcion_discapacidad.ocio_texto,
          movilizacion: res.percepcion_discapacidad.movilizacion,
          movilizacion_texto: res.percepcion_discapacidad.movilizacion_texto,
          conciertos: res.percepcion_discapacidad.conciertos,
          conciertos_texto: res.percepcion_discapacidad.conciertos_texto,
          servicios_salud: res.percepcion_discapacidad.servicios_salud,
          servicios_salud_texto:
            res.percepcion_discapacidad.servicios_salud_texto,
          asambleas: res.percepcion_discapacidad.asambleas,
          asambleas_texto: res.percepcion_discapacidad.asambleas_texto,
          alimentos_cafeteria: res.percepcion_discapacidad.alimentos_cafeteria,
          alimentos_cafeteria_texto:
            res.percepcion_discapacidad.alimentos_cafeteria_texto,
          tramites: res.percepcion_discapacidad.tramites,
          tramites_texto: res.percepcion_discapacidad.tramites_texto,
          otra: res.percepcion_discapacidad.otra,
          otra_texto: res.percepcion_discapacidad.otra_texto,
          condicion_discapacidad:
            res.percepcion_discapacidad.condicion_discapacidad,
          contexto_universitario:
            res.percepcion_discapacidad.contexto_universitario,
          ausencia_ayuda_tec: res.percepcion_discapacidad.ausencia_ayuda_tec,
          ausencia_espacios_fisicos:
            res.percepcion_discapacidad.ausencia_espacios_fisicos,
          ausencia_materiales_impresos:
            res.percepcion_discapacidad.ausencia_materiales_impresos,
          ausencia_personas_apoyo:
            res.percepcion_discapacidad.ausencia_personas_apoyo,
          actitudes_negativas_personas:
            res.percepcion_discapacidad.actitudes_negativas_personas,
          ausencia_servicios_discapacidad:
            res.percepcion_discapacidad.ausencia_servicios_discapacidad,
          otros_factores: res.percepcion_discapacidad.otros_factores,
          otros_factores_texto:
            res.percepcion_discapacidad.otros_factores_texto,
          condicion_psicoemocional:
            res.percepcion_discapacidad.condicion_psicoemocional,
          otra_psicoemocional: res.percepcion_discapacidad.otra_psicoemocional,
          otra_psicoemocional_texto:
            res.percepcion_discapacidad.otra_psicoemocional_texto,
          escritos_impresos: res.percepcion_discapacidad.escritos_impresos,
          escritos_impresos_numero:
            res.percepcion_discapacidad.escritos_impresos_numero,
          imagenes_pantalla: res.percepcion_discapacidad.imagenes_pantalla,
          imagenes_pantalla_numero:
            res.percepcion_discapacidad.imagenes_pantalla_numero,
          copia_dictado: res.percepcion_discapacidad.copia_dictado,
          copia_dictado_numero:
            res.percepcion_discapacidad.copia_dictado_numero,
          transcripcion_textos:
            res.percepcion_discapacidad.transcripcion_textos,
          transcripcion_textos_numero:
            res.percepcion_discapacidad.transcripcion_textos_numero,
          manuales_escritos: res.percepcion_discapacidad.manuales_escritos,
          manuales_escritos_numero:
            res.percepcion_discapacidad.manuales_escritos_numero,
          textos_pantalla: res.percepcion_discapacidad.textos_pantalla,
          textos_pantalla_numero:
            res.percepcion_discapacidad.textos_pantalla_numero,
          redactar: res.percepcion_discapacidad.redactar,
          redactar_numero: res.percepcion_discapacidad.redactar_numero,
          elaborar_ideas: res.percepcion_discapacidad.elaborar_ideas,
          elaborar_ideas_numero:
            res.percepcion_discapacidad.elaborar_ideas_numero,
          escuchar: res.percepcion_discapacidad.escuchar,
          escuchar_numero: res.percepcion_discapacidad.escuchar_numero,
          expre_oral: res.percepcion_discapacidad.expre_oral,
          expre_oral_numero: res.percepcion_discapacidad.expre_oral_numero,
          compren_oral: res.percepcion_discapacidad.compren_oral,
          compren_oral_numero: res.percepcion_discapacidad.compren_oral_numero,
          interactuar: res.percepcion_discapacidad.interactuar,
          interactuar_numero: res.percepcion_discapacidad.interactuar_numero,
          rel_interpersonales: res.percepcion_discapacidad.rel_interpersonales,
          rel_interpersonales_numero:
            res.percepcion_discapacidad.rel_interpersonales_numero,
          desplazarse: res.percepcion_discapacidad.desplazarse,
          desplazarse_numero: res.percepcion_discapacidad.desplazarse_numero,
          manipular_obj: res.percepcion_discapacidad.manipular_obj,
          manipular_obj_numero:
            res.percepcion_discapacidad.manipular_obj_numero,
          mant_sentado: res.percepcion_discapacidad.mant_sentado,
          mant_sentado_numero: res.percepcion_discapacidad.mant_sentado_numero,
          asearse: res.percepcion_discapacidad.asearse,
          asearse_numero: res.percepcion_discapacidad.asearse_numero,
          vestirse_desves: res.percepcion_discapacidad.vestirse_desves,
          vestirse_desves_numero:
            res.percepcion_discapacidad.vestirse_desves_numero,
          consumier_alimen: res.percepcion_discapacidad.consumier_alimen,
          consumier_alimen_numero:
            res.percepcion_discapacidad.consumier_alimen_numero,
          evacuar: res.percepcion_discapacidad.evacuar,
          evacuar_numero: res.percepcion_discapacidad.evacuar_numero,
          otro: res.percepcion_discapacidad.otro,
          otro_texto: res.percepcion_discapacidad.otro_texto,
          amigo_apoyo: res.percepcion_discapacidad.amigo_apoyo,
          pareja_apoyo: res.percepcion_discapacidad.pareja_apoyo,
          familia_apoyo: res.percepcion_discapacidad.familia_apoyo,
          salud_apoyo: res.percepcion_discapacidad.salud_apoyo,
          otro_apoyo: res.percepcion_discapacidad.otro_apoyo,
          privado_desplazar: res.percepcion_discapacidad.privado_desplazar,
          publico_desplazar: res.percepcion_discapacidad.publico_desplazar,
          propio_desplazar: res.percepcion_discapacidad.propio_desplazar,
          otro_desplazar: res.percepcion_discapacidad.otro_desplazar,
          participa_org: res.percepcion_discapacidad.participa_org,
          act_otras_per: res.percepcion_discapacidad.act_otras_per,
          apoyo_inst: res.percepcion_discapacidad.apoyo_inst,
          nombre_institucion: res.percepcion_discapacidad.nombre_institucion,
          tipo_apoyo: res.percepcion_discapacidad.tipo_apoyo,
        });

        // setConclusionJornadaCaracterizacion

        // setAccesoServiciosSalud
        setAccesoServiciosSalud({
          id: res.acceso_servi_salud.id,
          regimen_vinculado: res.acceso_servi_salud.regimen_vinculado,
          servicio_salud: res.acceso_servi_salud.servicio_salud,
          salud_otra_texto: res.acceso_servi_salud.salud_otra_texto,
          servicio_general: res.acceso_servi_salud.servicio_general,
          servicio_optometra: res.acceso_servi_salud.servicio_optometra,
          servicio_psiquiatria: res.acceso_servi_salud.servicio_psiquiatria,
          servicio_alternativas: res.acceso_servi_salud.servicio_alternativas,
          servicio_especializado: res.acceso_servi_salud.servicio_especializado,
          servicio_fisioterapia: res.acceso_servi_salud.servicio_fisioterapia,
          servicio_otro: res.acceso_servi_salud.servicio_otro,
          servicio_ocupacional: res.acceso_servi_salud.servicio_ocupacional,
          servicio_fonoaudiologia:
            res.acceso_servi_salud.servicio_fonoaudiologia,
          servicio_psicologia: res.acceso_servi_salud.servicio_psicologia,
          servicio_social: res.acceso_servi_salud.servicio_social,
          salud_prepagada: res.acceso_servi_salud.salud_prepagada,
          salud_pre_nombre_institucion:
            res.acceso_servi_salud.salud_pre_nombre_institucion,
          servicio_complementario:
            res.acceso_servi_salud.servicio_complementario,
          servicio_complementario_nombre:
            res.acceso_servi_salud.servicio_complementario_nombre,
          servicio_estudiantil: res.acceso_servi_salud.servicio_estudiantil,
          servicio_estudiantil_nombre:
            res.acceso_servi_salud.servicio_estudiantil_nombre,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [estudianteSelected.id]);
  console.log(estudianteSelected.id);

  console.log(semestreActual);

  return (
    <div className="container-acordion container-subacordion">
      <p>Periodo de Caracterización:</p>
      <select
        className="select-type"
        name="periodo"
        id="periodo"
        value={semestreActual}
        onChange={(e) => setSemestreActual(e.target.value)}
      >
        {semestres.map((semestre) => (
          <option key={semestre.id} value={semestre.id}>
            {semestre.nombre}
          </option>
        ))}
      </select>
      <p className="title">COMPONENTES DE CARACTERIZACIÓN:</p>
      <Acordion
        title="Datos entrevistador"
        claseAcordion={"acordion subacordion"}
        claseContenido={"accordion-content"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
            alt="flechaUp"
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
            alt="flechaDown"
          />
        }
      >
        <DatosEntrevistador datos_entrevistador={datos_entrevistador} />
      </Acordion>
      <Acordion
        title="Datos entrevistado"
        claseAcordion={"acordion subacordion"}
        claseContenido={"accordion-content"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
            alt="flechaUp"
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
            alt="flechaDown"
          />
        }
      >
        <DatosEntrevistado
          datos_estudiante_entrevistado={datos_estudiante_entrevistado}
        />

        {/* <DatosEntrevistado /> */}
      </Acordion>
      <Acordion
        title="Datos económicos"
        claseAcordion={"acordion subacordion"}
        claseContenido={"accordion-content"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
            alt="flechaUp"
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
            alt="flechaDown"
          />
        }
      >
        <DatosEconomicos datos_economicos={datos_economicos} />
      </Acordion>
      <Acordion
        claseContenido={"accordion-content"}
        title="Datos académicos"
        claseAcordion={"acordion subacordion"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
          />
        }
      >
        <DatosAcademicos datos_academicos={datos_academicos} />
      </Acordion>

      <Acordion
        claseContenido={"accordion-content"}
        title="Datos académicos adicionales"
        claseAcordion={"acordion subacordion"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
            alt="Flecha Up"
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
            alt="Flecha Down"
          />
        }
      >
        <DatosAcademicosAdicionales datos_academicos={datos_academicos} />
      </Acordion>
      <Acordion
        claseContenido={"accordion-content"}
        title="Percepción y características de la discapacidad"
        claseAcordion={"acordion subacordion"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
          />
        }
      >
        <PercepcionCaracteristicasDiscapacidad
          percepcion_discapacidad={percepcion_discapacidad}
        />
      </Acordion>
      <Acordion
        claseContenido={"accordion-content"}
        title="Acceso a servicios de salud"
        claseAcordion={"acordion subacordion"}
        flechaUp={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSEvtk8ENgCAMRcskrqaTqJPoaLqJNmmTSqD9HogH4fx5r/xqosYnNeZTF4QN/6+ijYjOu5cl7EYCbypi+Cj3VlSCCixch4ckiKAEhyWRIIfvsoPZ7MB9iScowScB85IhSU3gwXV4SFIT2Mtci06ef502xxnOPo5XEV8eHLh9yVGCcyBaMvo/VXNdEFbYK/q+ogvlIxsZV7deEQAAAABJRU5ErkJggg=="
          />
        }
        flechaDown={
          <img
            className="flechas"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ5JREFUSEvtk8ENgCAQBJdOtBMtxUq0E+3EVixFN4HkQoA7HiQ+zo8ajxnc1YDBRxjMhwvUhD2i/0d0ALgAPJWtTgCWOFMcaZVM+B7ha0FC+BkFW03SEhBwfwt55htIiYTz2VwrQ/tMSxKy0s6bcA5qAs7kEkKZuwq3CnIJ703wHoGU8Lqaed6FJSK5JhWu/mBpoFdgBrvAHJV3oEb1ArjkGRmgoH6GAAAAAElFTkSuQmCC"
          />
        }
      >
        <AccesoServiciosSalud servicio_salud={acceso_servicios_salud} />
      </Acordion>
      <hr></hr>

      <ConclusionJornadaCaracterizacion />
    </div>
  );
};

export default Caracterizacion;
// export default withSwal(Accesibilidad); // This is the original line
