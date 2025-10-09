/**
 * @file form_seguimiento_individual_edit_v3.jsx
 * @version 1.0.0.
 * @description Formulario de seguimiento individual - versión 3.
 * @author Componente Sistemas Ases.
 * @contact sistemas.ases@correounivalle.edu.co.
 */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormCheck,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Update_seguimiento from "../../service/update_seguimiento";
import Delete_seguimiento from "../../service/delete_seguimiento";
import Correo_editar_seguimiento from "../../service/update_enviar_riesgo_edicion";
import Seguimientos_enviar_observaciones from "../../service/seguimientos_enviar_observaciones";
import { CSVLink } from "react-csv";
import "../../Scss/seguimiento_forms/form_seguimiento_individual_edit_v2.css";
import {
  desencriptarInt,
  desencriptar,
  encriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const Seguimiento_individual_edit_v3 = (props) => {
  // Constantes modal de observaciones
  const [showModalMail, setShowModalMail] = useState(false);
  const handleShowMail = () => setShowModalMail(true);
  const handleCloseMail = () => setShowModalMail(false);

  /**
   * Función para recargar la página.
   */

  const recargarPagina = () => {
    if (props.recarga_ficha_estudiante) {
      // Cambiar la URL a la página con el ID del estudiante seleccionado
      // const actual_path = sessionStorage.getItem("path");
      // console.log(desencriptar(actual_path));
      sessionStorage.setItem(
        "path",
        encriptar(`/ficha_estudiante/${form.id_estudiante}`)
      );
      window.location.reload();
    } else {
      props.updateDataUserSocioedu(form.id_estudiante);
    }
  };

  /**
   * Estado local del formulario.
   */
  const [form, set_form] = useState({
    id: props.item.id,
    fecha: props.item.fecha,
    lugar: props.item.lugar,
    hora_inicio: props.item.hora_inicio,
    hora_finalización: props.item.hora_finalización,
    objetivos: props.item.objetivos,
    objetivos2: props.item.objetivos2,
    objetivos3: props.item.objetivos3,
    individual: props.item.individual,
    riesgo_individual: props.item.riesgo_individual,
    autoconocimiento: props.item.autoconocimiento,
    autonomia: props.item.autonomia,
    proyecto_de_vida: props.item.proyecto_de_vida,
    historia_de_vida: props.item.historia_de_vida,
    salud: props.item.salud,
    relación_eriótico_afectivas: props.item.relación_eriótico_afectivas,
    identificación: props.item.identificación,
    aspectos_motivacionales: props.item.aspectos_motivacionales,
    diversidad_sexual: props.item.diversidad_sexual,
    red_de_apoyo: props.item.red_de_apoyo,
    rasgos_de_personalidad: props.item.rasgos_de_personalidad,
    familiar: props.item.familiar,
    riesgo_familiar: props.item.riesgo_familiar,
    dinamica_familiar: props.item.dinamica_familiar,
    relaciones_familiares: props.item.relaciones_familiares,
    red_de_apoyo_familiar: props.item.red_de_apoyo_familiar,
    rol_del_estudiante_en_la_familia:
      props.item.rol_del_estudiante_en_la_familia,
    academico: props.item.academico,
    riesgo_academico: props.item.riesgo_academico,
    desempeño_académico: props.item.desempeño_académico,
    elección_vocacional: props.item.elección_vocacional,
    autogestion_academica: props.item.autogestion_academica,
    manejo_del_tiempo: props.item.manejo_del_tiempo,
    economico: props.item.economico,
    riesgo_economico: props.item.riesgo_economico,
    apoyos_económicos_institucionales:
      props.item.apoyos_económicos_institucionales,
    manejo_finanzas: props.item.manejo_finanzas,
    apoyo_económico_familiar: props.item.apoyo_económico_familiar,
    situación_laboral_ocupacional: props.item.situación_laboral_ocupacional,
    vida_universitaria_ciudad: props.item.vida_universitaria_ciudad,
    riesgo_vida_universitaria_ciudad:
      props.item.riesgo_vida_universitaria_ciudad,
    motivación_compañamiento: props.item.motivación_compañamiento,
    referencia_geográfica: props.item.referencia_geográfica,
    adaptación_ciudad_Universidad: props.item.adaptación_ciudad_Universidad,
    oferta_servicios: props.item.oferta_servicios,
    vivienda: props.item.vivienda,
    movilidad_y_transporte: props.item.movilidad_y_transporte,
    integracion_a_la_cultura_universitaria:
      props.item.integracion_a_la_cultura_universitaria,
    vinculación_grupos_actividades_extracurriculares:
      props.item.vinculación_grupos_actividades_extracurriculares,
    uso_de_los_servicios_universitarios:
      props.item.uso_de_los_servicios_universitarios,
    apoyo_académico: props.item.apoyo_académico,
    taller_par_par: props.item.taller_par_par,
    reconocimiento_ciudad_U: props.item.reconocimiento_ciudad_U,
    rem_profesional_SE: props.item.rem_profesional_SE,
    rem_racticante_SE: props.item.rem_racticante_SE,
    rem_actividades_grupales: props.item.rem_actividades_grupales,
    rem_monitorías_académicas: props.item.rem_monitorías_académicas,
    rem_proyectos_Universidad: props.item.rem_proyectos_Universidad,
    rem_servicio_salud: props.item.rem_servicio_salud,
    rem_registro_académico: props.item.rem_registro_académico,
    rem_matrícula_financiera: props.item.rem_matrícula_financiera,
    rem_desarrollo_humano_promoción_SE:
      props.item.rem_desarrollo_humano_promoción_SE,
    rem_directores_programa: props.item.rem_directores_programa,
    rem_grupos_universidad: props.item.rem_grupos_universidad,
    rem_externa: props.item.rem_externa,
    Ninguna_acción_realizada: props.item.Ninguna_acción_realizada,
    asist_actividades_grupales: props.item.asist_actividades_grupales,
    asist_monitoria_aca: props.item.asist_monitoria_aca,
    asist_matricula_financiera: props.item.asist_matricula_financiera,
    asist_desa_humano: props.item.asist_desa_humano,
    asist_proyect_uni: props.item.asist_proyect_uni,
    asist_dir_programa: props.item.asist_dir_programa,
    asist_prof_se: props.item.asist_prof_se,
    asist_servi_salud: props.item.asist_servi_salud,
    asist_grupo_uni: props.item.asist_grupo_uni,
    asist_practicante_se: props.item.asist_practicante_se,
    asist_regis_academico: props.item.asist_regis_academico,
    asist_rem_externa: props.item.asist_rem_externa,
    observaciones: props.item.observaciones,
    revisado_profesional: props.item.revisado_profesional,
    revisado_practicante: props.item.revisado_practicante,
    primer_acercamiento: props.item.primer_acercamiento,
    cierre: props.item.cierre,
    id_creador: props.item.id_creador,
    id_modificador: desencriptarInt(sessionStorage.getItem("id_usuario")),
    id_estudiante: props.item.id_estudiante,
    list_editores: props.item.id_editors,
    nombre_creador: props.item.nombre_creador,
    id_semestre: desencriptarInt(sessionStorage.getItem("id_semestre_actual")),
  });
  // console.log(props.item.id_editors);
  const hora_creacion = new Date(props.item.creacion); // Variable para almacenar la hora de creación del formulario.
  const hora_edicion = new Date(props.item.modificacion); // Variable para almacenar la hora de edición del formulario.

  const verificador_datos_basicos = () => {
    if (!!form.fecha) {
      if (!!form.lugar) {
        if (!!form.hora_inicio) {
          if (!!form.hora_finalización) {
            if (!!form.objetivos) {
              verificador_tematicas();
            } else {
              window.confirm(
                "Debes diligenciar el campo 'Objetivos', por favor verifica este campo."
              );
            }
          } else {
            window.confirm(
              "Debes introducir una Hora de finalización válida, por favor verifica este dato."
            );
          }
        } else {
          window.confirm(
            "Debes introducir una Hora de inicio válida, por favor verifica este dato."
          );
        }
      } else {
        window.confirm(
          "Debes introducir un lugar de encuentro válido, por favor verifica este dato."
        );
      }
    } else {
      window.confirm(
        "Debes introducir una fecha válida, por favor verifica este dato."
      );
    }
  };
  const verificador_tematicas = () => {
    if (
      !!form.individual ||
      !!form.familiar ||
      !!form.academico ||
      !!form.economico ||
      !!form.vida_universitaria_ciudad
    ) {
      verificador_individual();
    } else {
      window.confirm(
        "Debes diligenciar al menos una dimesión, por favor verifica estos campos."
      );
    }
  };
  const verificador_individual = () => {
    if (!!form.individual) {
      if (
        form.riesgo_individual == 0 ||
        form.riesgo_individual == 1 ||
        form.riesgo_individual == 2
      ) {
        if (
          !!form.autoconocimiento ||
          !!form.autonomia ||
          !!form.proyecto_de_vida ||
          !!form.historia_de_vida ||
          !!form.salud ||
          !!form.relación_eriótico_afectivas ||
          !!form.identificación ||
          // !!form.rasgos_de_personalidad ||
          !!form.aspectos_motivacionales ||
          !!form.diversidad_sexual ||
          !!form.red_de_apoyo
        ) {
          verificador_familiar();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Individual', por favor verifica este dato."
          );
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Individual', por favor verifica este dato."
        );
      }
    } else {
      verificador_familiar();
    }
  };

  const verificador_familiar = () => {
    if (!!form.familiar) {
      if (
        form.riesgo_familiar == 0 ||
        form.riesgo_familiar == 1 ||
        form.riesgo_familiar == 2
      ) {
        if (
          // !!form.dinamica_familiar ||
          !!form.relaciones_familiares ||
          !!form.red_de_apoyo_familiar ||
          !!form.rol_del_estudiante_en_la_familia
        ) {
          verificador_academico();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Familiar', por favor verifica este dato."
          );
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Familiar', por favor verifica este dato."
        );
      }
    } else {
      verificador_academico();
    }
  };

  const verificador_academico = () => {
    if (!!form.academico) {
      if (
        form.riesgo_academico == 0 ||
        form.riesgo_academico == 1 ||
        form.riesgo_academico == 2
      ) {
        if (
          !!form.desempeño_académico ||
          !!form.elección_vocacional ||
          !!form.autogestion_academica
        ) {
          verificador_economico();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Académico', por favor verifica este dato."
          );
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Académico', por favor verifica este dato."
        );
      }
    } else {
      verificador_economico();
    }
  };

  const verificador_economico = () => {
    if (!!form.economico) {
      if (
        form.riesgo_economico == 0 ||
        form.riesgo_economico == 1 ||
        form.riesgo_economico == 2
      ) {
        if (
          !!form.apoyos_económicos_institucionales ||
          !!form.apoyo_económico_familiar ||
          !!form.manejo_finanzas ||
          !!form.situación_laboral_ocupacional
        ) {
          verificador_vida();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Económico', por favor verifica este dato."
          );
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Económico', por favor verifica este dato."
        );
      }
    } else {
      verificador_vida();
    }
  };

  const verificador_vida = () => {
    if (!!form.vida_universitaria_ciudad) {
      if (
        form.riesgo_vida_universitaria_ciudad == 0 ||
        form.riesgo_vida_universitaria_ciudad == 1 ||
        form.riesgo_vida_universitaria_ciudad == 2
      ) {
        if (
          // !!form.oferta_servicios ||
          !!form.motivación_compañamiento ||
          !!form.referencia_geográfica ||
          !!form.adaptación_ciudad_Universidad ||
          !!form.movilidad_y_transporte ||
          !!form.uso_de_los_servicios_universitarios ||
          !!form.integracion_a_la_cultura_universitaria ||
          !!form.vivienda ||
          !!form.vinculación_grupos_actividades_extracurriculares
        ) {
          verificador_acciones();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Vida Universitaria', por favor verifica este dato."
          );
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Vida Universitaria', por favor verifica este dato."
        );
      }
    } else {
      verificador_acciones();
    }
  };

  const verificador_acciones = () => {
    if (
      !!form.apoyo_académico ||
      !!form.taller_par_par ||
      !!form.reconocimiento_ciudad_U ||
      !!form.rem_profesional_SE ||
      !!form.rem_racticante_SE ||
      !!form.rem_actividades_grupales ||
      !!form.rem_monitorías_académicas ||
      !!form.rem_proyectos_Universidad ||
      !!form.rem_servicio_salud ||
      !!form.rem_registro_académico ||
      !!form.rem_matrícula_financiera ||
      !!form.rem_desarrollo_humano_promoción_SE ||
      !!form.rem_directores_programa ||
      !!form.rem_grupos_universidad ||
      !!form.rem_externa ||
      !!form.Ninguna_acción_realizada
    ) {
      set_info();
    } else {
      window.confirm(
        "Debes marcar al menos una acción realizada o en su defecto marcar 'Ninguna acción realizada', por favor verifica este dato."
      );
    }
  };

  const set_info = (e) => {
    Update_seguimiento.Update_seguimiento(form).then((res) => {
      if (res) {
        Correo_editar_seguimiento.Correo_editar_seguimiento(
          form,
          props.item
        ).then((res_mail) => {
          // console.log(form);
          // console.log(props.item);

          if (res_mail == true) {
            if (
              form.riesgo_individual == 2 ||
              form.riesgo_familiar == 2 ||
              form.riesgo_academico == 2 ||
              form.riesgo_economico == 2 ||
              form.riesgo_vida_universitaria_ciudad == 2
            ) {
              window.alert(
                "Se ha notificado por correo el cambio a riesgo alto en el seguimiento."
              );
            }
          }
          // Puede cambiarse en algún momento
          // else {
          //   window.alert(
          //     "Hubo un error al momento de enviar el correo, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria."
          //   );
          // }
        });

        props.handleClose();
        setTimeout(() => {
          recargarPagina();
        }, 2000); // 5000 milisegundos = 5 segundos
      } else {
        window.alert(
          "Hubo un error al momento de actualizar el seguimiento, por favor verifique si los datos que ingreso son correctos y que llenó toda la información obligatoria."
        );
      }
    });
  };

  const delete_info = (e) => {
    if (window.confirm("¿Está seguro que desea eliminar el seguimiento?")) {
      Delete_seguimiento.Delete_seguimiento(form.id).then((res) => {
        if (res) {
          props.handleClose();
          recargarPagina();
        } else {
          window.alert("Hubo un error al momento de eliminar el seguimiento.");
        }
      });
    }
  };
  const handleFormChecks = (e) => {
    set_form({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  // Limitar temáticas
  // Helper: cuenta cuántos del grupo están marcados en el state
  const countSelected = (state, group) =>
    group.reduce((acc, key) => acc + (state[key] ? 1 : 0), 0);

  // Individual
  const limitarSeleccionIndividual = (e, state) => {
    const { name, checked } = e.target;
    const grupoIndividual = [
      "autoconocimiento",
      "autonomia",
      "proyecto_de_vida",
      "historia_de_vida",
      "salud",
      "relación_eriótico_afectivas",
      "identificación",
      "aspectos_motivacionales",
      "diversidad_sexual",
      "red_de_apoyo",
    ];

    if (!grupoIndividual.includes(name)) return false;

    const seleccionados = countSelected(state, grupoIndividual);

    // Si intenta marcar un tercero → bloquear
    if (checked && seleccionados >= 2) {
      window.alert(
        "Solo puedes seleccionar 2 temáticas en la dimensión 'Individual'."
      );
      return true; // bloqueado
    }

    return false; // no bloqueado
  };

  // Familiar
  const limitarSeleccionFamiliar = (e, state) => {
    const { name, checked } = e.target;
    const grupoFamiliar = [
      "relaciones_familiares",
      "red_de_apoyo_familiar",
      "rol_del_estudiante_en_la_familia",
    ];

    if (!grupoFamiliar.includes(name)) return false;

    const seleccionados = countSelected(state, grupoFamiliar);

    if (checked && seleccionados >= 2) {
      window.alert(
        "Solo puedes seleccionar 2 temáticas en la dimensión 'Familiar'."
      );
      return true; // bloqueado
    }

    return false; // no bloqueado
  };

  // Fin - Familiar

  // Académico
  const limitarSeleccionAcademico = (e, state) => {
    const { name, checked } = e.target;
    const grupoAcademico = [
      "desempeño_académico",
      "elección_vocacional",
      "autogestion_academica",
      "manejo_del_tiempo",
    ];

    if (!grupoAcademico.includes(name)) return false;

    const seleccionados = countSelected(state, grupoAcademico);

    if (checked && seleccionados >= 2) {
      window.alert(
        "Solo puedes seleccionar 2 temáticas en la dimensión 'Academico'."
      );
      return true; // bloqueado
    }

    return false; // no bloqueado
  };
  // Fin - Académico

  // Económico
  const limitarSeleccionEconomico = (e, state) => {
    const { name, checked } = e.target;
    const grupoEconomico = [
      "apoyos_económicos_institucionales",
      "manejo_finanzas",
      "apoyo_económico_familiar",
      "situación_laboral_ocupacional",
    ];

    if (!grupoEconomico.includes(name)) return false;

    const seleccionados = countSelected(state, grupoEconomico);

    if (checked && seleccionados >= 2) {
      window.alert(
        "Solo puedes seleccionar 2 temáticas en la dimensión 'Economico'."
      );
      return true; // bloqueado
    }

    return false; // no bloqueado
  };
  // Fin - Económico
  // Vida Universitaria y Ciudad
  const limitarSeleccionVida = (e, state) => {
    const { name, checked } = e.target;
    const grupoVida = [
      "motivación_compañamiento",
      "referencia_geográfica",
      "adaptación_ciudad_Universidad",
      "movilidad_y_transporte",
      "uso_de_los_servicios_universitarios",
      "integracion_a_la_cultura_universitaria",
      "vivienda",
      "vinculación_grupos_actividades_extracurriculares",
    ];

    if (!grupoVida.includes(name)) return false;

    const seleccionados = countSelected(state, grupoVida);

    if (checked && seleccionados >= 2) {
      window.alert(
        "Solo puedes seleccionar 2 temáticas en la dimensión 'Vida Universitaria'."
      );
      return true; // bloqueado
    }

    return false; // no bloqueado
  };
  // Fin - Vida Universitaria y Ciudad

  // Manejo de los checkbox de riesgo
  const handleForm = (e) => {
    //console.log(e.target.checked)
    if (e.target.name === "riesgo_individual_bajo") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_individual"]: 0,
        });
        setState({
          ...state,
          riesgo_individual_bajo: true,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_individual"]: null,
        });
        setState({
          ...state,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_individual_medio") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_individual"]: 1,
        });
        setState({
          ...state,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: true,
          riesgo_individual_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_individual"]: null,
        });
        setState({
          ...state,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_individual_alto") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_individual"]: 2,
        });
        setState({
          ...state,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: true,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_individual"]: null,
        });
        setState({
          ...state,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_familiar_bajo") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_familiar"]: 0,
        });
        setState({
          ...state,
          riesgo_familiar_bajo: true,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_familiar"]: null,
        });
        setState({
          ...state,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_familiar_medio") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_familiar"]: 1,
        });
        setState({
          ...state,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: true,
          riesgo_familiar_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_familiar"]: null,
        });
        setState({
          ...state,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_familiar_alto") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_familiar"]: 2,
        });
        setState({
          ...state,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: true,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_familiar"]: null,
        });
        setState({
          ...state,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_academico_bajo") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_academico"]: 0,
        });
        setState({
          ...state,
          riesgo_academico_bajo: true,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_academico"]: null,
        });
        setState({
          ...state,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_academico_medio") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_academico"]: 1,
        });
        setState({
          ...state,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: true,
          riesgo_academico_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_academico"]: null,
        });
        setState({
          ...state,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_academico_alto") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_academico"]: 2,
        });
        setState({
          ...state,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: true,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_academico"]: null,
        });
        setState({
          ...state,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_economico_bajo") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_economico"]: 0,
        });
        setState({
          ...state,
          riesgo_economico_bajo: true,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_economico"]: null,
        });
        setState({
          ...state,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_economico_medio") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_economico"]: 1,
        });
        setState({
          ...state,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: true,
          riesgo_economico_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_economico"]: null,
        });
        setState({
          ...state,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_economico_alto") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_economico"]: 2,
        });
        setState({
          ...state,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: true,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_economico"]: null,
        });
        setState({
          ...state,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_vida_universitaria_ciudad_bajo") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_vida_universitaria_ciudad"]: 0,
        });
        setState({
          ...state,
          riesgo_vida_universitaria_ciudad_bajo: true,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_vida_universitaria_ciudad"]: null,
        });
        setState({
          ...state,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_vida_universitaria_ciudad_medio") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_vida_universitaria_ciudad"]: 1,
        });
        setState({
          ...state,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: true,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_vida_universitaria_ciudad"]: null,
        });
        setState({
          ...state,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_vida_universitaria_ciudad_alto") {
      if (e.target.checked === true) {
        set_form({
          ...form,
          ["riesgo_vida_universitaria_ciudad"]: 2,
        });
        setState({
          ...state,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: true,
        });
      } else {
        set_form({
          ...form,
          ["riesgo_vida_universitaria_ciudad"]: null,
        });
        setState({
          ...state,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      }
    } else {
      // Ejecutar los bloqueos (devuelven true si se bloquea)
      const bloqueado =
        limitarSeleccionIndividual(e, state) ||
        limitarSeleccionFamiliar(e, state) ||
        limitarSeleccionAcademico(e, state) ||
        limitarSeleccionEconomico(e, state) ||
        limitarSeleccionVida(e, state);

      if (bloqueado) return;

      // Actualización normal del estado:
      set_form({
        ...form,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const userRole = desencriptar(sessionStorage.getItem("rol"));

  const [state, setState] = useState({
    riesgo_individual_bajo: false,
    riesgo_individual_medio: false,
    riesgo_individual_alto: false,
    riesgo_familiar_bajo: false,
    riesgo_familiar_medio: false,
    riesgo_familiar_alto: false,
    riesgo_academico_bajo: false,
    riesgo_academico_medio: false,
    riesgo_academico_alto: false,
    riesgo_economico_bajo: false,
    riesgo_economico_medio: false,
    riesgo_economico_alto: false,
    riesgo_vida_universitaria_ciudad_bajo: false,
    riesgo_vida_universitaria_ciudad_medio: false,
    riesgo_vida_universitaria_ciudad_alto: false,
  });

  const actualizar_riesgo = (prop, value) => {
    setState((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  useEffect(() => {
    actualizar_riesgo(
      "riesgo_individual_bajo",
      props.item.riesgo_individual === 0
    );
    actualizar_riesgo(
      "riesgo_individual_medio",
      props.item.riesgo_individual === 1
    );
    actualizar_riesgo(
      "riesgo_individual_alto",
      props.item.riesgo_individual === 2
    );
    actualizar_riesgo("riesgo_familiar_bajo", props.item.riesgo_familiar === 0);
    actualizar_riesgo(
      "riesgo_familiar_medio",
      props.item.riesgo_familiar === 1
    );
    actualizar_riesgo("riesgo_familiar_alto", props.item.riesgo_familiar === 2);
    actualizar_riesgo(
      "riesgo_academico_bajo",
      props.item.riesgo_academico === 0
    );
    actualizar_riesgo(
      "riesgo_academico_medio",
      props.item.riesgo_academico === 1
    );
    actualizar_riesgo(
      "riesgo_academico_alto",
      props.item.riesgo_academico === 2
    );
    actualizar_riesgo(
      "riesgo_economico_bajo",
      props.item.riesgo_economico === 0
    );
    actualizar_riesgo(
      "riesgo_economico_medio",
      props.item.riesgo_economico === 1
    );
    actualizar_riesgo(
      "riesgo_economico_alto",
      props.item.riesgo_economico === 2
    );
    actualizar_riesgo(
      "riesgo_vida_universitaria_ciudad_bajo",
      props.item.riesgo_vida_universitaria_ciudad === 0
    );
    actualizar_riesgo(
      "riesgo_vida_universitaria_ciudad_medio",
      props.item.riesgo_vida_universitaria_ciudad === 1
    );
    actualizar_riesgo(
      "riesgo_vida_universitaria_ciudad_alto",
      props.item.riesgo_vida_universitaria_ciudad === 2
    );
  }, []);

  /**
   * Función para enviar las observaciones del seguimiento.
   */
  const enviar_observaciones = () => {
    // console.log("Boton enviar observaciones");
    // console.log(form);
    Seguimientos_enviar_observaciones.seguimiento_enviar_observaciones(
      form
    ).then((res) => {
      if (res) {
        //   recargarPagina();
        //   props.handleClose();
        console.log("Observaciones enviadas");
        alert("Observaciones enviadas");
        setShowModalMail(false);
      } else {
        window.confirm(
          "Hubo un error con el servidor al momento de enviar las observaciones, por favor envianos el documento CSV o vuelve a intentar el registro."
        );
      }
    });
  };
  return (
    <Modal {...props} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Seguimiento Individual</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>
          <b>Seguimiento de Pares</b>
        </h1>
        <hr></hr>
        <Row>
          <Col>
            <Row className="g-2">
              <h6>Fecha*:</h6>
            </Row>
            <Row className="g-2">
              <Form.Control
                type="date"
                defaultValue={props.item.fecha}
                name="fecha"
                onChange={handleForm}
                min="2025-08-15"
              />
            </Row>
          </Col>
          <Col>
            <Row className="g-2">
              <h6>Modalidad*:</h6>
            </Row>
            <Row className="g-2">
              <Form.Select
                defaultValue={props.item.lugar}
                name="lugar"
                onChange={handleForm}
              >
                <option value="" id="opcion_por_defecto" disabled></option>
                <option value="Presencial Campus Melendez">
                  Presencial Campus Melendez
                </option>
                <option value="Presencial Campus San Fernando">
                  Presencial Campus San Fernando
                </option>
                <option value="Presencial Sede Norte del cauca">
                  Presencial Sede Norte del cauca
                </option>
                <option value="Presencial Sede Tuluá">
                  Presencial Sede Tuluá
                </option>
                <option value="Presencial Sede Buga">
                  Presencial Sede Buga
                </option>
                <option value="Presencial Sede Pacifico">
                  Presencial Sede Pacifico
                </option>
                <option value="Presencial Sede Caicedonia">
                  Presencial Sede Caicedonia
                </option>
                <option value="Presencial Sede Cartago">
                  Presencial Sede Cartago
                </option>
                <option value="Presencial Sede Palmira">
                  Presencial Sede Palmira
                </option>
                <option value="Presencial Sede Zarzal">
                  Presencial Sede Zarzal
                </option>
                <option value="Presencial Sede Yumbo">
                  Presencial Sede Yumbo
                </option>
                <option value="Contacto Telefónico o por Chat">
                  Contacto Telefónico o por Chat
                </option>
                <option value="Reunión Virtual (Video llamada)">
                  Reunión Virtual (Video llamada)
                </option>
                <option value="Fuera de la Universidad">
                  Fuera de la Universidad
                </option>
              </Form.Select>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="g-2">
              <h6>Hora de Inicio*:</h6>
            </Row>
            <Row className="g-2">
              <Form.Control
                type="time"
                defaultValue={props.item.hora_inicio}
                name="hora_inicio"
                onChange={handleForm}
              />
            </Row>
          </Col>
          <Col>
            <Row className="g-2">
              <h6>Hora de Finalización*:</h6>
            </Row>
            <Row className="g-2">
              <Form.Control
                type="time"
                defaultValue={props.item.hora_finalización}
                name="hora_finalización"
                onChange={handleForm}
              />
            </Row>
          </Col>
        </Row>
        <Row className="g-2">
          <h6>Objetivo 1*:</h6>
        </Row>
        <Row className="g-2">
          <Form.Select
            defaultValue={props.item.objetivos}
            name="objetivos"
            onChange={handleForm}
            className="custom-select-width"
          >
            <option value="" id="opcion_por_defecto" disabled></option>
            <option value="Explicar los objetivos de la Estrategia ASES y realizar la presentación por parte del monitor(a)">
              Explicar los objetivos de la Estrategia ASES y realizar la
              presentación por parte del monitor(a)
            </option>
            <option value="Conocer aspectos básicos de las dimensiones del estudiante.">
              Primer contacto para conocer aspectos iniciales de las dimensiones
              del estudiante.
            </option>
            <option value="Actualizar la información personal y conocer los aspectos generales del estudiante">
              Actualizar la información personal y de contacto.
            </option>
            <option value="Seguimiento al nivel de riesgo de las dimensiones del estudiante">
              Seguimiento al nivel de riesgo de las dimensiones del estudiante
            </option>
            <option value="Realización de Actividad Individual Socioeducativa (taller par - par)">
              Realización de Actividad Individual Socioeducativa (taller par -
              par)
            </option>
            <option value="Realización de Actividad Individual académica (trabajo, taller, informe, presentación, etc)">
              Realización de Actividad Individual académica (trabajo, taller,
              informe, presentación, etc)
            </option>
            <option value="Reconocimiento de la Universidad">
              Reconocimiento de la Universidad
            </option>
            <option value="Reconocimiento de la Ciudad">
              Reconocimiento de la Ciudad
            </option>
            <option value="Acompañar en el proceso de solicitud de apoyos a dependencias de la universidad)">
              Acompañar en el proceso de solicitud de apoyos a dependencias de
              la universidad
            </option>
            <option value="Apoyar a el o la estudiante en su proceso de cancelación del semestre">
              Apoyar a el o la estudiante en su proceso de cancelación del
              semestre
            </option>
            <option value="Apoyar a el o la estudiante en su proceso de adición y/o cancelación de materias">
              Apoyar a el o la estudiante en su proceso de adición y/o
              cancelación de materias
            </option>
            <option value="Ficha de Cierre (Último encuentro)">
              Ficha de Cierre (Último encuentro)
            </option>
            <option value="Ficha de Final (Resumen del proceso)">
              Ficha Final (Resumen del proceso)
            </option>
          </Form.Select>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6>Objetivo 2:</h6>
        </Row>
        <Row className="g-2">
          <Form.Select
            defaultValue={props.item.objetivos2}
            name="objetivos2"
            onChange={handleForm}
            className="custom-select-width"
          >
            <option value="" id="opcion_por_defecto" disabled></option>
            <option value="Explicar los objetivos de la Estrategia ASES y realizar la presentación por parte del monitor(a)">
              Explicar los objetivos de la Estrategia ASES y realizar la
              presentación por parte del monitor(a)
            </option>
            <option value="Conocer aspectos básicos de las dimensiones del estudiante.">
              Primer contacto para conocer aspectos iniciales de las dimensiones
              del estudiante.
            </option>
            <option value="Actualizar la información personal y conocer los aspectos generales del estudiante">
              Actualizar la información personal y de contacto.
            </option>
            <option value="Seguimiento al nivel de riesgo de las dimensiones del estudiante">
              Seguimiento al nivel de riesgo de las dimensiones del estudiante
            </option>
            <option value="Realización de Actividad Individual Socioeducativa (taller par - par)">
              Realización de Actividad Individual Socioeducativa (taller par -
              par)
            </option>
            <option value="Realización de Actividad Individual académica (trabajo, taller, informe, presentación, etc)">
              Realización de Actividad Individual académica (trabajo, taller,
              informe, presentación, etc)
            </option>
            <option value="Reconocimiento de la Universidad">
              Reconocimiento de la Universidad
            </option>
            <option value="Reconocimiento de la Ciudad">
              Reconocimiento de la Ciudad
            </option>
            <option value="Acompañar en el proceso de solicitud de apoyos a dependencias de la universidad)">
              Acompañar en el proceso de solicitud de apoyos a dependencias de
              la universidad
            </option>
            <option value="Apoyar a el o la estudiante en su proceso de cancelación del semestre">
              Apoyar a el o la estudiante en su proceso de cancelación del
              semestre
            </option>
            <option value="Apoyar a el o la estudiante en su proceso de adición y/o cancelación de materias">
              Apoyar a el o la estudiante en su proceso de adición y/o
              cancelación de materias
            </option>
            <option value="Ficha de Cierre (Último encuentro)">
              Ficha de Cierre (Último encuentro)
            </option>
            <option value="Ficha de Final (Resumen del proceso)">
              Ficha Final (Resumen del proceso)
            </option>
          </Form.Select>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6>Objetivo 3:</h6>
        </Row>
        <Row className="g-2">
          <Form.Select
            defaultValue={props.item.objetivos3}
            name="objetivos3"
            onChange={handleForm}
            className="custom-select-width"
          >
            <option value="" id="opcion_por_defecto" disabled></option>
            <option value="Explicar los objetivos de la Estrategia ASES y realizar la presentación por parte del monitor(a)">
              Explicar los objetivos de la Estrategia ASES y realizar la
              presentación por parte del monitor(a)
            </option>
            <option value="Conocer aspectos básicos de las dimensiones del estudiante.">
              Primer contacto para conocer aspectos iniciales de las dimensiones
              del estudiante.
            </option>
            <option value="Actualizar la información personal y conocer los aspectos generales del estudiante">
              Actualizar la información personal y de contacto.
            </option>
            <option value="Seguimiento al nivel de riesgo de las dimensiones del estudiante">
              Seguimiento al nivel de riesgo de las dimensiones del estudiante
            </option>
            <option value="Realización de Actividad Individual Socioeducativa (taller par - par)">
              Realización de Actividad Individual Socioeducativa (taller par -
              par)
            </option>
            <option value="Realización de Actividad Individual académica (trabajo, taller, informe, presentación, etc)">
              Realización de Actividad Individual académica (trabajo, taller,
              informe, presentación, etc)
            </option>
            <option value="Reconocimiento de la Universidad">
              Reconocimiento de la Universidad
            </option>
            <option value="Reconocimiento de la Ciudad">
              Reconocimiento de la Ciudad
            </option>
            <option value="Acompañar en el proceso de solicitud de apoyos a dependencias de la universidad)">
              Acompañar en el proceso de solicitud de apoyos a dependencias de
              la universidad
            </option>
            <option value="Apoyar a el o la estudiante en su proceso de cancelación del semestre">
              Apoyar a el o la estudiante en su proceso de cancelación del
              semestre
            </option>
            <option value="Apoyar a el o la estudiante en su proceso de adición y/o cancelación de materias">
              Apoyar a el o la estudiante en su proceso de adición y/o
              cancelación de materias
            </option>
            <option value="Ficha de Cierre (Último encuentro)">
              Ficha de Cierre (Último encuentro)
            </option>
            <option value="Ficha de Final (Resumen del proceso)">
              Ficha Final (Resumen del proceso)
            </option>
          </Form.Select>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6 title="Corresponde a la información que refiere el/la estudiante respecto a los aspectos personales.">
            Individual:
          </h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.individual}
            name="individual"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Bajo"
              checked={state.riesgo_individual_bajo}
              name="riesgo_individual_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={state.riesgo_individual_medio}
              name="riesgo_individual_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={state.riesgo_individual_alto}
              name="riesgo_individual_alto"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (individual)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Tipo de saber que tiene cada sujeto de sí mismo, ya sea de sus representaciones, estados mentales, percepciones, acciones, de su cuerpo, entre otros. En esta temática se incluyen todos los aspectos de conocimiento de sí mismos que los estudiantes expresan sobre cómo se sienten, lo que desean, lo que piensan, lo que los impulsa a actuar, sus valores, todo aquello que constituye su ser desde tres pilares: identidad, autoestima y autoconstrucción."
              type="checkbox"
              label="Autoconocimiento"
              name="autoconocimiento"
              checked={!!form.autoconocimiento}
              onChange={handleFormChecks}
              disabled={
                !form.autoconocimiento &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Se refiere a la capacidad de autogestión, resolución y toma de decisiones del/la estudiante. Reconociendo su momento vital, recursos de gestión de las emociones y de situaciones retadoras."
              type="checkbox"
              label="Autonomia"
              name="autonomia"
              checked={!!form.autonomia}
              onChange={handleFormChecks}
              disabled={
                !form.autonomia &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Engloba todos los proyectos y metas a mediano y largo plazo que los estudiantes manifestan en los acompañamientos entre pares. El proyecto de vida articula la identidad con las perspectivas y posibilidades de desarrollo futuro."
              type="checkbox"
              label="Proyecto de vida"
              name="proyecto_de_vida"
              checked={!!form.proyecto_de_vida}
              onChange={handleFormChecks}
              disabled={
                !form.proyecto_de_vida &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Esta temática hace referencia a todas las narraciones de vida en tiempo pasado que realizan los estudiantes desde los diferentes contextos socioculturales que vivieron; da cuenta de las prácticas, creencias y valores familiares y culturales que influyen en sus decisiones y en sus formas de ver el mundo."
              type="checkbox"
              label="Historia de vida"
              name="historia_de_vida"
              checked={!!form.historia_de_vida}
              onChange={handleFormChecks}
              disabled={
                !form.historia_de_vida &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática hace referencia aquellas acciones que permitan identificar y conocer el estado de salud del estudiante, así como su evolución en caso de enfermar o sufrir algún accidente. También se refiere a los reportes que se tengan acerca de la salud mental del estudiante.
               * Informe de cómo se encuentra el estudiante de salud.
               * Informe sobre el seguimiento a sus citas médicas y psicológicas.
               * Informe sobre trámites de la EPS, del Servicio médico y psicológico."
              type="checkbox"
              label="Salud"
              name="salud"
              checked={!!form.salud}
              onChange={handleFormChecks}
              disabled={
                !form.salud &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática contiene todo lo referido por los estudiantes narrativamente en relación con sus relaciones eróticas, afectivas y sentimentales."
              type="checkbox"
              label="Relaciones erótico-afectivas"
              name="relación_eriótico_afectivas"
              checked={!!form.relación_eriótico_afectivas}
              onChange={handleFormChecks}
              disabled={
                !form.relación_eriótico_afectivas &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Documento oficial emitido por la Administración que sirve para identificar a las personas por su nombre, nacimiento, nacionalidad y domicilio."
              type="checkbox"
              label="Documentos de identificación"
              name="identificación"
              checked={!!form.identificación}
              onChange={handleFormChecks}
              disabled={
                !form.identificación &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="El proceso psicológico básico de la motivación contiene dos componentes principales:“los direccionales (que dan cuenta de la elección) y los energizadores (que dan cuenta de la iniciación, la persistencia y el vigor) de la conducta dirigida a meta”"
              type="checkbox"
              label="Aspectos motivacionales"
              name="aspectos_motivacionales"
              checked={!!form.aspectos_motivacionales}
              onChange={handleFormChecks}
              disabled={
                !form.aspectos_motivacionales &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Todos aquellos reconocimientos, prácticas y relaciones establecidas por el estudiante; frente a su género, identidad sexual, preferencia sexual y, ante la diversidad sexual de las personas en su contexto cotidiano."
              type="checkbox"
              label="Diversidad sexual"
              name="diversidad_sexual"
              checked={!!form.diversidad_sexual}
              onChange={handleFormChecks}
              disabled={
                !form.diversidad_sexual &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Todos aquellos vínculos que tiene el estudiante con otros individuos y/o grupos que sirven para mejorar la adaptación cuando este se enfrenta a situaciones de estrés, reto o privación y que sirven como instancia mediadora en la que se brinda apoyo social de tipo emocional, afectivo e informacional"
              type="checkbox"
              label="Red de apoyo"
              name="red_de_apoyo"
              checked={!!form.red_de_apoyo}
              onChange={handleFormChecks}
              disabled={
                !form.red_de_apoyo &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "autoconocimiento",
                      "autonomia",
                      "proyecto_de_vida",
                      "historia_de_vida",
                      "salud",
                      "relación_eriótico_afectivas",
                      "identificación",
                      "aspectos_motivacionales",
                      "diversidad_sexual",
                      "red_de_apoyo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6 title="Corresponde a la descripción de la dinámica familiar y como esta dinámica, es una barrera o un facilitador en la elección y la permanencia en el programa académico.">
            Familiar:
          </h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.familiar}
            name="familiar"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Bajo"
              checked={state.riesgo_familiar_bajo}
              name="riesgo_familiar_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={state.riesgo_familiar_medio}
              name="riesgo_familiar_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={state.riesgo_familiar_alto}
              name="riesgo_familiar_alto"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Familiar)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Narraciones del/la estudiante que den cuenta del tipo de conexiones y vínculos entre los miembros de su círculo familia.  Así como, del efecto de estos vínculos en su vida cotidiana."
              type="checkbox"
              label="Relaciones Familiares"
              name="relaciones_familiares"
              checked={!!form.relaciones_familiares}
              onChange={handleFormChecks}
              disabled={
                !form.relaciones_familiares &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "relaciones_familiares",
                      "red_de_apoyo_familiar",
                      "rol_del_estudiante_en_la_familia",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Narraciones del/la estudiante acerca de la respuesta de su familia y de su círculo de mayor confianza ante situaciones en las que él requiere apoyo y el efecto de estas respuestas en su vida cotidiana."
              type="checkbox"
              label="Red de Apoyo Familiar"
              name="red_de_apoyo_familiar"
              checked={!!form.red_de_apoyo_familiar}
              onChange={handleFormChecks}
              disabled={
                !form.red_de_apoyo_familiar &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "relaciones_familiares",
                      "red_de_apoyo_familiar",
                      "rol_del_estudiante_en_la_familia",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Narraciones de el/la estudiante que den cuenta de las responsabilidades, actividades, expectativas frente a la vida familiar que se le encargan al estudiante  y, el efecto de estas en su vida cotidiana."
              type="checkbox"
              label="Rol del Estudiante en la Familia"
              name="rol_del_estudiante_en_la_familia"
              checked={!!form.rol_del_estudiante_en_la_familia}
              onChange={handleFormChecks}
              disabled={
                !form.rol_del_estudiante_en_la_familia &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "relaciones_familiares",
                      "red_de_apoyo_familiar",
                      "rol_del_estudiante_en_la_familia",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6 title="Corresponde a la información que el/la estudiante le manifiesta al monitor; en relación a su desempeño académico; además del nivel desarrollo de habilidades que se han identificado en las actividades académicas que desarrolla cada uno de los estudiantes.">
            Academico:
          </h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.academico}
            name="academico"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Bajo"
              checked={state.riesgo_academico_bajo}
              name="riesgo_academico_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={state.riesgo_academico_medio}
              name="riesgo_academico_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={state.riesgo_academico_alto}
              name="riesgo_academico_alto"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Academico)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Las narraciones realizadas por los estudiantes en torno a las metodologias utilizadas en las clases, información de las diversas asignaturas y seguimientos académicos; ejemplo: reporte del rendimiento académico (notas), reporte de la carga académica, informe de las necesidades académicas identificadas con el estudiante (bases conceptules para las diversas asignaturas) y refuerzo académico (asesorías académicas). Además, se incluye la revisión de las habilidades académicas y recursos con los que el estudiante cuenta para superar la exigencia en sus asignaturas."
              type="checkbox"
              label="Desempeño académico"
              name="desempeño_académico"
              checked={!!form.desempeño_académico}
              onChange={handleFormChecks}
              disabled={
                !form.desempeño_académico &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "desempeño_académico",
                      "elección_vocacional",
                      "autogestion_academica",
                      "manejo_del_tiempo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática hace referencia a las preferencias de áreas di linares y carreras de los estudiantes, la búsqueda de información y conocimiento de sus carreras de elección y las estrategias implementadas por los monitores para contribuir en sus procesos de orientación vocacional concebida ésta como un vínculo conversacional en el que el estudiante recibe apoyo en el marco de encontrar alternativas y tomar ndecisiones, de manera consciente voluntaria y comprometida (De Mori 2, Santiviago, sf."
              type="checkbox"
              label="Elección vocacional"
              name="elección_vocacional"
              checked={!!form.elección_vocacional}
              onChange={handleFormChecks}
              disabled={
                !form.elección_vocacional &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "desempeño_académico",
                      "elección_vocacional",
                      "autogestion_academica",
                      "manejo_del_tiempo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Hace referencia a la capacidad del estudiante para organizar, regular y orientar de forma autónoma su proceso de aprendizaje. Implica planificar su tiempo, establecer metas, identificar y aplicar estrategias de estudio, mantener la motivación, manejar el estrés académico y la procrastinación con el fin de tomar decisiones conscientes que favorezcan su desempeño y bienestar académico."
              type="checkbox"
              label="Autogestión académica"
              name="autogestion_academica"
              checked={!!form.autogestion_academica}
              onChange={handleFormChecks}
              disabled={
                !form.autogestion_academica &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "desempeño_académico",
                      "elección_vocacional",
                      "autogestion_academica",
                      "manejo_del_tiempo",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6 title="Información relacionada con la situación económica de los estudiantes y el manejo del dinero.">
            Económico:
          </h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.economico}
            name="economico"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Bajo"
              checked={state.riesgo_economico_bajo}
              name="riesgo_economico_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={state.riesgo_economico_medio}
              name="riesgo_economico_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={state.riesgo_economico_alto}
              name="riesgo_economico_alto"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Económico)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="El reporte de la necesidad del estudiante de acceder a los apoyos institucionales o gubernamentales; así como todos las gestiones que los estudiantes realizan para recibir apoyos económicos. (ICETEX, Jóvenes en Acción / renta jóven  Bienestar Universitario,  monitorias, etc.)"
              type="checkbox"
              label="Apoyos económicos institucionales"
              name="apoyos_económicos_institucionales"
              checked={!!form.apoyos_económicos_institucionales}
              onChange={handleFormChecks}
              disabled={
                !form.apoyos_económicos_institucionales &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Principios y herramientas que ayudan a optimizar los recursos financieros con que cuenta una persona. Esta temática contiene todos los aspectos de manejo de dinero, inversión de recursos, ingresos y egresos financieros, mecanismos de ahorro, entre otros."
              type="checkbox"
              label="Manejo de sus finanzas"
              name="manejo_finanzas"
              checked={!!form.manejo_finanzas}
              onChange={handleFormChecks}
              disabled={
                !form.manejo_finanzas &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Lo socioeconómico, entendido como un “enfoque teórico y metodológico necesariamente transdisciplinar, que pretende entender integralmente la complejidad social a partir de la observación, descripción y análisis orientada a la acción en y desde la realidad” (Coraggio €: Arancibia, 2006). Esta temática involucra aspectos económicos y sociológicos como la preparación laboral, ubicación social y familiar en la sociedad."
              type="checkbox"
              label="Apoyo económico familiar"
              name="apoyo_económico_familiar"
              checked={!!form.apoyo_económico_familiar}
              onChange={handleFormChecks}
              disabled={
                !form.apoyo_económico_familiar &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Se refiere a las diversas actividades que realiza el/la estudiante para cubrir sus gastos personales y académicos; y la relación de estas ocupaciones con su actividad académica en la Universidad."
              type="checkbox"
              label="Situación laboral y ocupacional"
              name="situación_laboral_ocupacional"
              checked={!!form.situación_laboral_ocupacional}
              onChange={handleFormChecks}
              disabled={
                !form.situación_laboral_ocupacional &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6 title="Corresponde a la información que refiere el/la estudiante respecto a la percepción que éste tiene de su vida en la Universidad y la ciudad. Además de la participación en los diferentes espacios de la Universidad (espacios extracurriculares, monitorías, , servicios de la Universidad, grupos universitarios, etc.) y la ciudad (vivienda, barrio, transporte, sitios representativos, espacios culturales, etc.).">
            Vida universitaria y ciudad*:
          </h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.vida_universitaria_ciudad}
            name="vida_universitaria_ciudad"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Bajo"
              checked={state.riesgo_vida_universitaria_ciudad_bajo}
              name="riesgo_vida_universitaria_ciudad_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={state.riesgo_vida_universitaria_ciudad_medio}
              name="riesgo_vida_universitaria_ciudad_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={state.riesgo_vida_universitaria_ciudad_alto}
              name="riesgo_vida_universitaria_ciudad_alto"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Vida universitaria y ciudad)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Esta temática aborda los momentos de presentación entre el monitor y el estudiante, incluyendo además la explicación de la estrategia ASES y expectativas de ingreso a la universidad de parte de los estudiantes y del acompañamiento que van a tener."
              type="checkbox"
              label="Motivación para el acompañamiento"
              name="motivación_compañamiento"
              checked={!!form.motivación_compañamiento}
              onChange={handleFormChecks}
              disabled={
                !form.motivación_compañamiento &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="El conocimiento por parte de los/las estudiantes, de las caracteristicas y lugares de los territorios cotidianos (tanto en la universidad como en la ciudad, municipio o distrito que habitan)"
              type="checkbox"
              label="Referenciación geográfica"
              name="referencia_geográfica"
              checked={!!form.referencia_geográfica}
              onChange={handleFormChecks}
              disabled={
                !form.referencia_geográfica &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Todo lo expresado por los/las estudiantes en relación a la adaptación a las dinámicas, caracteristicas culturales, sociales y climáticas del territorio en el que se encuentran cursando su formación universitaria."
              type="checkbox"
              label="Adaptación al territorio"
              name="adaptación_ciudad_Universidad"
              checked={!!form.adaptación_ciudad_Universidad}
              onChange={handleFormChecks}
              disabled={
                !form.adaptación_ciudad_Universidad &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Todo lo relacionado con el deplazamiento que realizan los y las estudiantes para llegar desde su vivienda al campus; teniendo en cuenta que algunos son foráneos, otros residen fuera del municipio y no todos cuentan con transporte particular para desplazarse."
              type="checkbox"
              label="Movilidad y transporte"
              name="movilidad_y_transporte"
              checked={!!form.movilidad_y_transporte}
              onChange={handleFormChecks}
              disabled={
                !form.movilidad_y_transporte &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Hace referencia a cómo el/la estudiante se identifica y se siente acogido/a en la comunidad universitaria; donde se identifica su nivel de conexión con el entorno, el grado de integración a las dinámicas institucionales, la calidad de sus relaciones con compañeros/as, docentes y equipos de apoyo, así como su disposición a participar en actividades, espacios y servicios ofrecidos por la universidad."
              type="checkbox"
              label="Integración a la cultura universitaria"
              name="integracion_a_la_cultura_universitaria"
              checked={!!form.integracion_a_la_cultura_universitaria}
              onChange={handleFormChecks}
              disabled={
                !form.integracion_a_la_cultura_universitaria &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Lo relacionado con el interés, exploración y vinculación de los estudiantes a grupos estudiantiles, académicos, investigativos, culturales, y deportivos de la Universidad del Valle o externos."
              type="checkbox"
              label="Vinculación a grupos y realización de actividades extracurriculares"
              name="vinculación_grupos_actividades_extracurriculares"
              checked={!!form.vinculación_grupos_actividades_extracurriculares}
              onChange={handleFormChecks}
              disabled={
                !form.vinculación_grupos_actividades_extracurriculares &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="El reconocimiento y la participación de los y las estudiantes en los espacios y servicios institucionales (servicio de psicología, bienestar universitario, acompañamiento socioeducativo, talleres, actividades, etc.)"
              type="checkbox"
              label="Uso de los servicios universitarios"
              name="uso_de_los_servicios_universitarios"
              checked={!!form.uso_de_los_servicios_universitarios}
              onChange={handleFormChecks}
              disabled={
                !form.uso_de_los_servicios_universitarios &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática contiene todas las particularidades de vivienda de los estudiantes, incluyendo organización del espacio, problemas con los inquilinos, entre otros y la utilización del programa GeoCalízate."
              type="checkbox"
              label="Vivienda"
              name="vivienda"
              checked={!!form.vivienda}
              onChange={handleFormChecks}
              disabled={
                !form.vivienda &&
                Object.values(form).filter(
                  (v, i) =>
                    [
                      "motivación_compañamiento",
                      "referencia_geográfica",
                      "adaptación_ciudad_Universidad",
                      "movilidad_y_transporte",
                      "uso_de_los_servicios_universitarios",
                      "integracion_a_la_cultura_universitaria",
                      "vivienda",
                      "vinculación_grupos_actividades_extracurriculares",
                    ].includes(Object.keys(form)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col></Col>
        </Row>
        <hr></hr>
        <Row>
          <h6>
            <b>Acciones del Monitor</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Apoyo por parte del monitor socioeducativo en la resolución de talleres o preparación de trabajos en el marco de los mismos acompañamientos entre pares."
              type="checkbox"
              label="Apoyo académico"
              defaultChecked={props.item.apoyo_académico}
              name="apoyo_académico"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor invita al estudiante a participar en uno de los talleres grupales que el practicante o alguno de los profesionales de la estrategia ha creado para suplir algunos temas de interés"
              type="checkbox"
              label="Rem. Actividades grupales"
              defaultChecked={props.item.rem_actividades_grupales}
              name="rem_actividades_grupales"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="Apoyo al estudiante en la información para procesos de pago de matrícula, recibos y revisión de deudas."
              type="checkbox"
              label="Rem. Matrícula financiera"
              defaultChecked={props.item.rem_matrícula_financiera}
              name="rem_matrícula_financiera"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Talleres individuales y específicos desarrollados por el monitor en el marco del acompañamiento entre pares que busca profundizar en temas específicos Ejemplo: historia de vida, manejo del tiempo, estrategias de estudio etc."
              type="checkbox"
              label="Taller par-par"
              defaultChecked={props.item.taller_par_par}
              name="taller_par_par"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor invita al estudiante a participar de las sesiones de trabajo grupales que se ofertan en la estrategia para suplir temas de orden académico (Ej. Monitoria de Calculo)"
              type="checkbox"
              label="Rem. Monitorías académicas"
              defaultChecked={props.item.rem_monitorías_académicas}
              name="rem_monitorías_académicas"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="Apoyo al estudiante en la información para procesos de subsidios económicos, becas de alimentación, apadrinamiento de estudiantes, revisión de matrícula y verificación de estrato."
              type="checkbox"
              label="Rem. Desarrollo humano y promoción SE"
              defaultChecked={props.item.rem_desarrollo_humano_promoción_SE}
              name="rem_desarrollo_humano_promoción_SE"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Apoyo por parte del monitor en el establecimiento en la ciudad y reconocimiento de espacios en la Universidad"
              type="checkbox"
              label="Reconocimiento ciudad y U."
              defaultChecked={props.item.reconocimiento_ciudad_U}
              name="reconocimiento_ciudad_U"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor invita al estudiante a asistir a alguno de los proyectos pedagógicos de la Universidad (Ej. Graca)"
              type="checkbox"
              label="Rem. Proyectos de la Universidad"
              defaultChecked={props.item.rem_proyectos_Universidad}
              name="rem_proyectos_Universidad"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor discute con el estudiante la posibilidad de que este asista con el director de programa para resolver inquietudes frente a su malla curricular y/o proceso académico general."
              type="checkbox"
              label="Rem. Directores de programa"
              defaultChecked={props.item.rem_directores_programa}
              name="rem_directores_programa"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="El monitor discute con el estudiante la posibilidad de que este asista con el profesional encargado a una sesión de acompañamiento o en su defecto habla directamente con el profesional para que este contacte al estudiante debido a dificultades en alguna de las dimensiones"
              type="checkbox"
              label="Rem. Profesional SE"
              defaultChecked={props.item.rem_profesional_SE}
              name="rem_profesional_SE"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title=" El estudiante acompaña o solicita al estudiante pedir cita a servicio médico, psicológico u odontológico."
              type="checkbox"
              label="Rem. Servicio de salud"
              defaultChecked={props.item.rem_servicio_salud}
              name="rem_servicio_salud"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="Invitación a la participación en los grupos Culturales, Académicos, Recreativos, Políticos, Espirituales y Deportivos que existen en la Universidad"
              type="checkbox"
              label="Rem. Grupos de la Universidad"
              defaultChecked={props.item.rem_grupos_universidad}
              name="rem_grupos_universidad"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="El monitor discute con el estudiante la posibilidad de que este asista con el practicante encargado a una sesión de acompañamiento o en su defecto habla directamente con el practicante para que este contacte al estudiante debido a dificultades en alguna de las dimensiones"
              type="checkbox"
              label="Rem. Practicante SE"
              defaultChecked={props.item.rem_racticante_SE}
              name="rem_racticante_SE"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="Apoyo al estudiante en la información para procesos de matrícula, cancelación de semestre o materias, horarios y estímulos académicos entre otros."
              type="checkbox"
              label="Rem. Registro académico"
              defaultChecked={props.item.rem_registro_académico}
              name="rem_registro_académico"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              title="Remisión a programas de apoyo económico externos a la Universidad como (icetex, prestamos financieros entre otros)"
              type="checkbox"
              label="Rem. Externa"
              defaultChecked={props.item.rem_externa}
              name="rem_externa"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Ninguna acción realizada"
              defaultChecked={props.item.Ninguna_acción_realizada}
              name="Ninguna_acción_realizada"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <h6 title="Solo marcar en caso de que se verifique que el estudiante asistió o No a la REM en cuestión.">
            <b>Acciones del Estudiante</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <h6>Asist. Actividades grupales</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_actividades_grupales === true}
              name="asist_actividades_grupales"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_actividades_grupales === false}
              name="asist_actividades_grupales"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
          <Col>
            <h6>Asist. Matrícula financiera</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_matricula_financiera === true}
              name="asist_matricula_financiera"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_matricula_financiera === false}
              name="asist_matricula_financiera"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Asist. Monitorías académicas</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_monitoria_aca === true}
              name="asist_monitoria_aca"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_monitoria_aca === false}
              name="asist_monitoria_aca"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
          <Col>
            <h6>Asist. Desarrollo humano y promoción SE</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_desa_humano === true}
              name="asist_desa_humano"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_desa_humano === false}
              name="asist_desa_humano"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Asist. Proyectos de la Universidad</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_proyect_uni === true}
              name="asist_proyect_uni"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_proyect_uni === false}
              name="asist_proyect_uni"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
          <Col>
            <h6>Asist. Directores de programa</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_dir_programa === true}
              name="asist_dir_programa"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_dir_programa === false}
              name="asist_dir_programa"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Asist. Profesional SE</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_prof_se === true}
              name="asist_prof_se"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_prof_se === false}
              name="asist_prof_se"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
          <Col>
            <h6>Asist. Servicio de salud</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_servi_salud === true}
              name="asist_servi_salud"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_servi_salud === false}
              name="asist_servi_salud"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Asist. Grupos de la Universidad</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_grupo_uni === true}
              name="asist_grupo_uni"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_grupo_uni === false}
              name="asist_grupo_uni"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
          <Col>
            <h6>Asist. Practicante SE</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_practicante_se === true}
              name="asist_practicante_se"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_practicante_se === false}
              name="asist_practicante_se"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Asist. Registro académico</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_regis_academico === true}
              name="asist_regis_academico"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_regis_academico === false}
              name="asist_regis_academico"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
          <Col>
            <h6>Asist. Rem. Externa</h6>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Sí"
              value={true}
              defaultChecked={props.item.asist_rem_externa === true}
              name="asist_rem_externa"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
              defaultChecked={props.item.asist_rem_externa === false}
              name="asist_rem_externa"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6>Observaciones:</h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.observaciones}
            name="observaciones"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Aprobado del profesional"
              defaultChecked={props.item.revisado_profesional}
              disabled={
                !(userRole === "profesional" || userRole === "super_ases")
              }
              name="revisado_profesional"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Aprobado del practicante"
              defaultChecked={props.item.revisado_practicante}
              disabled={
                !(
                  userRole === "practicante" ||
                  userRole === "profesional" ||
                  userRole === "super_ases"
                )
              }
              name="revisado_practicante"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row className="g-2">
          <h6>
            <b>Creación: </b>
          </h6>
          <Row>
            <h6>
              {props.item.nombre_creador} - {hora_creacion.toLocaleDateString()}{" "}
              - {hora_creacion.toLocaleTimeString()}{" "}
            </h6>
          </Row>
        </Row>
        <Row className="g-2">
          <h6>
            <b>Historial de Ediciones:</b>
          </h6>
          {props?.item?.id_editors?.map((editor, index) => (
            <Row key={index}>
              <h6>
                {editor.id_user} - {new Date(editor.fecha).toLocaleDateString()}{" "}
                - {new Date(editor.fecha).toLocaleTimeString()}
              </h6>
            </Row>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <CSVLink
          data={[props.item]}
          filename={"Seguimiento Individual " + props.item.fecha}
        >
          <Button variant="link">Descargar CSV</Button>
        </CSVLink>
        {userRole === "super_ases" ||
        userRole === "profesional" ||
        userRole === "practicante" ? (
          <>
            <Button variant="secondary" onClick={handleShowMail}>
              Envíar observaciones
            </Button>
            <>
              <Modal
                show={showModalMail}
                onHide={handleCloseMail}
                size="md"
                backdrop="static"
                className="observation-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Envío de observaciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="g-2">
                    <h6>Observaciones:</h6>
                  </Row>
                  <Row className="g-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      defaultValue={""}
                      name="observaciones_correo"
                      onChange={(e) =>
                        set_form({
                          ...form,
                          observaciones_correo: e.target.value,
                        })
                      }
                      title="Máximo 5000 caracteres."
                    />
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMail}>
                    Cerrar
                  </Button>
                  <Button variant="secondary" onClick={enviar_observaciones}>
                    Envíar observaciones
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </>
        ) : null}
        {!(
          props.item.revisado_profesional === true &&
          !(userRole === "profesional" || userRole === "super_ases")
        ) ? (
          <>
            <Button
              variant="danger"
              onClick={() => {
                delete_info();
              }}
              disable={
                props.item.revisado_profesional ||
                props.item.revisado_practicante
              }
            >
              Eliminar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                verificador_datos_basicos();
              }}
              disable={
                props.item.revisado_profesional ||
                props.item.revisado_practicante
              }
            >
              Aceptar cambios
            </Button>
          </>
        ) : null}
        <Button
          variant="secondary"
          onClick={() => {
            props.handleClose();
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Seguimiento_individual_edit_v3;
