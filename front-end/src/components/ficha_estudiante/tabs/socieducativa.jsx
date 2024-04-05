/**
 * @file socioeducativo.jsx
 * @version 1.0.0
 * @description Muestra la información el desplegable.
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Dropdown, Button } from "react-bootstrap";
import { FaRegChartBar, FaThList, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, componentDidUpdate } from "react";
import axios from "axios";
import Desplegable_item from "./desplegable_Item";
import Desplegable from "./desplegable";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
  desencriptarInt,
} from "../../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const Socieducativa = (props) => {
  // Almacena el estado del switch.
  const [switchChecked, setChecked] = useState(false);
  /**
   * @description Función que actualiza el estado del switch.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleChange = () => setChecked(!switchChecked);

  const [show, setShow] = useState(false);
  /**
   * @description Función que cierra el modal.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleClose = () => setShow(false);
  /**
   * @description Función que muestra el modal.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleShow = () => setShow(true);
  // Almacena el estado de la data.
  const [state, set_state] = useState({
    data_user: props.data_user_socioedu,
  });

  // Almacena la pestaña activa.
  const [activeTabIndex, setActiveTabIndex] = useState(
    state.data_user && state.data_user.length > 0
      ? state.data_user[0]["nombre"]
      : ""
  );
  /**
   * @description Función que se encarga de actualizar la pestaña.
   * @param {number} index - recibe un indice.
   * @return {void} - No retorna ningún valor.
   */
  const activeTab = (index) => {
    index === activeTabIndex ? setActiveTabIndex(0) : setActiveTabIndex(index);
  };
  // Almacena el rol del usuario logueado.
  const userRole = desencriptar(sessionStorage.getItem("rol"));

  return (
    <>
      {userRole === "vcd_academico" ||
      userRole === "DIR_PROGRAMA" ||
      userRole === "DIRECTOR_ACADEMICO" ? (
        <></>
      ) : (
        <Container className="socioeducativa_container">
          <Row className="socioeducativa_seguimientos_pares">
            Seguimientos de pares
          </Row>
          {props.tiene_datos_cargados ? (
            <Row className="socioeducativa_fondo">
              {state.data_user.map((item, index) => (
                <Row>
                  <Col
                    className={
                      item[0]["nombre"] === activeTabIndex
                        ? "periodo_asignaciones open"
                        : "periodo_asignaciones"
                    }
                  >
                    <Row
                      className="periodo_asignaciones_seleccionar"
                      onClick={() => activeTab(item[0]["nombre"])}
                    >
                      <Col className="periodo_asignaciones_seleccionar_text">
                        <Row className="periodo_asignaciones_seleccionar_hover">
                          <Col className="col_periodo_asignaciones_seleccionar_text">
                            {item[0]["nombre"]}
                            {item[0]["nombre"] === activeTabIndex ? (
                              <i class="bi bi-chevron-up"></i>
                            ) : (
                              <i class="bi bi-chevron-down"></i>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row className="periodo_asignaciones_contenido">
                      {item.map((item, index) => (
                        <Desplegable_item key={index} item={item} />
                      ))}
                    </Row>
                  </Col>
                </Row>
              ))}
            </Row>
          ) : (
            <Row></Row>
          )}

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
        </Container>
      )}
    </>
  );
};

export default Socieducativa;
