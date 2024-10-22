import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Create_Seguimiento from "../../service/create_seguimiento";
import { CSVLink } from "react-csv";
import "../../Scss/seguimiento_forms/form_seguimiento_individual_v2.css";
import {
  desencriptarInt,
  encriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const Seguimiento_individual_v2 = (props) => {
  const recargarPagina = () => {
    // Cambiar la URL a la página con el ID del estudiante seleccionado
    sessionStorage.setItem(
      "path",
      encriptar(`/ficha_estudiante/${state.id_estudiante}`)
    );
    window.location.reload();
  };

  const [state, set_state] = useState({
    fecha: null,
    lugar: "",
    hora_inicio: null,
    hora_finalización: null,
    objetivos: "",
    objetivos2: "",
    objetivos3: "",
    individual: "",
    riesgo_individual: null,
    autoconocimiento: false,
    rasgos_de_personalidad: false,
    identificación: false,
    red_de_apoyo: false,
    proyecto_de_vida: false,
    salud: false,
    aspectos_motivacionales: false,
    historia_de_vida: false,
    relación_eriótico_afectivas: false,
    diversidad_sexual: false,
    familiar: "",
    riesgo_familiar: null,
    dinamica_familiar: false,
    academico: "",
    riesgo_academico: null,
    desempeño_académico: false,
    elección_vocacional: false,
    manejo_del_tiempo: false,
    economico: "",
    riesgo_economico: null,
    apoyos_económicos_institucionales: false,
    manejo_finanzas: false,
    apoyo_económico_familiar: false,
    situación_laboral_ocupacional: false,
    vida_universitaria_ciudad: "",
    riesgo_vida_universitaria_ciudad: null,
    motivación_compañamiento: false,
    referencia_geográfica: false,
    adaptación_ciudad_Universidad: false,
    oferta_servicios: false,
    vivienda: false,
    vinculación_grupos_actividades_extracurriculares: false,
    apoyo_académico: false,
    taller_par_par: false,
    reconocimiento_ciudad_U: false,
    rem_profesional_SE: false,
    rem_racticante_SE: false,
    rem_actividades_grupales: false,
    rem_monitorías_académicas: false,
    rem_proyectos_Universidad: false,
    rem_servicio_salud: false,
    rem_registro_académico: false,
    rem_matrícula_financiera: false,
    rem_desarrollo_humano_promoción_SE: false,
    rem_directores_programa: false,
    rem_grupos_universidad: false,
    rem_externa: false,
    Ninguna_acción_realizada: false,
    asist_actividades_grupales: null,
    asist_monitoria_aca: null,
    asist_matricula_financiera: null,
    asist_desa_humano: null,
    asist_proyect_uni: null,
    asist_dir_programa: null,
    asist_prof_se: null,
    asist_servi_salud: null,
    asist_grupo_uni: null,
    asist_practicante_se: null,
    asist_regis_academico: null,
    asist_rem_externa: null,
    observaciones: "",
    revisado_profesional: false,
    revisado_practicante: false,
    primer_acercamiento: false,
    cierre: false,
    id_estudiante: props.estudiante_seleccionado,
    id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),
    id_modificador: null,
    id_semestre: desencriptarInt(sessionStorage.getItem("id_semestre_actual")),
  });
  useEffect(() => {
    set_state({
      ...state,
      id_estudiante: props.estudiante_seleccionado,
    });
  }, [state.fecha]);

  const verificador_datos_basicos = () => {
    if (!!state.fecha) {
      if (!!state.lugar) {
        if (!!state.hora_inicio) {
          if (!!state.hora_finalización) {
            if (!!state.objetivos) {
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
      !!state.individual ||
      !!state.familiar ||
      !!state.academico ||
      !!state.economico ||
      !!state.vida_universitaria_ciudad
    ) {
      if (
        state.objetivos.length < 5000 &&
        state.observaciones.length < 5000 &&
        state.individual.length < 5000 &&
        state.familiar.length < 5000 &&
        state.academico.length < 5000 &&
        state.economico.length < 5000 &&
        state.vida_universitaria_ciudad.length < 5000
      ) {
        verificador_individual();
      } else {
        window.confirm(
          "Recuerda que el límite máximo de caracteres, por cuadro de texto, es de 5000."
        );
      }
    } else {
      window.confirm(
        "Debes diligenciar al menos una dimesión, por favor verifica estos campos."
      );
    }
  };
  const verificador_individual = () => {
    if (!!state.individual) {
      if (
        state.riesgo_individual == 0 ||
        state.riesgo_individual == 1 ||
        state.riesgo_individual == 2
      ) {
        if (
          !!state.autoconocimiento ||
          !!state.rasgos_de_personalidad ||
          !!state.identificación ||
          !!state.red_de_apoyo ||
          !!state.proyecto_de_vida ||
          !!state.salud ||
          !!state.aspectos_motivacionales ||
          !!state.historia_de_vida ||
          !!state.relación_eriótico_afectivas ||
          !!state.diversidad_sexual
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
    if (!!state.familiar) {
      if (
        state.riesgo_familiar == 0 ||
        state.riesgo_familiar == 1 ||
        state.riesgo_familiar == 2
      ) {
        if (!!state.dinamica_familiar) {
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
    if (!!state.academico) {
      if (
        state.riesgo_academico == 0 ||
        state.riesgo_academico == 1 ||
        state.riesgo_academico == 2
      ) {
        if (
          !!state.desempeño_académico ||
          !!state.elección_vocacional ||
          !!state.manejo_del_tiempo
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
    if (!!state.economico) {
      if (
        state.riesgo_economico == 0 ||
        state.riesgo_economico == 1 ||
        state.riesgo_economico == 2
      ) {
        if (
          !!state.apoyos_económicos_institucionales ||
          !!state.apoyo_económico_familiar ||
          !!state.manejo_finanzas ||
          !!state.situación_laboral_ocupacional
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
    if (!!state.vida_universitaria_ciudad) {
      if (
        state.riesgo_vida_universitaria_ciudad == 0 ||
        state.riesgo_vida_universitaria_ciudad == 1 ||
        state.riesgo_vida_universitaria_ciudad == 2
      ) {
        if (
          !!state.motivación_compañamiento ||
          !!state.referencia_geográfica ||
          !!state.adaptación_ciudad_Universidad ||
          !!state.oferta_servicios ||
          !!state.vivienda ||
          !!state.vinculación_grupos_actividades_extracurriculares
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
      !!state.apoyo_académico ||
      !!state.taller_par_par ||
      !!state.reconocimiento_ciudad_U ||
      !!state.rem_profesional_SE ||
      !!state.rem_racticante_SE ||
      !!state.rem_actividades_grupales ||
      !!state.rem_monitorías_académicas ||
      !!state.rem_proyectos_Universidad ||
      !!state.rem_servicio_salud ||
      !!state.rem_registro_académico ||
      !!state.rem_matrícula_financiera ||
      !!state.rem_desarrollo_humano_promoción_SE ||
      !!state.rem_directores_programa ||
      !!state.rem_grupos_universidad ||
      !!state.rem_externa ||
      !!state.Ninguna_acción_realizada
    ) {
      set_info();
    } else {
      window.confirm(
        "Debes marcar al menos una acción realizada o en su defecto marcar 'Ninguna acción realizada', por favor verifica este dato."
      );
    }
  };

  const set_info = () => {
    Create_Seguimiento.create_seguimiento(state).then((res) => {
      if (res) {
        recargarPagina();
        props.handleClose();
      } else {
        window.confirm(
          "Hubo un error con el servidor al momento de crear el seguimiento, por favor envianos el documento CSV o vuelve a intentar el registro."
        );
      }
    });
  };

  const handleChange = () => {
    reset_info();
    props.handleClose();
    props.handleModalIn();
  };
  const reset_info = () => {
    set_state({
      ...state,
      fecha: null,
      lugar: "",
      hora_inicio: null,
      hora_finalización: null,
      objetivos: "",
      objetivos2: "",
      objetivos3: "",
      individual: "",
      riesgo_individual: null,
      autoconocimiento: false,
      rasgos_de_personalidad: false,
      identificación: false,
      red_de_apoyo: false,
      proyecto_de_vida: false,
      salud: false,
      aspectos_motivacionales: false,
      historia_de_vida: false,
      relación_eriótico_afectivas: false,
      diversidad_sexual: false,
      familiar: "",
      riesgo_familiar: null,
      dinamica_familiar: false,
      academico: "",
      riesgo_academico: null,
      desempeño_académico: false,
      elección_vocacional: false,
      manejo_del_tiempo: false,
      economico: "",
      riesgo_economico: null,
      apoyos_económicos_institucionales: false,
      manejo_finanzas: false,
      apoyo_económico_familiar: false,
      situación_laboral_ocupacional: false,
      vida_universitaria_ciudad: "",
      riesgo_vida_universitaria_ciudad: null,
      motivación_compañamiento: false,
      referencia_geográfica: false,
      adaptación_ciudad_Universidad: false,
      oferta_servicios: false,
      vivienda: false,
      vinculación_grupos_actividades_extracurriculares: false,
      apoyo_académico: false,
      taller_par_par: false,
      reconocimiento_ciudad_U: false,
      rem_profesional_SE: false,
      rem_racticante_SE: false,
      rem_actividades_grupales: false,
      rem_monitorías_académicas: false,
      rem_proyectos_Universidad: false,
      rem_servicio_salud: false,
      rem_registro_académico: false,
      rem_matrícula_financiera: false,
      rem_desarrollo_humano_promoción_SE: false,
      rem_directores_programa: false,
      rem_grupos_universidad: false,
      rem_externa: false,
      Ninguna_acción_realizada: false,
      observaciones: "",
      revisado_profesional: false,
      revisado_practicante: false,
      primer_acercamiento: false,
      cierre: false,
      id_estudiante: props.estudiante_seleccionado,
      id_creador: desencriptarInt(sessionStorage.getItem("id_usuario")),
      id_modificador: null,
    });
  };
  const [form, set_form] = useState({
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

  const handleForm = (e) => {
    if (e.target.name === "riesgo_individual_bajo") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_individual"]: 0,
        });
        set_form({
          ...form,
          riesgo_individual_bajo: true,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_individual"]: null,
        });
        set_form({
          ...form,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_individual_medio") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_individual"]: 1,
        });
        set_form({
          ...form,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: true,
          riesgo_individual_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_individual"]: null,
        });
        set_form({
          ...form,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_individual_alto") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_individual"]: 2,
        });
        set_form({
          ...form,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: true,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_individual"]: null,
        });
        set_form({
          ...form,
          riesgo_individual_bajo: false,
          riesgo_individual_medio: false,
          riesgo_individual_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_familiar_bajo") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_familiar"]: 0,
        });
        set_form({
          ...form,
          riesgo_familiar_bajo: true,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_familiar"]: null,
        });
        set_form({
          ...form,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_familiar_medio") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_familiar"]: 1,
        });
        set_form({
          ...form,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: true,
          riesgo_familiar_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_familiar"]: null,
        });
        set_form({
          ...form,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_familiar_alto") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_familiar"]: 2,
        });
        set_form({
          ...form,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: true,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_familiar"]: null,
        });
        set_form({
          ...form,
          riesgo_familiar_bajo: false,
          riesgo_familiar_medio: false,
          riesgo_familiar_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_academico_bajo") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_academico"]: 0,
        });
        set_form({
          ...form,
          riesgo_academico_bajo: true,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_academico"]: null,
        });
        set_form({
          ...form,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_academico_medio") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_academico"]: 1,
        });
        set_form({
          ...form,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: true,
          riesgo_academico_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_academico"]: null,
        });
        set_form({
          ...form,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_academico_alto") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_academico"]: 2,
        });
        set_form({
          ...form,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: true,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_academico"]: null,
        });
        set_form({
          ...form,
          riesgo_academico_bajo: false,
          riesgo_academico_medio: false,
          riesgo_academico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_economico_bajo") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_economico"]: 0,
        });
        set_form({
          ...form,
          riesgo_economico_bajo: true,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_economico"]: null,
        });
        set_form({
          ...form,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_economico_medio") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_economico"]: 1,
        });
        set_form({
          ...form,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: true,
          riesgo_economico_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_economico"]: null,
        });
        set_form({
          ...form,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_economico_alto") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_economico"]: 2,
        });
        set_form({
          ...form,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: true,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_economico"]: null,
        });
        set_form({
          ...form,
          riesgo_economico_bajo: false,
          riesgo_economico_medio: false,
          riesgo_economico_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_vida_universitaria_ciudad_bajo") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_vida_universitaria_ciudad"]: 0,
        });
        set_form({
          ...form,
          riesgo_vida_universitaria_ciudad_bajo: true,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_vida_universitaria_ciudad"]: null,
        });
        set_form({
          ...form,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_vida_universitaria_ciudad_medio") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_vida_universitaria_ciudad"]: 1,
        });
        set_form({
          ...form,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: true,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_vida_universitaria_ciudad"]: null,
        });
        set_form({
          ...form,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      }
    } else if (e.target.name === "riesgo_vida_universitaria_ciudad_alto") {
      if (e.target.checked === true) {
        set_state({
          ...state,
          ["riesgo_vida_universitaria_ciudad"]: 2,
        });
        set_form({
          ...form,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: true,
        });
      } else {
        set_state({
          ...state,
          ["riesgo_vida_universitaria_ciudad"]: null,
        });
        set_form({
          ...form,
          riesgo_vida_universitaria_ciudad_bajo: false,
          riesgo_vida_universitaria_ciudad_medio: false,
          riesgo_vida_universitaria_ciudad_alto: false,
        });
      }
    } else {
      set_state({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const userRole = sessionStorage.getItem("rol");

  return (
    <Modal {...props} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Seguimiento Individual</Modal.Title>
        <Button onClick={handleChange}>Registrar Inasistencia</Button>
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
              <Form.Control type="date" name="fecha" onChange={handleForm} />
            </Row>
          </Col>
          <Col>
            <Row className="g-2">
              <h6>Modalidad*:</h6>
            </Row>
            <Row className="g-2">
              <Form.Select defaultValue="" name="lugar" onChange={handleForm}>
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
              checked={form.riesgo_individual_bajo}
              name="riesgo_individual_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={form.riesgo_individual_medio}
              name="riesgo_individual_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={form.riesgo_individual_alto}
              name="riesgo_individual_alto"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
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
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática engloba todos los proyectos y metas a mediano y largo plazo que los estudiantes manifiestan en los acompañamientos entre pares. El proyecto de vida articula la identidad personal-social en las perspectivas de su dinámica temporal y posibilidades de desarrollo futuro."
              type="checkbox"
              label="Proyecto de vida"
              name="proyecto_de_vida"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática hace referencia a todas las narraciones de vida en tiempo pasado que realizan los estudiantes desde los diferentes contextos socioculturales que vivieron; da cuenta de las prácticas, creencias y valores familiares y culturales que influyen en sus decisiones y en sus formas de ver el mundo."
              type="checkbox"
              label="Historia de vida"
              name="historia_de_vida"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Esta temática está compuesta por las descripciones y apreciaciones que los monitores realizan sobre sus estudiantes asignados en cuanto a características cognitivas, comportamentales, anímicas, y temperamentales."
              type="checkbox"
              label="Rasgos de personalidad"
              name="rasgos_de_personalidad"
              onChange={handleForm}
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
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática contiene todo lo referido por los estudiantes narrativamente en relación con sus parejas afectivas y sentimentales."
              type="checkbox"
              label="Relaciones erótico-afectivas"
              name="relación_eriótico_afectivas"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Esta temática comprende todo lo referente a la obtención, cambio o pérdida de documentos esenciales que se encuentran inscritos en registros oficiales y que le permiten al estudiante el acceso a los servicios sociales del Estado."
              type="checkbox"
              label="Identificación"
              name="identificación"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="El proceso psicológico básico de la motivación contiene dos componentes principales:“los direccionales (que dan cuenta de la elección) y los energizadores (que dan cuenta de la iniciación, la persistencia y el vigor) de la conducta dirigida a meta”"
              type="checkbox"
              label="Aspectos motivacionales"
              name="aspectos_motivacionales"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Todos aquellos reconocimientos, prácticas y relaciones establecidas por el estudiante; frente a su género, identidad sexual, preferencia sexual y, ante la diversidad sexual de las personas en su contexto cotidiano."
              type="checkbox"
              label="Diversidad sexual"
              name="diversidad_sexual"
              onChange={handleForm}
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
              onChange={handleForm}
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
              checked={form.riesgo_familiar_bajo}
              name="riesgo_familiar_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={form.riesgo_familiar_medio}
              name="riesgo_familiar_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={form.riesgo_familiar_alto}
              name="riesgo_familiar_alto"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Familiar)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Corresponde a la descripción de la dinámica familiar y como esta dinámica, es una barrera o un facilitador en la elección y la permanencia en el programa académico."
              type="checkbox"
              label="Dinámica Familiar"
              name="dinamica_familiar"
              onChange={handleForm}
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
              checked={form.riesgo_academico_bajo}
              name="riesgo_academico_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={form.riesgo_academico_medio}
              name="riesgo_academico_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={form.riesgo_academico_alto}
              name="riesgo_academico_alto"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Academico)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Esta temática incluye las narraciones realizadas por los estudiantes en torno a las metodologias utilizadas en las clases, información de las diversas asignaturas y seguimientos académicos; ejemplo: reporte del rendimiento académico (notas), reporte de la carga académica, informe de las necesidades académicas idetificadas con el estudiante (bases conceptules para las diversas asganturas) y refuerzo académico (asesorías académicas). Estos seguimientos tiene como como finalidad identificar y fortalecer las habilidades y destrezas de los estudiantes."
              type="checkbox"
              label="Desempeño académico"
              name="desempeño_académico"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática hace referencia a las preferencias de áreas di linares y carreras de los estudiantes, la búsqueda de información y conocimiento de sus carreras de elección y las estrategias implementadas por los monitores para contribuir en sus procesos de orientación vocacional concebida ésta como un vínculo conversacional en el que el estudiante recibe apoyo en el marco de encontrar alternativas y tomar ndecisiones, de manera consciente voluntaria y comprometida (De Mori 2, Santiviago, sf."
              type="checkbox"
              label="Elección vocacional"
              name="elección_vocacional"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática contiene lo referente a la forma como los estudiantes manejaban el tiempo de acuerdo al establecimiento de sus rutinas diarias, comprendiendo tres aspectos claves: 1) el establecimiento de metas, 2) las herramientas para la gerencia del tiempo y 3) la percepción de control o verificación del uso del tiempo personal (Durán-Aponte £ Pujol, 2012)."
              type="checkbox"
              label="Manejo del tiempo"
              name="manejo_del_tiempo"
              onChange={handleForm}
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
              checked={form.riesgo_economico_bajo}
              name="riesgo_economico_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={form.riesgo_economico_medio}
              name="riesgo_economico_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={form.riesgo_economico_alto}
              name="riesgo_economico_alto"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <h6>
            <b>Temáticas (Económico)</b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Apoyos económicos institucionales: incluye todos los procesos que los estudiantes realizan para recibir apoyos económicos. (ICETEX, Jóvenes en Acción, Bienestar Universitario, monitorias, etc.)"
              label="Apoyos económicos institucionales"
              type="checkbox"
              name="apoyos_económicos_institucionales"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Principios y herramientas que ayudan a optimizar los recursos financieros con que cuenta una persona. Esta temática contiene todos los aspectos de manejo de dinero, inversión de recursos, ingresos y egresos financieros, mecanismos de ahorro, entre otros."
              type="checkbox"
              label="Manejo de sus finanzas"
              name="manejo_finanzas"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Lo socioeconómico, entendido como un “enfoque teórico y metodológico necesariamente transdisciplinar, que pretende entender integralmente la complejidad social a partir de la observación, descripción y análisis orientada a la acción en y desde la realidad” (Coraggio €: Arancibia, 2006). Esta temática involucra aspectos económicos y sociológicos como la preparación laboral, ubicación social y familiar en la sociedad."
              type="checkbox"
              label="Apoyo económico familiar"
              name="apoyo_económico_familiar"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Se refiere a las diversas actividades que realiza el estudiante para cubrir sus gastos personales y académicos; y la relación de estas ocupaciones con su actividad académica en la Universidad."
              type="checkbox"
              label="Situación laboral y ocupacional"
              name="situación_laboral_ocupacional"
              onChange={handleForm}
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
              checked={form.riesgo_vida_universitaria_ciudad_bajo}
              name="riesgo_vida_universitaria_ciudad_bajo"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Medio"
              checked={form.riesgo_vida_universitaria_ciudad_medio}
              name="riesgo_vida_universitaria_ciudad_medio"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Alto"
              checked={form.riesgo_vida_universitaria_ciudad_alto}
              name="riesgo_vida_universitaria_ciudad_alto"
              onChange={handleForm}
            />
          </Col>
          <Col></Col>
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
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="En este apartado nos encontramos con el conocimi nto de nuevos lugares en sus territorios cotidianos de parte de los estudiantes (tanto en la universidad como en la ciudad), muchos de ellos guiados por sus monitores. Informe sobre el recorrido por el campus universitario y/o ciudad."
              type="checkbox"
              label="Referencia geográfica"
              name="referencia_geográfica"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática involucra todo lo expresado por los estudiantes en relación a la adaptación que se encuentran realizando al nuevo contexto de ciudad en el que nse encuentra, para el caso de estudiantes que proceden de otros municipios y regiones del país. Además de las diferentes experiencias que expresan los estudiantes con relación a su adaptación a la Universidad."
              type="checkbox"
              label="Adaptación a la ciudad y Universidad"
              name="adaptación_ciudad_Universidad"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Este apartado contiene la oferta de servicios institucionales y no formales que los monitores realizaban a sus estudiantes en relación al ámbito universitario, de ciudad y nacional."
              type="checkbox"
              label="Oferta de servicios"
              name="oferta_servicios"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Esta temática contiene todas las particularidades de vivienda de los estudiantes, incluyendo organización del espacio, problemas con los inquilinos, entre otros y la utilización del programa Geocalízate."
              type="checkbox"
              label="Vivienda"
              name="vivienda"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Este apartado contiene lo relacionado con el interés, exploración y vinculación de los estudiantes a grupos estudiantiles, académicos, investigativos, culturales, y deportivos de la Universidad del Valle o externos"
              type="checkbox"
              label="Vinculación a grupos y realización de actividades extracurriculares"
              name="vinculación_grupos_actividades_extracurriculares"
              onChange={handleForm}
            />
          </Col>
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
              name="apoyo_académico"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor invita al estudiante a participar en uno de los talleres grupales que el practicante o alguno de los profesionales de la estrategia ha creado para suplir algunos temas de interés"
              type="checkbox"
              label="Rem. Actividades grupales"
              name="rem_actividades_grupales"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Apoyo al estudiante en la información para procesos de pago de matrícula, recibos y revisión de deudas."
              type="checkbox"
              label="Rem. Matrícula financiera"
              name="rem_matrícula_financiera"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Talleres individuales y específicos desarrollados por el monitor en el marco del acompañamiento entre pares que busca profundizar en temas específicos Ejemplo: historia de vida, manejo del tiempo, estrategias de estudio etc."
              type="checkbox"
              label="Taller par-par"
              name="taller_par_par"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor invita al estudiante a participar de las sesiones de trabajo grupales que se ofertan en la estrategia para suplir temas de orden académico (Ej. Monitoria de Calculo)"
              type="checkbox"
              label="Rem. Monitorías académicas"
              name="rem_monitorías_académicas"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Apoyo al estudiante en la información para procesos de subsidios económicos, becas de alimentación, apadrinamiento de estudiantes, revisión de matrícula y verificación de estrato."
              type="checkbox"
              label="Rem. Desarrollo humano y promoción SE"
              name="rem_desarrollo_humano_promoción_SE"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="Apoyo por parte del monitor en el establecimiento en la ciudad y reconocimiento de espacios en la Universidad"
              type="checkbox"
              label="Reconocimiento ciudad y U."
              name="reconocimiento_ciudad_U"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor invita al estudiante a asistir a alguno de los proyectos pedagógicos de la Universidad (Ej. Graca)"
              type="checkbox"
              label="Rem. Proyectos de la Universidad"
              name="rem_proyectos_Universidad"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="El monitor discute con el estudiante la posibilidad de que este asista con el director de programa para resolver inquietudes frente a su malla curricular y/o proceso académico general."
              type="checkbox"
              label="Rem. Directores de programa"
              name="rem_directores_programa"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="El monitor discute con el estudiante la posibilidad de que este asista con el profesional encargado a una sesión de acompañamiento o en su defecto habla directamente con el profesional para que este contacte al estudiante debido a dificultades en alguna de las dimensiones"
              type="checkbox"
              label="Rem. Profesional SE"
              name="rem_profesional_SE"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title=" El estudiante acompaña o solicita al estudiante pedir cita a servicio médico, psicológico u odontológico."
              type="checkbox"
              label="Rem. Servicio de salud"
              name="rem_servicio_salud"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Invitación a la participación en los grupos Culturales, Académicos, Recreativos, Políticos, Espirituales y Deportivos que existen en la Universidad"
              type="checkbox"
              label="Rem. Grupos de la Universidad"
              name="rem_grupos_universidad"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              title="El monitor discute con el estudiante la posibilidad de que este asista con el practicante encargado a una sesión de acompañamiento o en su defecto habla directamente con el practicante para que este contacte al estudiante debido a dificultades en alguna de las dimensiones"
              type="checkbox"
              label="Rem. Practicante SE"
              name="rem_racticante_SE"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Apoyo al estudiante en la información para procesos de matrícula, cancelación de semestre o materias, horarios y estímulos académicos entre otros."
              type="checkbox"
              label="Rem. Registro académico"
              name="rem_registro_académico"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              title="Remisión a programas de apoyo económico externos a la Universidad como (icetex, prestamos financieros entre otros)"
              type="checkbox"
              label="Rem. Externa"
              name="rem_externa"
              onChange={handleForm}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Ninguna acción"
              name="Ninguna_acción_realizada"
              onChange={handleForm}
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
              name="asist_actividades_grupales"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_matricula_financiera"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_monitoria_aca"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_desa_humano"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_proyect_uni"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_dir_programa"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_prof_se"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_servi_salud"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_grupo_uni"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_practicante_se"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_regis_academico"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
              name="asist_rem_externa"
              onChange={handleForm}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="No"
              value={false}
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
            name="observaciones"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
        </Row>
        <hr></hr>
      </Modal.Body>
      <Modal.Footer>
        <CSVLink
          data={[state]}
          filename={"Seguimiento Individual " + state.fecha}
        >
          <Button
            variant="secondary"
            onClick={() => {
              verificador_datos_basicos();
            }}
          >
            Registrar
          </Button>
        </CSVLink>

        <Button
          variant="secondary"
          onClick={() => {
            props.handleClose();
            reset_info();
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Seguimiento_individual_v2;
