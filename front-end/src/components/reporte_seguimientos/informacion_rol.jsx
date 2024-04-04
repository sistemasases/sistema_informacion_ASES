/**
 * @file informacion_rol.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de renderizar la información de las fichas y las inasistencias en desplegables
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Desplegable from "./desplegable";
import { useEffect } from "react";

/**
 * Renderiza la información de las fichas y las inasistencias
 * @param {Diccionario} props Contiene datos como cantidad total de fichas, total de inasistencais y su respectivo estado, revisado y no revisado
 * @returns
 */
const Informacion_rol = (props) => {
  // useEffect que se ejecuta cuando se actualiza el id de los practicantes del profesional
  useEffect(() => {}, [props.ids_practicantes_del_profesional]);

  return (
    <Container className="container_reportes_seguimientos2">
      <Row className="row_contenido_reportes_seguimientos">
        <div class="d-none d-md-inline">
          {" "}
          <br />
        </div>

        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>
          <Row>
            <Col xs={"12"} md={"3"}>
              <b>Profesional</b>
            </Col>
          </Row>
          <br />
          <Row lassName="margin_top_info_rol">
            <Col xs={"12"} md={"3"}>
              <b>Fichas: </b>
            </Col>
            <Col xs={"5"} md={"3"}>
              Revisado: {props.fichas_revisado_prof}
            </Col>
            <Col xs={"6"} md={"3"}>
              No revisado: {props.fichas_no_revisado_prof}
            </Col>
            <Col xs={"8"} md={"3"}>
              Total : {props.total_fichas_prof}
            </Col>
          </Row>
          <Row className="margin_top_info_rol">
            <Col xs={"12"} md={"3"}>
              <b>Inasistencías: </b>
            </Col>
            <Col xs={"5"} md={"3"}>
              Revisado: {props.inasistencias_revisado_prof}
            </Col>
            <Col xs={"6"} md={"3"}>
              No revisado: {props.inasistencias_no_revisado_prof}
            </Col>
            <Col xs={"8"} md={"3"}>
              Total : {props.total_inasistencias_prof}
            </Col>
          </Row>
        </Col>

        <Col className="subrow_card_content_flex" xs={"12"} sm={"6"}>
          <Row>
            <Col xs={"12"} md={"3"}>
              <b>Practicantes</b>
            </Col>
          </Row>
          <br />
          <Row className="margin_top_info_rol">
            <Col xs={"12"} md={"3"}>
              <b>Fichas:</b>
            </Col>
            <Col xs={"5"} md={"3"}>
              Revisado : {props.fichas_revisado_prac}
            </Col>
            <Col xs={"6"} md={"3"}>
              No revisado : {props.fichas_no_revisado_prac}
            </Col>
            <Col xs={"8"} md={"3"}>
              Total : {props.total_fichas_prac}
            </Col>
          </Row>
          <Row className="margin_top_info_rol">
            <Col xs={"12"} md={"3"}>
              <b>Inasistencías:</b>
            </Col>
            <Col xs={"5"} md={"3"}>
              Revisado : {props.inasistencias_revisado_prac}
            </Col>
            <Col xs={"6"} md={"3"}>
              No revisado : {props.inasistencias_no_revisado_prac}
            </Col>
            <Col xs={"8"} md={"3"}>
              Total : {props.total_inasistencias_prac}
            </Col>
          </Row>
        </Col>
        <div class="d-none d-md-inline">
          {" "}
          <br />
        </div>
      </Row>
      <Desplegable
        pintar={props.ids_practicantes_del_profesional}
      ></Desplegable>
    </Container>
  );
};

export default Informacion_rol;
