/**
 * @file desplegable_Item copy.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de renderizar los seguimientos de un usuario socioeducativo en un desplegable
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Seguimiento_individual from "../seguimiento_forms/form_seguimiento_individual_sin_boton";
import Seguimiento_inasistencia from "../seguimiento_forms/form_inasistencia_sin_boton";
import Seguimiento_individual_edit_v2 from '../seguimiento_forms/form_seguimiento_individual_edit_v2';
import { desencriptar } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

/**
 * Renderiza los seguimientos de un usuario socioeducativo en un desplegable y lo renderiza segun su rol
 * @param {Arreglo} item: Contiene datos del usuario socioeducativo
 * @param {Arreglo} updateDataUserSocioedu: Contiene los datos del usuario socioeducativo actualizados
 * @returns Se renderiza un componente que muestra los seguimientos de un usuario socioeducativo
 */
const Desplegable_item = ({ item, updateDataUserSocioedu }) => {
  // Inicio de constantes usadas para controlar la apertura y cierre del desplegable
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleCloseIn = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Constante que guarda el rol del usuario
  const userRole = desencriptar(sessionStorage.getItem("rol"));
  const fechaReferencia = new Date('2024-07-10'); // Fecha desde que corre la versión 2 de la ficha

  // Convierte la fecha de item a un objeto Date si es necesario
  const itemFecha = new Date(item.fecha);

  /**
   * Envia los datos del Usuario socieducativo y lo actualiza
   * @param {Arreglo} e: Contiene datos del usuario socioeducativo
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
            {/*<li >{JSON.stringify(item)}</li>*/}

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

            {itemFecha < fechaReferencia ? (
                    <>
                        <Seguimiento_inasistencia 
                            updateDataUserSocioedu={enviar_datos}
                            show={show2} 
                            onHide={handleCloseIn} 
                            handleCloseIn={handleCloseIn} 
                            item={item} 
                            size="lg" 
                        />
                        <Seguimiento_individual 
                            updateDataUserSocioedu={enviar_datos} 
                            show={show} 
                            onHide={handleClose} 
                            handleClose={handleClose} 
                            item={item} 
                            size="lg" 
                        />
                    </>
                ) : (
                    <>
                        <Seguimiento_inasistencia  
                            updateDataUserSocioedu={enviar_datos}
                            show={show2} 
                            onHide={handleCloseIn} 
                            handleCloseIn={handleCloseIn} 
                            item={item} 
                            size="lg" 
                        />
                        <Seguimiento_individual_edit_v2 
                            updateDataUserSocioedu={enviar_datos} 
                            show={show} 
                            onHide={handleClose} 
                            handleClose={handleClose} 
                            item={item} 
                            size="lg" 
                        />
                    </>
                )}
          </Row>
        )}
      </>
    );
  }
};

export default Desplegable_item;
