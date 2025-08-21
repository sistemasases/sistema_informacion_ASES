/**
 * @file descarga_fichas_component.jsx
 * @version 1.0.0
 * @description Vista para descargar las fichas en un csv.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import Descargar_fichas from "../../service/descargar_fichas";
import All_cohorte_service from "../../service/all_cohorte";
import All_sede_service from "../../service/all_sede";
import Form from "react-bootstrap/Form";
import React, {useEffect, useState } from "react";
import Select from "react-select";

const Descarga_fichas_component = () => {
  // Estados para opciones de select
  const [opciones_sede, setOpcionesSede] = useState([]);
  const [opciones_cohorte, setOpcionesCohorte] = useState([]);
  
  // Se inicializan como arreglos vacíos (sin datos por defecto)
  const [seguimientosData, set_seguimientosData] = useState([]);
  const [inasistenciasData, set_inasistenciasData] = useState([]);

  // Banderas para controlar si hay contenido descargable
  const [tieneSeguimientos, setTieneSeguimientos] = useState(false);
  const [tieneInasistencias, setTieneInasistencias] = useState(false);

  // constante con mensaje para el modal
  const [respuesta, set_respuesta] = useState("Cargando, espera un momento.");
  // Constante para permitir activar el botón de descarga una vez finalice el axios
  const [descargaHabilitada, setDescargaHabilitada] = useState(true);
  // Show para manejar la vista del modal
  const [show, setShow] = useState(false);

  // constante para almacenar los filtros escogidos
  const [form, set_form] = useState({
    estudiante: "",
    fecha_inicio: "",
    fecha_fin: "",
    programa: "",
    sede: "",
    cohorte: "",
  });
  
  /**
   * Función para cambiar los valores de los filtros.
   * @param {Event} e Información del evento del filtro que está cambiando.
   */
  const handle_form = (e) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  /**
   * Función para cambiar los valores de las sedes en el filtro.
   * @param {Event} e Información del evento de la sede que está cambiando.
   */
  const handle_form_sede = (e) => {
    set_form({
      ...form,
      sede: e.value,
    });
  };
  /**
   * Función para cambiar los valores de las cohorte en el filtro.
   * @param {Event} e Información del evento de la cohorte que está cambiando.
   */
  const handle_form_cohorte = (e) => {
    set_form({
      ...form,
      cohorte: e.value,
    });
  };
  
  /**
   * Función para abrir el modal, cambiando el show a true.
   */
  const handle_open = () => setShow(true);
  
  /**
   * Función para cerrar el modal, cambiando el show a false.
   */
  const handle_close = () => {
    setShow(false);
    set_respuesta("Cargando, espera un momento.");
    setDescargaHabilitada(true);
    setTieneSeguimientos(false);
    setTieneInasistencias(false);
    set_seguimientosData([]);
    set_inasistenciasData([]);
  };
  
  /**
   * Función asincronica que hace la consulta en la API para traer las fichas.
   */
  const handle_upload = async () => {
    // Validar que al menos un filtro tenga valor en el form
    const alMenosUnFiltroActivo = Object.values(form).some(
      (valor) => valor !== "" && valor !== null && valor !== undefined
    );

    if (!alMenosUnFiltroActivo) {
      set_respuesta("Por favor, ingrese al menos un filtro antes de continuar.");
      setShow(true);
      return;
    }

    set_respuesta("Cargando, espera un momento.");
    setDescargaHabilitada(true);
    handle_open();

    try {
      const res = await Descargar_fichas.descargar_fichas(form);

      // Si hubo un error en la respuesta, lanzar error
      if (!res || !res.data) {
        throw new Error("No se obtuvieron datos de la API");
      }

      // Validar si los CSV tienen contenido real (no están vacíos)
      const tieneContenidoValido = (csv) =>
        typeof csv === "string" && csv.trim() !== "";

      // Procesar seguimientos
      if (tieneContenidoValido(res.data.seguimientos)) {
        const seguimientosBlob = new Blob(["\uFEFF" + res.data.seguimientos], {
          type: "text/csv;charset=utf-8",
        });
        const seguimientosUrl = URL.createObjectURL(seguimientosBlob);
        set_seguimientosData([seguimientosUrl]);
        setTieneSeguimientos(true);
      } else {
        set_seguimientosData([]);
        setTieneSeguimientos(false);
      }
      // Procesar inasistencias
      if (tieneContenidoValido(res.data.inasistencias)) {
        const inasistenciasBlob = new Blob(["\uFEFF" + res.data.inasistencias], {
          type: "text/csv;charset=utf-8",
        });
        const inasistenciasUrl = URL.createObjectURL(inasistenciasBlob);
        set_inasistenciasData([inasistenciasUrl]);
        setTieneInasistencias(true);
      } else {
        set_inasistenciasData([]);
        setTieneInasistencias(false);
      }      

      set_respuesta("Búsqueda finalizada.");
      setDescargaHabilitada(false);
    } catch (err) {
      // Registrar errores y mostrar un mensaje de error
      //console.log("response.seguimientos:", response?.seguimientos);
      //console.log("response.inasistencias:", response?.inasistencias);
      console.error("Error en handle_upload:", err);
      set_respuesta("Error al momento de buscar las fichas.");
      setDescargaHabilitada(true);
      setTieneSeguimientos(false);
      setTieneInasistencias(false);
    }
  };

  /**
   * Función asincronica para cargar los select de sedes y cohortes con la información en el sistema.
   */
  const cargar_selects = async () => {
    const sedes = await All_sede_service.all_sede();
    const cohortes = await All_cohorte_service.all_cohorte();

    setOpcionesSede(
      sedes.map((sede) => ({
        value: sede.nombre,
        label: sede.nombre,
        id: sede.id,
      }))
    );

    setOpcionesCohorte(
      cohortes.map((cohorte) => ({
        value: cohorte.id_number,
        label: cohorte.id_number,
        id: cohorte.id,
      }))
    );
  };

  useEffect(() => {
    cargar_selects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  // Efecto para disparar la descarga cuando los datos estén listos
  useEffect(() => {
    if (descargaHabilitada === false) {
      // Ya se prepararon los archivos, mostramos el modal
      setShow(true);
    }
  }, [descargaHabilitada]);  

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
                onChange={handle_form}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Hasta</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                value={form.fecha_fin}
                onChange={handle_form}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Programa</Form.Label>
              <Form.Control
                type="text"
                name="programa"
                value={form.programa}
                onChange={handle_form}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Sede</Form.Label>
              <Select
                className="option"
                options={opciones_sede}
                onChange={handle_form_sede}
                placeholder="Seleccione una sede"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Cohorte</Form.Label>
              <Select
                className="option"
                options={opciones_cohorte}
                onChange={handle_form_cohorte}
                placeholder="Seleccione una cohorte"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <br />
      <Col>
        <Button
          variant="primary"
          onClick={handle_upload}
          disabled={!Object.values(form).some((valor) => valor !== "" && valor !== null && valor !== undefined)}
        >
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
          {/* Mostrar botón solo si hay datos de inasistencias */}
          {descargaHabilitada === false && tieneInasistencias && (
            <a
              href={inasistenciasData[0]}
              download="inasistencias.csv"
              className="btn btn-primary m-2"
            >
              Descargar Inasistencias
            </a>
          )}
          {/* Mostrar botón solo si hay datos de seguimientos */}
          {descargaHabilitada === false && tieneSeguimientos && (
            <a
              href={seguimientosData[0]}
              download="seguimientos.csv"
              className="btn btn-primary m-2"
            >
              Descargar Seguimientos
            </a>
          )}
          {/* Mensaje si no hay nada para descargar */}
          {descargaHabilitada === false &&
            !tieneInasistencias &&
            !tieneSeguimientos && (
              <div className="text-muted w-100 text-center">
                No se encontraron datos para descargar.
              </div>
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
