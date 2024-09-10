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
  encriptarInt,
} from "../../../../modulos/utilidades_seguridad/utilidades_seguridad";
import { useEffect, useState } from "react";
import CaracterizacionDiscapacidad from "../../../../service/caracterizacion_discapacidad";
import { useAuthStore } from "../../store/auth";
import { set } from "date-fns";
import UpdateDatosEntrevistador from "../../../../service/update_datos_entrevistador_disc.js";
import { desencriptarInt } from "../../../../modulos/utilidades_seguridad/utilidades_seguridad";

const Caracterizacion = () => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage,
  };
  const [semestres, setSemestres] = useState([]);
  const [semestreActual, setSemestreActual] = useState("");
  const [semestreSelect, setSemestreSelect] = useState("");
  const { estudianteSelected } = useAuthStore();
  const id_semestre = desencriptarInt(
    sessionStorage.getItem("id_semestre_actual")
  );

  useEffect(() => {
    sessionStorage.setItem(
      "id_semestre_discapacidad",
      encriptarInt(semestreSelect)
    );
  }, [semestreSelect]);
  useEffect(() => {
    semestres_discapacidad.semestres_discapacidad().then((res) => {
      setSemestres(res);
      //console.log(res);
    });

    const semestre = desencriptar(sessionStorage.semestre_actual);
    setSemestreActual(semestre);
  }, []);

  const [datos_entrevistador, setDatosEntrevistador] = useState({
    id_semestre: "",

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
    id_semestre: "",
    estrato_socio: 3,
    expectativas_laborales: "",
    id: 1,
    nivel_educativo_madre: "",
    nivel_educativo_padre: "",
    ocupacion_madre: "",
    ocupacion_padre: "",
    recibe_beca: false,
    recibe_finan_materiales: false,
    recibe_prestacion_econo: false,
    recibe_transporte: false,
    situacion_madre: "",
    situacion_padre: "",
    solvencia_economica: false,

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
    titulo_obtenido: "",
    institucion: "",
    nivel_formacion: "",
    apoyos_recibidos: "",
    observaciones: "",
    dificultades: "",
  });

  const [datos_jornada, setDatosJornada] = useState({
    jornada_caracterizacion: "",
  });

  const [percepcion_discapacidad, setPercepcionDiscapacidad] = useState({
    id: 1,
    considera_discapacidad: false,
    consideracion: null,
    adquisicion: null,
    cuenta_con_diagnostico: false,
    tipo_diagnostico: null,
    certificado_invalidez: false,
    documento_soporte: false,
    vision: false,
    vision_texto: "",
    audicion: false,
    audicion_texto: "",
    voz_y_habla: false,
    voz_y_habla_texto: "",
    movimiento_cuerpo: false,
    movimiento_cuerpo_texto: "",
    cognicion: false,
    cognicion_texto: "",
    estado_socio_emocional: false,
    estado_socio_emocional_texto: "",
    relaciones_sexuales: false,
    relaciones_sexuales_texto: "",
    deglucion: false,
    deglucion_texto: "",
    otra_dif_permanente: false,
    otra_dif_permanente_texto: null,
    ojos: false,
    ojos_texto: "",
    oidos: false,
    oidos_texto: "",
    vocales: false,
    vocales_texto: "",
    manos: false,
    manos_texto: "",
    piernas: false,
    piernas_texto: "",
    piel: false,
    piel_texto: "",
    cerebro: false,
    cerebro_texto: "",
    sistema_nervioso: false,
    sistema_nervioso_texto: "",
    sistema_cardio: false,
    sistema_cardio_texto: "",
    sistema_genital: false,
    sistema_genital_texto: "",
    sistema_digestivo: false,
    sistema_digestivo_texto: "",
    otra_organos: false,
    otra_organos_texto: null,
    cursos: false,
    cursos_texto: "",
    clases_magistrales: false,
    clases_magistrales_texto: "",
    laboratorios: false,
    laboratorios_texto: "",
    secuencias_numericas: false,
    secuencias_numericas_texto: "",
    talleres: false,
    talleres_texto: "",
    conferencias: false,
    conferencias_texto: "",
    practica_deportiva: false,
    practica_deportiva_texto: "",
    ocio: false,
    ocio_texto: "",
    movilizacion: false,
    movilizacion_texto: "",
    conciertos: false,
    conciertos_texto: "",
    servicios_salud: false,
    servicios_salud_texto: "",
    asambleas: false,
    asambleas_texto: "",
    alimentos_cafeteria: false,
    alimentos_cafeteria_texto: "",
    tramites: false,
    tramites_texto: "",
    otra_nec_diferente: false,
    otra_nec_diferente_texto: "",
    condicion_discapacidad: false,
    contexto_universitario: false,
    ausencia_ayuda_tec: false,
    ausencia_espacios_fisicos: false,
    ausencia_materiales_impresos: false,
    ausencia_personas_apoyo: false,
    actitudes_negativas_personas: false,
    ausencia_servicios_discapacidad: false,
    otros_factores: false,
    otros_factores_texto: "",
    condicion_psicoemocional: false,
    otra_psicoemocional: false,
    otra_psicoemocional_texto: "",
    escritos_impresos: false,
    escritos_impresos_numero: 0,
    imagenes_pantalla: false,
    imagenes_pantalla_numero: 0,
    copia_dictado: false,
    copia_dictado_numero: 0,
    transcripcion_textos: false,
    transcripcion_textos_numero: 0,
    manuales_escritos: false,
    manuales_escritos_numero: 0,
    textos_pantalla: false,
    textos_pantalla_numero: 0,
    redactar: false,
    redactar_numero: 0,
    elaborar_ideas: false,
    elaborar_ideas_numero: 0,
    escuchar: false,
    escuchar_numero: 0,
    expre_oral: false,
    expre_oral_numero: 0,
    compren_oral: false,
    compren_oral_numero: 0,
    interactuar: false,
    interactuar_numero: 0,
    rel_interpersonales: false,
    rel_interpersonales_numero: 0,
    desplazarse: false,
    desplazarse_numero: 0,
    manipular_obj: false,
    manipular_obj_numero: 0,
    mant_sentado: false,
    mant_sentado_numero: 0,
    asearse: false,
    asearse_numero: 0,
    vestirse_desves: false,
    vestirse_desves_numero: 0,
    consumier_alimen: false,
    consumier_alimen_numero: 0,
    evacuar: false,
    evacuar_numero: 0,
    otro: false,
    otro_texto: "",
    amigo_apoyo: false,
    pareja_apoyo: false,
    familia_apoyo: false,
    salud_apoyo: false,
    otro_apoyo: false,
    privado_desplazar: false,
    publico_desplazar: false,
    propio_desplazar: false,
    otro_desplazar: false,
    participa_org: false,
    act_otras_per: false,
    apoyo_inst: false,
    nombre_institucion: "",
    tipo_apoyo: "",
  });

  const [acceso_servicios_salud, setAccesoServiciosSalud] = useState({
    id: 1,
    regimen_vinculado: false,
    servicio_salud: false,
    salud_otra_texto: "Servicio de salud especializado",
    servicio_general: false,
    servicio_optometra: false,
    servicio_psiquiatria: false,
    servicio_alternativas: false,
    servicio_especializado: false,
    servicio_fisioterapia: false,
    servicio_otro: false,
    servicio_ocupacional: false,
    servicio_fonoaudiologia: false,
    servicio_psicologia: false,
    servicio_social: false,
  });

  const getCaracterizacion = (semestre_data) => {
    const semestre_consulta = semestre_data ? semestre_data : id_semestre;
    //console.log(semestre_consulta);
    CaracterizacionDiscapacidad.caracterizacionDiscapacidad(
      estudianteSelected.id,
      semestre_consulta
    )
      .then((res) => {
        //console.log(res);
        //console.log(semestre_consulta);
        // Reorganizar y formar la nueva fecha en formato día-mes-anio
        const fechaOriginal = res.datos_caracterizacion.fecha;
        //console.log(fechaOriginal);
        // Dividir la fecha en partes [anio, mes, día]
        const fechaOriginalMod = fechaOriginal.split("T")[0]; // "1900-01-01"
        const [anio, mes, día] = fechaOriginalMod.split("-");
        // Reorganizar y formar la nueva fecha en formato día-mes-anio
        const fechaConvertida = `${anio}-${mes}-${día}`;
        //console.log(fechaConvertida);

        // Fecha nacimiento
        const fechaNacimiento = estudianteSelected.fecha_nac;
        //console.log(fechaNacimiento);
        // Dividir la fecha en partes [anio, mes, día]
        const fechaNacimientoMod = fechaNacimiento.split("T")[0]; // "1900-01-01"
        const [anioF, mesF, diaF] = fechaNacimientoMod.split("-");
        // Reorganizar y formar la nueva fecha en formato anio-mes-día
        const fechaConvertidaNacimiento = `${anioF}-${mesF}-${diaF}`;
        //console.log(fechaConvertidaNacimiento);

        const fechaIngreso = estudianteSelected.anio_ingreso;
        const fechaConvertidaTIngreso = fechaIngreso.split("T")[0];
        const [anioIngreso, mesIngreso, diaIngreso] =
          fechaConvertidaTIngreso.split("-");
        const fechaConvertidaIngreso = `${anioIngreso}-${mesIngreso}-${diaIngreso}`;
        //console.log(fechaConvertidaIngreso);
        // setDatosEntrevistador
        setDatosEntrevistador({
          id_semestre: semestre_consulta,
          entrevistador:
            res.datos_user.first_name + " " + res.datos_user.last_name,
          cargo: res.datos_entrevistador.cargo,
          celular: res.datos_entrevistador.celular,
          profesion: res.datos_entrevistador.profesion,
          fecha_aplicacion: fechaConvertida,
          lugar: res.datos_caracterizacion.lugar,
        });

        //console.log("Datos entrevistador");
        //console.log(datos_entrevistador);

        setDatosEstuidanteEntrevistado({
          lugar: res.datos_caracterizacion.lugar,
          id_semestre: semestre_consulta,
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
          id_semestre: semestre_consulta,
          lugar: res.datos_caracterizacion.lugar,
          fecha_nac: fechaConvertida,

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
          id_semestre: semestre_consulta,
          lugar: res.datos_caracterizacion.lugar,
          fecha_nac: fechaConvertidaIngreso,

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
          id_semestre: semestre_consulta,
          lugar: res.datos_caracterizacion.lugar,
          fecha_nac: fechaConvertida,

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
          otra_dif_permanente: res.percepcion_discapacidad.otra_dif_permanente,
          otra_dif_permanente_texto:
            res.percepcion_discapacidad.otra_dif_permanente_texto,
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
          otra_organos: res.percepcion_discapacidad.otra_organos,
          otra_organos_texto: res.percepcion_discapacidad.otra_organos_texto,
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
          otra_nec_diferente: res.percepcion_discapacidad.otra_nec_diferente,
          otra_nec_diferente_texto:
            res.percepcion_discapacidad.otra_nec_diferente_texto,
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

        // setAccesoServiciosSalud
        setAccesoServiciosSalud({
          id_semestre: semestre_consulta,
          lugar: res.datos_caracterizacion.lugar,
          fecha_nac: fechaConvertida,

          jornada_caracterizacion:
            res.datos_caracterizacion.jornada_caracterizacion,

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

        // setDatosJornada
        setDatosJornada({
          id_semestre: semestre_consulta,
          lugar: res.datos_caracterizacion.lugar,
          fecha_nac: fechaConvertida,
          tipo: "jornada_caracterizacion",
          id_estudiante: estudianteSelected.id,

          id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),

          jornada_caracterizacion:
            res.datos_caracterizacion.jornada_caracterizacion,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const hanldeSelectSemestreD = (semestre_data) => {
    getCaracterizacion(semestre_data);
  };

  useEffect(() => {
    getCaracterizacion(id_semestre);
  }, [estudianteSelected.id]);

  return (
    <div className="container-acordion container-subacordion">
      <p>Periodo de Caracterización:</p>
      <select
        className="select-type"
        name="periodo"
        id="periodo"
        value={semestreActual}
        onChange={(e) => {
          setSemestreActual(e.target.value);
          hanldeSelectSemestreD(e.target.value);
          setSemestreSelect(e.target.value);
          //console.log("Semestre seleccionado: " + e.target.value);
        }}
      >
        <option value={id_semestre}>Seleccione un semestre</option>
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

      {/* <Acordion
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
      </Acordion> */}
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

      <ConclusionJornadaCaracterizacion jornada={datos_jornada} />
    </div>
  );
};

export default Caracterizacion;
// export default withSwal(Accesibilidad); // This is the original line
