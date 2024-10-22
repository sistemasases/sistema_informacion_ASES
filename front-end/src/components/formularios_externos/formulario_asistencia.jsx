/**
 * @file formulario_asistencia.jsx
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
import Select from "react-select";
import All_monitorias_formularios_externos from "../../service/all_monitorias_formularios_externos.js";
import Formularios_externos_asistencia_envio from "../../service/formularios_externos_asistencia_envio.js";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import "../../Scss/formularios_externos/formulario_asistencia_style.css";

const FormularioAsistencia = (props) => {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [opciones_monitoria, setOpcionesMonitoria] = useState({
    data_monitorias: [],
  });
  const opciones = [];
  const [error, setError] = useState("");

  useEffect(() => {
    // Establecer la fecha actual cuando el componente se monta
    const currentDate = new Date().toISOString().split("T")[0];
    setData({
      ...data,
      fecha: currentDate,
    });

    // Obtener las monitorias
    All_monitorias_formularios_externos.all_monitorias_formularios_externos()
      .then((res) => {
        // console.log(res);
        setOpcionesMonitoria({
          data_monitorias: res,
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Error al obtener las monitorias, vuelva a intentarlo");
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
    codigo_estudiante: "",
    id_monitoria: "",
    fecha: "",
  });

  const send_data = (e) => {
    const regex = /^[0-9]*$/;

    if (data.codigo_estudiante === "" || data.id_monitoria === "") {
      alert("Por favor llene todos los campos obligatorios");
      return;
    } else if (data.codigo_estudiante.length !== 7) {
      alert("Ocurrió un error");
      setError("El código no debe ser mayor ni menor a 7 dígitos");
    } else if (regex.test(data.codigo_estudiante) == false) {
      alert("Ocurrió un error");
      setError(
        "El código de estudiante no puede contener caracteres especiales"
      );
    } else {
      Formularios_externos_asistencia_envio.formularios_externos_asistencia_envio(
        data
      )
        .then((res) => {
          // console.log(res);
          // if (res) {
          //   alert("Datos enviados correctamente");
          // } else {
          //   alert("Error al enviar los datos, vuelva a intentarlo");
          //   // // console.log("Error al enviar los datos, vuelva a intentarlo");
          // }
        })
        .catch((error) => {
          console.error(error);
          alert("Error al enviar los datos, vuelva a intentarlo");
        });
    }
  };

  /**
   * Es necesario ?
   *  ****Agregar "Algo" para identificar a los qué asisten por x o y motivo hasta un día de diciembre
   * Te acercas a la monitoria académica de ASES con el objetivo de conseguir el aval de la Estrategia para acogerte al acuerdo 006
   *
   */

  const handle_open_monitorias = () => {
    // // console.log(sede.data_sede);
    // // console.log("HOLAAA");
    // // console.log(semestres.data_semestre.length);
    for (let i = 0; i < opciones_monitoria.data_monitorias.length; i++) {
      opciones.pop(i);
    }

    for (let i = 0; i < opciones_monitoria.data_monitorias.length; i++) {
      const dato = {
        value: opciones_monitoria.data_monitorias[i]["id_monitor"],
        label:
          opciones_monitoria.data_monitorias[i]["materia"] +
          " - " +
          opciones_monitoria.data_monitorias[i]["nombre_monitor"],
        id: opciones_monitoria.data_monitorias[i]["id"],
      };
      //   // console.log(dato);
      opciones.push(dato);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      position: "relative",
      borderColor: "grey", // Cambia el color del borde
      boxShadow: "none", // Remueve el sombreado
      "&:hover": {
        borderColor: "darkred", // Cambia el color del borde al pasar el ratón
      },
      // margin: "10px", // Agregar margen alrededor del control
      padding: "5px", // Agregar padding dentro del control
      marginBottom: "2rem",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 2, // Asegúrate de que el menú se superponga a otros elementos
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "lightblue" : "white",
      color: state.isSelected ? "black" : "blue",
      "&:hover": {
        backgroundColor: "lightgray",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray", // Cambia el color del texto del placeholder
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // Cambia el color del texto seleccionado
    }),
  };

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
                          codigo_estudiante: e.target.value,
                        })
                      }
                      title="Debe ingresar el código sin la centuria, por ejemplo: 203550050, 3550050"
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                  </Form.Group>
                  <hr></hr>

                  <Form.Group controlId="formMonitoria">
                    <Form.Label className="asis-subtitle">
                      Monitoria a la qué asiste{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>

                    <Select
                      styles={customStyles}
                      className="option"
                      options={opciones}
                      onMenuOpen={handle_open_monitorias}
                      placeholder="Seleccione la monitoría a la qué asiste"
                      onChange={(e) => {
                        setData({
                          ...data,
                          id_monitoria: e.id,
                        });
                      }}
                    ></Select>
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
