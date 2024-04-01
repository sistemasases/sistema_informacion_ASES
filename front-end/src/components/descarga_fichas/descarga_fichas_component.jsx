import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import All_cohorte_service from "../../service/all_cohorte";
import All_sede_service from "../../service/all_sede";
import Descargar_fichas from "../../service/descargar_fichas";
import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const Descarga_fichas_component = () => {
  var bandera_option_sede = true;
  var opciones_sede = [];
  var bandera_option_cohorte = true;
  var opciones_cohorte = [];

  var response = undefined;
  const [seguimientosData, set_seguimientosData] = useState([
    {
      id: 0,
      fecha: "",
      lugar: "",
      hora_inicio: "",
      hora_finalización: "",
      objetivos: "",
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
      creacion: "",
      modificacion: "",
      id_creador: null,
      id_modificador: null,
      id_estudiante: null,
    },
  ]);

  const [inasistenciasData, set_inasistenciasData] = useState([
    {
      id: 0,
      fecha: "",
      observaciones: "",
      revisado_profesional: false,
      revisado_practicante: false,
      creacion: "",
      modificacion: "",
      id_creador: null,
      id_modificador: null,
      id_estudiante: null,
    },
  ]);

  const [respuesta, set_respuesta] = useState("Cargando, espera un momento.");

  const [form, set_form] = useState({
    estudiante: "",
    fecha_inicio: "",
    fecha_fin: "",
    programa: "",
    sede: "",
    cohorte: "",
  });

  const [sedes, set_sedes] = useState([]);
  const [cohortes, set_cohortes] = useState([]);

  const [descargaHabilitada, setDescargaHabilitada] = useState(true);

  const handle_form = (e) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handle_form_sede = (e) => {
    set_form({
      ...form,
      sede: e.value,
    });
  };

  const handle_form_cohorte = (e) => {
    set_form({
      ...form,
      cohorte: e.value,
    });
  };

  const [show, setShow] = useState(false);
  const handle_open = () => setShow(true);
  const handle_close = () => {
    setShow(false);
    set_respuesta("Cargando, espera un momento.");
    setDescargaHabilitada(true);
  };

  const handle_upload = async () => {
    set_respuesta("Cargando, espera un momento.");
    setDescargaHabilitada(true);
    handle_open();
    await Descargar_fichas.descargar_fichas(form)
      .then((res) => {
        response = res.data;
        set_seguimientosData(response["seguimientos"]);
        set_inasistenciasData(response["inasistencias"]);
        set_respuesta("Busqueda finalizada.");
        setDescargaHabilitada(false);
      })
      .catch((err) => {
        set_respuesta("Error al momento de buscar las fichas.");
        setDescargaHabilitada(true);
      });
  };

  useEffect(async () => {
    await All_sede_service.all_sede().then((res) => {
      set_sedes(res);
      bandera_option_sede = true;
    });
    await All_cohorte_service.all_cohorte().then((res) => {
      set_cohortes(res);
      bandera_option_cohorte = true;
    });
  }, []);

  const handle_sedes = async () => {
    if (bandera_option_sede === true) {
      for (var i = 0; i < sedes["length"]; i++) {
        const dato = {
          value: sedes[i]["nombre"],
          label: sedes[i]["nombre"],
          id: sedes[i]["id"],
        };
        opciones_sede.push(dato);
      }
      bandera_option_sede = false;
    }
  };

  const handle_cohorte = async () => {
    if (bandera_option_cohorte === true) {
      for (var i = 0; i < cohortes["length"]; i++) {
        const dato = {
          value: cohortes[i]["id_number"],
          label: cohortes[i]["id_number"],
          id: cohortes[i]["id"],
        };
        opciones_cohorte.push(dato);
      }
      bandera_option_cohorte = false;
    }
  };

  return (
    <Container className="mi-clase-background">
      <Row className="mt-2">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Estudiante</Form.Label>
              <Form.Control
                type="text"
                name="estudiante"
                value={form.estudiante}
                onChange={(e) => handle_form(e)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Desde</Form.Label>
              <Form.Control
                type="date"
                name="fecha_inicio"
                value={form.fecha_inicio}
                onChange={(e) => handle_form(e)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Hasta</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                value={form.fecha_fin}
                onChange={(e) => handle_form(e)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Programa</Form.Label>
              <Form.Control
                type="text"
                name="programa"
                value={form.programa}
                onChange={(e) => handle_form(e)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Sede</Form.Label>
              <Select
                class="option"
                className="option"
                options={opciones_sede}
                onMenuOpen={handle_sedes}
                onChange={(e) => handle_form_sede(e)}
                placeholder="Selecione una sede"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Cohorte</Form.Label>
              <Select
                class="option"
                className="option"
                options={opciones_cohorte}
                onMenuOpen={handle_cohorte}
                onChange={(e) => handle_form_cohorte(e)}
                placeholder="Selecione una cohorte"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <br />
      <Col>
        <Button variant="primary" onClick={handle_upload}>
          Filtrar
        </Button>
      </Col>
      <br />
      <Modal show={show} onHide={handle_close}>
        <Modal.Header closeButton>
          <Modal.Title>ESTADO DESCARGA</Modal.Title>
        </Modal.Header>
        <Modal.Body>{respuesta}</Modal.Body>
        <Modal.Footer>
          {!descargaHabilitada ? (
            <>
              <CSVLink
                data={inasistenciasData}
                headers={Object.keys(inasistenciasData[0])}
                filename="inasistencias.csv"
                className="hidden"
                separator="*"
              >
                Descargar Inasistencias
              </CSVLink>
              <CSVLink
                data={seguimientosData}
                headers={Object.keys(seguimientosData[0])}
                filename="seguimientos.csv"
                className="hidden"
                separator="*"
              >
                Descargar Seguimientos
              </CSVLink>
            </>
          ) : (
            <></>
          )}
          <Button variant="secondary" onClick={handle_close}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Descarga_fichas_component;
