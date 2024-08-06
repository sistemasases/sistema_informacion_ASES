/**
 * @file formulario_autorizacion.jsx
 * @version 1.0.0
 * @description Formulario de autorizacion de tratamiento de datos.
 * @author Steven Bernal
 * @contact steven.bernal@correounivalle.edu.co
 * @date 4 de Julio del 2024
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import "../../Scss/formularios_externos/formulario_asistencia_style.css";

const FormularioAsistencia = (props) => {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");

  useEffect(() => {
    // Establecer la fecha actual cuando el componente se monta
    const currentDate = new Date().toISOString().split("T")[0];
    setData({
      ...data,
      fecha: currentDate,
    });
  }, []);

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);

    if (e.target.value === "C.C.") {
      setData({
        ...data,
        tipo_documento: e.target.value,
      });
    } else if (e.target.value === "T.I.") {
      setData({
        ...data,
        tipo_documento: e.target.value,
      });
    } else if (e.target.value === "Otros") {
      setData({
        ...data,
        tipo_documento: "",
      });
    }
    // setData({
    //   ...data,
    //   nombre: e.target.value,
    // });
  };

  const handle_otherDocumentType = (e) => {
    setOtherDocumentType(e.target.value);
    setData({
      ...data,
      tipo_documento: e.target.value,
    });
  };

  const [data, setData] = useState({
    codigo: "",
    monitoria_asistencia: "",
    fecha: "",
  });

  const send_data = (e) => {
    // console.log(e);
    console.log(data);
    // Crear tabla de asistencias
    // Datos del formulario
    // * añadir sede
    // Crear tabla monitorias

    if (data.codigo === "" || data.monitoria_asistencia === "") {
      alert("Por favor llene todos los campos obligatorios");
      return;
    }
  };

  /**
   * En el de asistencia:
   *  Código
   *  Monitoria a la que asiste
   *  Fecha (autogenerada)
   */

  return (
    <div className="asis-all-background">
      <div className="asis-form-div">
        <Container>
          <Col>
            <Row>
              <h4 className="asis-title">FORMULARIO DE ASISTENCIA</h4>
            </Row>
            <hr></hr>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="formCode">
                    <Form.Label className="asis-subtitle">
                      Código estudiante{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu respuesta"
                      onChange={(e) =>
                        setData({
                          ...data,
                          codigo: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <hr></hr>

                  <Form.Group controlId="formMonitoria">
                    <Form.Label className="asis-subtitle">
                      Monitoria a la qué asiste{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu respuesta"
                      onChange={(e) =>
                        setData({
                          ...data,
                          monitoria_asistencia: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <hr></hr>

                  <Form.Group controlId="formDate">
                    <Form.Label className="asis-subtitle">Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      disabled
                      value={new Date().toISOString().split("T")[0]}
                    />
                  </Form.Group>
                  <hr></hr>
                  <div style={{ textAlign: "center", alignItems: "center" }}>
                    <Button
                      variant="primary"
                      // type="submit"
                      onClick={(e) => send_data(e)}
                    >
                      Autorizar
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Container>
        <br />
      </div>
    </div>
  );
};

export default FormularioAsistencia;
