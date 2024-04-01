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
import { CSVLink } from "react-csv";
import {
  desencriptarInt,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const Seguimiento_individual = (props) => {
  const recargarPagina = () => {
    if (props.recarga_ficha_estudiante) {
      // Cambiar la URL a la página con el ID del estudiante seleccionado
      window.location.href = `/ficha_estudiante/${state.id_estudiante}`;
    } else {
      props.updateDataUserSocioedu(form.id_estudiante);
    }
  };

  const [form, set_form] = useState({
    id: props.item.id,
    fecha: props.item.fecha,
    lugar: props.item.lugar,
    hora_inicio: props.item.hora_inicio,
    hora_finalización: props.item.hora_finalización,
    objetivos: props.item.objetivos,
    individual: props.item.individual,
    riesgo_individual: props.item.riesgo_individual,
    autoconocimiento: props.item.autoconocimiento,
    rasgos_de_personalidad: props.item.rasgos_de_personalidad,
    identificación: props.item.identificación,
    red_de_apoyo: props.item.red_de_apoyo,
    proyecto_de_vida: props.item.proyecto_de_vida,
    salud: props.item.salud,
    aspectos_motivacionales: props.item.aspectos_motivacionales,
    historia_de_vida: props.item.historia_de_vida,
    relación_eriótico_afectivas: props.item.relación_eriótico_afectivas,
    diversidad_sexual: props.item.diversidad_sexual,
    familiar: props.item.familiar,
    riesgo_familiar: props.item.riesgo_familiar,
    dinamica_familiar: props.item.dinamica_familiar,
    academico: props.item.academico,
    riesgo_academico: props.item.riesgo_academico,
    desempeño_académico: props.item.desempeño_académico,
    elección_vocacional: props.item.elección_vocacional,
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
    vinculación_grupos_actividades_extracurriculares:
      props.item.vinculación_grupos_actividades_extracurriculares,
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
    observaciones: props.item.observaciones,
    revisado_profesional: props.item.revisado_profesional,
    revisado_practicante: props.item.revisado_practicante,
    primer_acercamiento: props.item.primer_acercamiento,
    cierre: props.item.cierre,
    id_creador: props.item.id_creador,
    id_modificador: desencriptarInt(
      parseInt(sessionStorage.getItem("id_usuario"))
    ),
    id_estudiante: props.item.id_estudiante,
  });

  const hora_creacion = new Date(props.item.creacion);
  const hora_edicion = new Date(props.item.modificacion);

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
    if (!!form.individual) {
      if (
        form.riesgo_individual == 0 ||
        form.riesgo_individual == 1 ||
        form.riesgo_individual == 2
      ) {
        if (
          !!form.autoconocimiento ||
          !!form.rasgos_de_personalidad ||
          !!form.identificación ||
          !!form.red_de_apoyo ||
          !!form.proyecto_de_vida ||
          !!form.salud ||
          !!form.aspectos_motivacionales ||
          !!form.historia_de_vida ||
          !!form.relación_eriótico_afectivas ||
          !!form.diversidad_sexual
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
        if (!!form.dinamica_familiar) {
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
          !!form.manejo_del_tiempo
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
          !!form.motivación_compañamiento ||
          !!form.referencia_geográfica ||
          !!form.adaptación_ciudad_Universidad ||
          !!form.oferta_servicios ||
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
        props.handleClose();
        recargarPagina();
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
  const handleForm = (e) => {
    console.log(e.target.checked);
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
      set_form({
        ...form,
        [e.target.name]: e.target.value,
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
              />
            </Row>
          </Col>
          <Col>
            <Row className="g-2">
              <h6>Lugar*:</h6>
            </Row>
            <Row className="g-2">
              <Form.Control
                type="text"
                defaultValue={props.item.lugar}
                name="lugar"
                onChange={handleForm}
              />
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
          <h6>Objetivos*:</h6>
        </Row>
        <Row className="g-2">
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.item.objetivos}
            name="objetivos"
            onChange={handleForm}
            title="Máximo 5000 caracteres."
          />
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
              type="checkbox"
              label="Autoconocimiento"
              defaultChecked={props.item.autoconocimiento}
              name="autoconocimiento"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Proyecto de vida"
              defaultChecked={props.item.proyecto_de_vida}
              name="proyecto_de_vida"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Historia de vida"
              defaultChecked={props.item.historia_de_vida}
              name="historia_de_vida"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Rasgos de personalidad"
              defaultChecked={props.item.rasgos_de_personalidad}
              name="rasgos_de_personalidad"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Salud"
              defaultChecked={props.item.salud}
              name="salud"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Relaciones erótico-afectivas"
              defaultChecked={props.item.relación_eriótico_afectivas}
              name="relación_eriótico_afectivas"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Identificación"
              defaultChecked={props.item.identificación}
              name="identificación"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Aspectos motivacionales"
              defaultChecked={props.item.aspectos_motivacionales}
              name="aspectos_motivacionales"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Diversidad sexual"
              defaultChecked={props.item.diversidad_sexual}
              name="diversidad_sexual"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Red de apoyo"
              defaultChecked={props.item.red_de_apoyo}
              name="red_de_apoyo"
              onChange={handleFormChecks}
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
              type="checkbox"
              label="Dinámica Familiar"
              defaultChecked={props.item.dinamica_familiar}
              name="dinamica_familiar"
              onChange={handleFormChecks}
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
              type="checkbox"
              label="Desempeño académico"
              defaultChecked={props.item.desempeño_académico}
              name="desempeño_académico"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Elección vocacional"
              defaultChecked={props.item.elección_vocacional}
              name="elección_vocacional"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Manejo del tiempo"
              defaultChecked={props.item.manejo_del_tiempo}
              name="manejo_del_tiempo"
              onChange={handleFormChecks}
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
              type="checkbox"
              label="Apoyos económicos institucionales"
              defaultChecked={props.item.apoyos_económicos_institucionales}
              name="apoyos_económicos_institucionales"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Manejo de sus finanzas"
              defaultChecked={props.item.manejo_finanzas}
              name="manejo_finanzas"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Apoyo económico familiar"
              defaultChecked={props.item.apoyo_económico_familiar}
              name="apoyo_económico_familiar"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Situación laboral y ocupacional"
              defaultChecked={props.item.situación_laboral_ocupacional}
              name="situación_laboral_ocupacional"
              onChange={handleFormChecks}
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
              type="checkbox"
              label="Motivación para el acompañamiento"
              defaultChecked={props.item.motivación_compañamiento}
              name="motivación_compañamiento"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Referencia geográfica"
              defaultChecked={props.item.referencia_geográfica}
              name="referencia_geográfica"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Adaptación a la ciudad y Universidad"
              defaultChecked={props.item.adaptación_ciudad_Universidad}
              name="adaptación_ciudad_Universidad"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Oferta de servicios"
              defaultChecked={props.item.oferta_servicios}
              name="oferta_servicios"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Vivienda"
              defaultChecked={props.item.vivienda}
              name="vivienda"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Vinculación a grupos y realización de actividades extracurriculares"
              defaultChecked={
                props.item.vinculación_grupos_actividades_extracurriculares
              }
              name="vinculación_grupos_actividades_extracurriculares"
              onChange={handleFormChecks}
            />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <h6>
            <b>
              Acciones (Ubique el cursor sobre la acción para obtener más
              información)
            </b>
          </h6>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Apoyo académico"
              defaultChecked={props.item.apoyo_académico}
              name="apoyo_académico"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Rem. Actividades grupales"
              defaultChecked={props.item.rem_actividades_grupales}
              name="rem_actividades_grupales"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
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
              type="checkbox"
              label="Taller par-par"
              defaultChecked={props.item.taller_par_par}
              name="taller_par_par"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Rem. Monitorías académicas"
              defaultChecked={props.item.rem_monitorías_académicas}
              name="rem_monitorías_académicas"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
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
              type="checkbox"
              label="Reconocimiento ciudad y U."
              defaultChecked={props.item.reconocimiento_ciudad_U}
              name="reconocimiento_ciudad_U"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Rem. Proyectos de la Universidad"
              defaultChecked={props.item.rem_proyectos_Universidad}
              name="rem_proyectos_Universidad"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
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
              type="checkbox"
              label="Rem. Profesional SE"
              defaultChecked={props.item.rem_profesional_SE}
              name="rem_profesional_SE"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Rem. Servicio de salud"
              defaultChecked={props.item.rem_servicio_salud}
              name="rem_servicio_salud"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
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
              type="checkbox"
              label="Rem. Practicante SE"
              defaultChecked={props.item.rem_racticante_SE}
              name="rem_racticante_SE"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Rem. Registro académico"
              defaultChecked={props.item.rem_registro_académico}
              name="rem_registro_académico"
              onChange={handleFormChecks}
            />
          </Col>
          <Col>
            <Form.Check
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
              label="Revisado profesional"
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
              label="Revisado practicante"
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
            <b>Creación: </b> fecha: {hora_creacion.toLocaleDateString()} hora:{" "}
            {hora_creacion.toLocaleTimeString()}{" "}
          </h6>
        </Row>
        <Row className="g-2">
          <h6>
            <b>Última modificación: </b>fecha:{" "}
            {hora_edicion.toLocaleDateString()} hora:{" "}
            {hora_edicion.toLocaleTimeString()}{" "}
          </h6>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <CSVLink
          data={[props.item]}
          filename={"Seguimiento Individual " + props.item.fecha}
        >
          <Button variant="link">Descargar CSV</Button>
        </CSVLink>
        {/*
            <Button variant="danger" onClick={delete_info} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={set_info} disable={props.item.revisado_profesional || props.item.revisado_practicante}>
              Editar
            </Button>
            <Button variant="secondary" onClick={()=>props.handleClose()}>
              Cerrar
            </Button>
             */}

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

export default Seguimiento_individual;
