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

// se separa la logica de descargar el csv y registrar el seguimiento en otro componente  btn_registar.jsx
import RegistroConCSV from "./btn_registrar";

const Seguimiento_individual_v3 = (props) => {
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
    autonomia: false, // v3
    proyecto_de_vida: false,
    historia_de_vida: false, // v3
    salud: false,
    relación_eriótico_afectivas: false,
    identificación: false,
    aspectos_motivacionales: false,
    diversidad_sexual: false,
    red_de_apoyo: false,
    rasgos_de_personalidad: false,
    familiar: "",
    riesgo_familiar: null,
    dinamica_familiar: false,
    relaciones_familiares: false, // v3
    red_de_apoyo_familiar: false, // v3
    rol_del_estudiante_en_la_familia: false, // v3
    academico: "",
    riesgo_academico: null,
    desempeño_académico: false,
    elección_vocacional: false,
    autogestion_academica: false, // v3
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
    movilidad_y_transporte: false, // v3
    integracion_a_la_cultura_universitaria: false, // v3
    vinculación_grupos_actividades_extracurriculares: false,
    uso_de_los_servicios_universitarios: false, // v3
    vivienda: false,
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
              return verificador_tematicas();
            } else {
              window.confirm(
                "Debes diligenciar el campo 'Objetivos', por favor verifica este campo."
              );
              return false;
            }
          } else {
            window.confirm(
              "Debes introducir una Hora de finalización válida, por favor verifica este dato."
            );
            return false;
          }
        } else {
          window.confirm(
            "Debes introducir una Hora de inicio válida, por favor verifica este dato."
          );
          return false;
        }
      } else {
        window.confirm(
          "Debes introducir un lugar de encuentro válido, por favor verifica este dato."
        );
        return false;
      }
    } else {
      window.confirm(
        "Debes introducir una fecha válida, por favor verifica este dato."
      );
      return false;
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
        return verificador_individual();
      } else {
        window.confirm(
          "Recuerda que el límite máximo de caracteres, por cuadro de texto, es de 5000."
        );
        return false;
      }
    } else {
      window.confirm(
        "Debes diligenciar al menos una dimesión, por favor verifica estos campos."
      );
      return false;
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
          !!state.autonomia ||
          !!state.proyecto_de_vida ||
          !!state.historia_de_vida ||
          !!state.salud ||
          !!state.relación_eriótico_afectivas ||
          !!state.identificación ||
          !!state.aspectos_motivacionales ||
          !!state.diversidad_sexual ||
          !!state.red_de_apoyo
        ) {
          return verificador_familiar();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Individual', por favor verifica este dato."
          );
          return false;
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Individual', por favor verifica este dato."
        );
        return false;
      }
    } else {
      return verificador_familiar();
    }
  };

  const verificador_familiar = () => {
    if (!!state.familiar) {
      if (
        state.riesgo_familiar == 0 ||
        state.riesgo_familiar == 1 ||
        state.riesgo_familiar == 2
      ) {
        if (
          !!state.relaciones_familiares ||
          !!state.red_de_apoyo_familiar ||
          !!state.rol_del_estudiante_en_la_familia
        ) {
          return verificador_academico();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Familiar', por favor verifica este dato."
          );
          return false;
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Familiar', por favor verifica este dato."
        );
        return false;
      }
    } else {
      return verificador_academico();
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
          !!state.autogestion_academica
        ) {
          return verificador_economico();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Académico', por favor verifica este dato."
          );
          return false;
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Académico', por favor verifica este dato."
        );
        return false;
      }
    } else {
      return verificador_economico();
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
          return verificador_vida();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Económico', por favor verifica este dato."
          );
          return false;
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Económico', por favor verifica este dato."
        );
        return false;
      }
    } else {
      return verificador_vida();
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
          !!state.movilidad_y_transporte ||
          !!state.uso_de_los_servicios_universitarios ||
          !!state.integracion_a_la_cultura_universitaria ||
          !!state.vivienda ||
          !!state.vinculación_grupos_actividades_extracurriculares
        ) {
          return verificador_acciones();
        } else {
          window.confirm(
            "Debes marcar al menos una temática de la dimensión 'Vida Universitaria', por favor verifica este dato."
          );
          return false;
        }
      } else {
        window.confirm(
          "Debes diligenciar el riesgo de la dimensión 'Vida Universitaria', por favor verifica este dato."
        );
        return false;
      }
    } else {
      return verificador_acciones();
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
      //set_info();
      return true;
    } else {
      window.confirm(
        "Debes marcar al menos una acción realizada o en su defecto marcar 'Ninguna acción realizada', por favor verifica este dato."
      );
      return false;
    }
  };

  //esta funcion se encarga de enviar la info al backend despues de descargar el csv, es la que se le pasa por parametro al RegistroConCSV
  const enviarDespuesDeDescarga = () => {
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

  // esta funcion es la que usaba anteriormente para enviar la info al backend
  const set_info = () => {
    // console.log(state);
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
      autonomia: false,
      proyecto_de_vida: false,
      historia_de_vida: false,
      salud: false,
      relación_eriótico_afectivas: false,
      identificación: false,
      aspectos_motivacionales: false,
      diversidad_sexual: false,
      red_de_apoyo: false,
      rasgos_de_personalidad: false,
      familiar: "",
      riesgo_familiar: null,
      dinamica_familiar: false,
      relaciones_familiares: false, // v3
      red_de_apoyo_familiar: false, // v3
      rol_del_estudiante_en_la_familia: false, // v3
      academico: "",
      riesgo_academico: null,
      desempeño_académico: false,
      elección_vocacional: false,
      autogestion_academica: false, // v3
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
      movilidad_y_transporte: false, // v3
      integracion_a_la_cultura_universitaria: false, // v3
      vinculación_grupos_actividades_extracurriculares: false, // v3
      uso_de_los_servicios_universitarios: false, // v3
      vivienda: false,
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
    const { name, checked, type, value } = e.target;
  
    const match = name.match(/^riesgo_(.+)_(bajo|medio|alto)$/);
  
    if (match) {
      const tipo = match[1]; // individual, familiar, etc.
      const nivel = match[2]; // bajo, medio, alto
  
      const niveles = { bajo: 0, medio: 1, alto: 2 };
  
      // actualizar state (aquí guardas el número 0,1,2)
      set_state(prev => ({
        ...prev,
        [`riesgo_${tipo}`]: checked ? niveles[nivel] : null,
      }));
  
      // actualizar form (checkboxes)
      set_form(prev => ({
        ...prev,
        [`riesgo_${tipo}_bajo`]: checked && nivel === "bajo",
        [`riesgo_${tipo}_medio`]: checked && nivel === "medio",
        [`riesgo_${tipo}_alto`]: checked && nivel === "alto",
      }));
  
      return;
    }
  
    // lógica de bloqueo
    const bloqueado =
      limitarSeleccionIndividual(e, state) ||
      limitarSeleccionFamiliar(e, state) ||
      limitarSeleccionAcademico(e, state) ||
      limitarSeleccionEconomico(e, state) ||
      limitarSeleccionVida(e, state);
  
    if (bloqueado) return;
  
    // actualización normal
    set_state(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
              <Form.Control
                type="date"
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
                {/* <option value="Fuera de la Universidad">
                  Fuera de la Universidad
                </option> */}
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
              checked={!!state.autoconocimiento}
              onChange={handleForm}
              disabled={
                !state.autoconocimiento &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Se refiere a la capacidad de autogestión, resolución y toma de decisiones del/la estudiante. Reconociendo su momento vital, recursos de gestión de las emociones y de situaciones retadoras."
              type="checkbox"
              label="Autonomía"
              name="autonomia"
              checked={!!state.autonomia}
              onChange={handleForm}
              disabled={
                !state.autonomia &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.proyecto_de_vida}
              onChange={handleForm}
              disabled={
                !state.proyecto_de_vida &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.historia_de_vida}
              onChange={handleForm}
              disabled={
                !state.historia_de_vida &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.salud}
              onChange={handleForm}
              disabled={
                !state.salud &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.relación_eriótico_afectivas}
              onChange={handleForm}
              disabled={
                !state.relación_eriótico_afectivas &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.identificación}
              onChange={handleForm}
              disabled={
                !state.identificación &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.aspectos_motivacionales}
              onChange={handleForm}
              disabled={
                !state.aspectos_motivacionales &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.diversidad_sexual}
              onChange={handleForm}
              disabled={
                !state.diversidad_sexual &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.red_de_apoyo}
              onChange={handleForm}
              disabled={
                !state.red_de_apoyo &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              title="Narraciones del/la estudiante que den cuenta del tipo de conexiones y vínculos entre los miembros de su círculo familia.  Así como, del efecto de estos vínculos en su vida cotidiana."
              type="checkbox"
              label="Relaciones familiares"
              name="relaciones_familiares"
              checked={!!state.relaciones_familiares}
              onChange={handleForm}
              disabled={
                !state.relaciones_familiares &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "relaciones_familiares",
                      "red_de_apoyo_familiar",
                      "rol_del_estudiante_en_la_familia",
                    ].includes(Object.keys(state)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Narraciones del/la estudiante acerca de la respuesta de su familia y de su círculo de mayor confianza ante situaciones en las que él requiere apoyo y el efecto de estas respuestas en su vida cotidiana."
              type="checkbox"
              label="Red de apoyo familiar"
              name="red_de_apoyo_familiar"
              checked={!!state.red_de_apoyo_familiar}
              onChange={handleForm}
              disabled={
                !state.red_de_apoyo_familiar &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "relaciones_familiares",
                      "red_de_apoyo_familiar",
                      "rol_del_estudiante_en_la_familia",
                    ].includes(Object.keys(state)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Narraciones de el/la estudiante que den cuenta de las responsabilidades, actividades, expectativas frente a la vida familiar que se le encargan al estudiante  y, el efecto de estas en su vida cotidiana."
              type="checkbox"
              label="Rol del estudiante en la familia"
              name="rol_del_estudiante_en_la_familia"
              checked={!!state.rol_del_estudiante_en_la_familia}
              onChange={handleForm}
              disabled={
                !state.rol_del_estudiante_en_la_familia &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "relaciones_familiares",
                      "red_de_apoyo_familiar",
                      "rol_del_estudiante_en_la_familia",
                    ].includes(Object.keys(state)[i]) && v
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
              title="Las narraciones realizadas por los estudiantes en torno a las metodologias utilizadas en las clases, información de las diversas asignaturas y seguimientos académicos; ejemplo: reporte del rendimiento académico (notas), reporte de la carga académica, informe de las necesidades académicas identificadas con el estudiante (bases conceptules para las diversas asignaturas) y refuerzo académico (asesorías académicas). Además, se incluye la revisión de las habilidades académicas y recursos con los que el estudiante cuenta para superar la exigencia en sus asignaturas."
              type="checkbox"
              label="Desempeño académico"
              name="desempeño_académico"
              checked={!!state.desempeño_académico}
              onChange={handleForm}
              disabled={
                !state.desempeño_académico &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "desempeño_académico",
                      "elección_vocacional",
                      "autogestion_academica",
                      "manejo_del_tiempo",
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.elección_vocacional}
              onChange={handleForm}
              disabled={
                !state.elección_vocacional &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "desempeño_académico",
                      "elección_vocacional",
                      "autogestion_academica",
                      "manejo_del_tiempo",
                    ].includes(Object.keys(state)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Hace referencia a la capacidad del estudiante para organizar, regular y orientar de forma autónoma su proceso de aprendizaje. Implica planificar su tiempo, establecer metas, identificar y aplicar estrategias de estudio, mantener la motivación, manejar el estrés académico y la procrastinación con el fin de tomar decisiones conscientes que favorezcan su desempeño y bienestar académico."
              type="checkbox"
              label="Autogestión Académica"
              name="autogestion_academica"
              checked={!!state.autogestion_academica}
              onChange={handleForm}
              disabled={
                !state.autogestion_academica &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "desempeño_académico",
                      "elección_vocacional",
                      "autogestion_academica",
                      "manejo_del_tiempo",
                    ].includes(Object.keys(state)[i]) && v
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
              title="El reporte de la necesidad del estudiante de acceder a los apoyos institucionales o gubernamentales; así como todos las gestiones que los estudiantes realizan para recibir apoyos económicos. (ICETEX, Jóvenes en Acción / renta jóven  Bienestar Universitario,  monitorias, etc.)"
              label="Apoyos económicos institucionales"
              type="checkbox"
              name="apoyos_económicos_institucionales"
              checked={!!state.apoyos_económicos_institucionales}
              onChange={handleForm}
              disabled={
                !state.apoyos_económicos_institucionales &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.manejo_finanzas}
              onChange={handleForm}
              disabled={
                !state.manejo_finanzas &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.apoyo_económico_familiar}
              onChange={handleForm}
              disabled={
                !state.apoyo_económico_familiar &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.situación_laboral_ocupacional}
              onChange={handleForm}
              disabled={
                !state.situación_laboral_ocupacional &&
                Object.values(state).filter(
                  (v, i) =>
                    [
                      "apoyos_económicos_institucionales",
                      "manejo_finanzas",
                      "apoyo_económico_familiar",
                      "situación_laboral_ocupacional",
                    ].includes(Object.keys(state)[i]) && v
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
              label="Motivaciones para el acompañamiento"
              name="motivación_compañamiento"
              checked={!!state.motivación_compañamiento}
              onChange={handleForm}
              disabled={
                !state.motivación_compañamiento &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="El conocimiento por parte de los/las estudiantes, de las caracteristicas y lugares de los territorios cotidianos (tanto en la universidad como en la ciudad, minicipio o distrito que habitan)"
              type="checkbox"
              label="Referenciación geográfica"
              name="referencia_geográfica"
              checked={!!state.referencia_geográfica}
              onChange={handleForm}
              disabled={
                !state.referencia_geográfica &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.adaptación_ciudad_Universidad}
              onChange={handleForm}
              disabled={
                !state.adaptación_ciudad_Universidad &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.movilidad_y_transporte}
              onChange={handleForm}
              disabled={
                !state.movilidad_y_transporte &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.integracion_a_la_cultura_universitaria}
              onChange={handleForm}
              disabled={
                !state.integracion_a_la_cultura_universitaria &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
                ).length >= 2
              }
            />
          </Col>
          <Col>
            <Form.Check
              title="Lo relacionado con el interés, exploración y vinculación de los estudiantes a grupos estudiantiles, académicos, investigativos, culturales, y deportivos de la Universidad del Valle o externos."
              type="checkbox"
              label="Vinculación a grupos estudiantiles y externos"
              name="vinculación_grupos_actividades_extracurriculares"
              checked={!!state.vinculación_grupos_actividades_extracurriculares}
              onChange={handleForm}
              disabled={
                !state.vinculación_grupos_actividades_extracurriculares &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.uso_de_los_servicios_universitarios}
              onChange={handleForm}
              disabled={
                !state.uso_de_los_servicios_universitarios &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
              checked={!!state.vivienda}
              onChange={handleForm}
              disabled={
                !state.vivienda &&
                Object.values(state).filter(
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
                    ].includes(Object.keys(state)[i]) && v
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
        {/* esta es la version antigua del boton de registrar con csv, con esta no importaba si el form estava correcto o no
        el csv se descargaba de todas maneras */}

        {/* <CSVLink
          data={[state]}
          filename={"Seguimiento Individual" + state.fecha}
        >
          <Button
            variant="secondary"
            onClick={() => {
              verificador_datos_basicos();
            }}
          >
            Registrar
          </Button>
        </CSVLink> */}

        <RegistroConCSV
          state={state}
          verificador_datos_basicos={verificador_datos_basicos}
          onConfirmDownload={enviarDespuesDeDescarga}
        />

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

export default Seguimiento_individual_v3;
