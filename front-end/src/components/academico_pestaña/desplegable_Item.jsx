/**
 * @file desplegable_item.jsx
 * @version 1.0.0
 * @description @description Componente para mostrar elementos desplegables del módulo académico.
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React from "react";
import { useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import {
  FaRegChartBar,
  FaThList,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";

/**
 * Componente para mostrar elementos desplegables.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Elemento a mostrar.
 * @returns {JSX.Element} Componente Desplegable_item.
 */
const Desplegable_item = ({ item }) => {
  // Estado para el control del despliegue
  const [open, setOpen] = useState(false);

  // Estado y funciones para el control del modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Se renderiza el componente
  if (item.nombre) {
    return (
      <Row className="periodo_activo_o_no">
        {item.Actual ? (
          <Col>El periodo se encuentra en curso</Col>
        ) : (
          <Col>El periodo esta finalizado</Col>
        )}
      </Row>
    );
  } else {
    return (
      <Row>
        <Col className="col_reportes">
          <Row className="col_reportes_hover">
            <Col onClick={handleShow}>Reportes{item.datos}</Col>
          </Row>
        </Col>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Importante</Modal.Title>
          </Modal.Header>
          <Modal.Body>Seleccione un estudiante.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    );
  }
};

export default Desplegable_item;
