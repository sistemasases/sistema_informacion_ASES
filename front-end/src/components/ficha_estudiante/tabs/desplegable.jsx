import React from "react";
import { useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import {
  FaRegChartBar,
  FaThList,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";
import Desplegable_item from "./desplegable_Item";
import { desencriptar } from "../../../modulos/utilidades_seguridad/utilidades_seguridad";

const Desplegable = ({ item }) => {
  const userRole = desencriptar(sessionStorage.getItem("rol"));

  const [open, setOpen] = useState(false);
  return (
    <>
      {userRole === "vcd_academico" ||
      userRole === "DIR_PROGRAMA" ||
      userRole === "DIRECTOR_ACADEMICO" ? (
        <></>
      ) : (
        <Row>
          <Col className={open ? "fichas-item open" : "fichas-item"}>
            <Row
              className="link_reporte_seguimientos1"
              onClick={() => setOpen(!open)}
            >
              <Col className="link_text_reporte_seguimientos1">
                <Row className="link_text_reporte_seguimientos_hover1">
                  <Col xs={"10"} md={"4"}>
                    <Row className="col_link_text_reporte_seguimientos_nombre">
                      Nombres
                      <br></br>
                      {item[0]["nombre"]}
                    </Row>
                  </Col>

                  <Col
                    className="col_link_text_reporte_seguimientos_info"
                    xs={"12"}
                    md={"6"}
                  ></Col>
                  <div class="d-none d-md-inline col-1">
                    <Col className="col_flecha_reportes">
                      {open ? (
                        <Row>
                          <i class="bi bi-chevron-up"></i>
                        </Row>
                      ) : (
                        <Row>
                          <i class="bi bi-chevron-down"></i>
                        </Row>
                      )}
                    </Col>
                  </div>
                </Row>
                <Row className="fichas-content">
                  <div class="d-none d-md-inline col-12">
                    <Col className="contenido_fichas">
                      {item.map((child, index) => (
                        <Desplegable_item key={index} item={child} />
                      ))}
                    </Col>
                  </div>
                  <div class="d-inline d-md-none col-12">
                    <Col className="contenido_fichas_pequeño">
                      {item.map((child, index) => (
                        <Desplegable_item key={index} item={child} />
                      ))}
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Desplegable;
