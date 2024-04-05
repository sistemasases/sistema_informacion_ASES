/**
 * @file desplegable_item.jsx
 * @version 1.0.0
 * @description Muestra la información del item el desplegable.
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
import Seguimiento_individual from "../../seguimiento_forms/form_seguimiento_individual_sin_boton";
import Seguimiento_inasistencia from "../../seguimiento_forms/form_inasistencia_sin_boton";
import { desencriptar } from "../../../modulos/utilidades_seguridad/utilidades_seguridad";

const Desplegable_item = ({ item, updateDataUserSocioedu }) => {
  // Almacena el estado del modal.
  const [show, setShow] = useState(false);
  /**
   * @description Función que cierra el modal.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleClose = () => setShow(false);
  /**
   * @description Función que abre el modal.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleShow = () => setShow(true);
  // Almacena el estado del modal.
  const [show2, setShow2] = useState(false);
  /**
   * @description Función que cierra el modal.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleCloseIn = () => setShow2(false);
  /**
   * @description Función que abre el modal.
   * @param {} - No recibe parámetros.
   * @return {void} - No retorna ningún valor.
   */
  const handleShow2 = () => setShow2(true);
  // Almacena el rol del usuario logueado.
  const userRole = desencriptar(sessionStorage.getItem("rol"));

  /**
   * @description Función que actualiza socioeducativo.
   * @param {e} - objeto.
   * @return {void} - No retorna ningún valor.
   */
  const enviar_datos = (e) => {
    // Actualiza state.data_user_socioedu con los nuevos datos
    updateDataUserSocioedu(e);
  };

  if (item.nombre) {
    return (
      <>
        {userRole === "vcd_academico" ||
        userRole === "DIR_PROGRAMA" ||
        userRole === "DIRECTOR_ACADEMICO" ? (
          <></>
        ) : (
          <Row className="periodo_activo_o_no">
            {item.Actual ? (
              <Col>El periodo se encuentra en curso</Col>
            ) : (
              <Col>El periodo esta finalizado</Col>
            )}
          </Row>
        )}
      </>
    );
  } else {
    return (
      <>
        {userRole === "vcd_academico" ||
        userRole === "DIR_PROGRAMA" ||
        userRole === "DIRECTOR_ACADEMICO" ? (
          <></>
        ) : (
          <Row>
            <Col className="col_reportes">
              {item.revisado_profesional === true ? (
                <Row className="col_reportes_hover_block">
                  {item.hora_inicio ? (
                    <Col onClick={handleShow}>
                      Seguimiento individual : {item.fecha}
                      {item.revisado_practicante === true ? <b>✔</b> : <b></b>}
                    </Col>
                  ) : (
                    <Col onClick={handleShow2}>
                      Inasistencia : {item.fecha}
                      {item.revisado_practicante === true ? <b>✔</b> : <b></b>}
                    </Col>
                  )}
                </Row>
              ) : (
                <Row className="col_reportes_hover">
                  {item.hora_inicio ? (
                    <Col onClick={handleShow}>
                      Seguimiento individual : {item.fecha}
                      {item.revisado_practicante === true ? <b>✔</b> : <b></b>}
                    </Col>
                  ) : (
                    <Col onClick={handleShow2}>
                      Inasistencia : {item.fecha}
                      {item.revisado_practicante === true ? <b>✔</b> : <b></b>}
                    </Col>
                  )}
                </Row>
              )}
            </Col>

            <Seguimiento_inasistencia
              recarga_ficha_estudiante={true}
              show={show2}
              onHide={handleCloseIn}
              handleCloseIn={handleCloseIn}
              item={item}
              size="lg"
            />

            <Seguimiento_individual
              recarga_ficha_estudiante={true}
              show={show}
              onHide={handleClose}
              handleClose={handleClose}
              item={item}
              size="lg"
            />
          </Row>
        )}
      </>
    );
  }
};

export default Desplegable_item;
