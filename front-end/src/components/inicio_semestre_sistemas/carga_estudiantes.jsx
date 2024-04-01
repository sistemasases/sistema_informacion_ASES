/**
 * @file carga_estudiantes.jsx
 * @version 1.0.0
 * @description Componente utilizado en el inicio del semestre para subir archivos CSV con información de estudiantes a través de una API.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad";

const Carga_masiva_component = () => {
  // Constante para la autorizacion del back
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  // Constante que guarda la dirección url utilizada por el axios
  const url_carga = `${process.env.REACT_APP_API_URL}/carga_masiva/carga/`;
  // Estado que permite guardar la respuesta del axios
  const [state, set_state] = useState({
    option: "Estudiante",
    mensaje: [],
    respuesta: "Cargando...",
  });
  // Variable que permite guardar el archivo
  const [archivo, set_archivo] = useState(null);
  // Variable que activa la vista modal
  const [show, setShow] = useState(false);
  // Columnas de la tabla
  const columnas = [
    {
      name: "DATO",
      selector: (row) => row.dato,
      sortable: true,
    },
    {
      name: "MENSAJE",
      selector: (row) => row.mensaje,
      sortable: true,
      grow: 2,
    },
  ];

  /**
   * Manejador de eventos del input file para obtener el archivo seleccionado.
   * @param {Event} e Evento del input.
   */
  const handle_file = (e) => {
    set_archivo(e.target.files[0]);
  };

  /**
   * Función para subir el archivo CSV a través de una API.
   * @param {Event} e Evento del botón subir.
   */
  const handle_upload = (e) => {
    let option = [state.option];
    let formData = new FormData();

    // Agregando el archivo a FormData
    formData.append("tipo_de_carga", option);
    formData.append("FILES", archivo);

    axios({
      url: url_carga,
      method: "POST",
      data: formData,
      headers: config,
    })
      .then((res) => {
        set_state({
          ...state,
          mensaje: res.data,
          respuesta: "Carga finalizada.",
        });
      })
      .catch((err) => {
        set_state({
          ...state,
          respuesta: "ocurrio un error",
        });
      });
    setShow(true);
  };

  /**
   * Función para cerrar el modal y reiniciar el estado.
   */
  const set_info = (e) => {
    setShow(false);
    set_state({
      ...state,
      respuesta: "Cargando...",
    });
  };

  /**
   *Función para cerrar el modal.
   */
  const handleClose = () => setShow(false);

  return (
    <Container>
      <Row>
        <h4>Suba el archivo csv para los estudiantes.</h4>
      </Row>
      <Row className="mt-2">
        <Col sm={9}>
          <Form.Control type="file" name="file" onChange={handle_file} />
        </Col>
        <a href="https://docs.google.com/spreadsheets/d/1NcB2BQFo5yigrm4ffls7pNoGoCi766Pe7bXbfNOwDQY/edit#gid=0">
          Plantillas de Carga
        </a>
      </Row>
      <Row className="mt-2">
        <Col lg={{ span: 0, offset: 0 }}>
          <Button onClick={handle_upload}>Subir</Button>
        </Col>
      </Row>
      <Row className="mt-2">
        <DataTable
          columns={columnas}
          data={state.mensaje}
          noDataComponent=""
          pagination
        />
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ESTADO CARGA</Modal.Title>
        </Modal.Header>
        <Modal.Body>{state.respuesta}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={set_info}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Carga_masiva_component;
