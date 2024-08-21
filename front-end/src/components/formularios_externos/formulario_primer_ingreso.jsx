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
import Select from "react-select";

import {
  encriptar,
  desencriptar,
  decryptTokenFromSessionStorage,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import "../../Scss/formularios_externos/formulario_primer_ingreso_style.css";

import All_sedes_formularios_externos from "../../service/all_sedes_formularios_externos";
import All_program_formularios_externos from "../../service/all_programas_formularios_externos";
import Formulario_primer_ingreso from "../../service/formularios_externos_primer_ingreso_envio";

const FormularioPrimerIngreso = (props) => {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [sede, setSede] = useState({
    data_sede: [],
  });
  const [program, setProgram] = useState({
    data_program: [],
  });
  const opciones = [];
  const opciones_programa = [];

  // const url = encriptar("formulario_autorizacion");
  // console.log(url);
  // const decrypt_url = desencriptar("url");
  // console.log(decrypt_url);

  // URL: Asistencias : U2FsdGVkX19rLu/6uWbJJimIQLdYOg9C1x5ik8/+NlWI7bOkLOSOd1Q5Pi0NE/a/
  // URL: Autorización: U2FsdGVkX18hjszpddLoSgU/HywzCP8D13edFaHOV+PmxYYqsxUx7dICZxdkz/bz
  // URL: Primer Ingreso: U2FsdGVkX18g1g+ca30m/FtEBzWwjus8rabYkRwWvI/8iwRBY7myQCC55mq/VtU7

  useEffect(() => {
    All_sedes_formularios_externos.all_sedes_formularios_externos()
      .then((res) => {
        console.log("Respuesta de la API:", res);
        if (res) {
          console.log(res);
          setSede({
            ...sede,
            data_sede: res,
          });
        } else {
          console.error("Respuesta de la API no es un arreglo válido:", res);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
    All_program_formularios_externos.all_program_formularios_externos()
      .then((pro_res) => {
        if (pro_res) {
          console.log("Respuesta de la API programas:", pro_res);

          setProgram({
            ...program,
            data_program: pro_res,
          });
        } else {
        }
      })
      .catch((error) => {
        console.erro("Error al obtener datos de la API:", error);
      });
  }, []);

  const handle_open_sedes = () => {
    // console.log(sede.data_sede);
    // console.log("HOLAAA");
    // console.log(semestres.data_semestre.length);
    for (let i = 0; i < sede.data_sede.length; i++) {
      opciones.pop(i);
    }

    for (let i = 0; i < sede.data_sede.length; i++) {
      const dato = {
        value: sede.data_sede[i]["nombre"],
        label: sede.data_sede[i]["nombre"],
        id: sede.data_sede[i]["id"],
      };
      //   console.log(dato);
      opciones.push(dato);
    }
  };

  const handle_open_program = () => {
    // console.log(sede.data_sede);
    // console.log("HOLAAA");
    // console.log(semestres.data_semestre.length);
    for (let i = 0; i < program.data_program.length; i++) {
      opciones_programa.pop(i);
    }

    for (let i = 0; i < program.data_program.length; i++) {
      const dato = {
        value: program.data_program[i]["codigo_univalle"],
        label: program.data_program[i]["nombre"],
        id: program.data_program[i]["id"],
      };
      //   console.log(dato);
      opciones_programa.push(dato);
    }
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);

    if (e.target.value === "C.C.") {
      setData({
        ...data,
        tipo_doc: e.target.value,
      });
    } else if (e.target.value === "T.I.") {
      setData({
        ...data,
        tipo_doc: e.target.value,
      });
    } else if (e.target.value === "Otros") {
      setData({
        ...data,
        tipo_doc: "",
      });
    }
  };

  const handle_otherDocumentType = (e) => {
    setOtherDocumentType(e.target.value);
    setData({
      ...data,
      tipo_doc: e.target.value,
    });
  };

  const [data, setData] = useState({
    codigo_estudiante: "",
    nombre: "",
    apellido: "",
    tipo_doc: "",
    num_doc: "",
    sexo: "",
    correo: "",
    celular: "",
    programa: "",
    sede: "",
  });

  const send_data = (e) => {
    // console.log(e);
    console.log(data);

    // Importar servicio

    if (
      data.codigo_estudiante === "" ||
      data.nombre === "" ||
      data.apellido === "" ||
      data.tipo_doc === "" ||
      data.num_doc === "" ||
      data.sexo === "" ||
      data.correo === "" ||
      data.celular === "" ||
      data.programa === "" ||
      data.sede === ""
    ) {
      alert("Por favor llene todos los campos obligatorios");
      return;
    } else {
      Formulario_primer_ingreso.formularios_externos_primer_ingreso_envio(data)
        .then((res) => {
          console.log("Respuesta de la API:", res);
          if (res) {
            alert("Datos enviados correctamente");
          } else {
            console.error("Respuesta de la API no es un arreglo válido:", res);
            alert("Ocurrió un error al enviar los datos");
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos de la API:", error);
          alert("Ocurrió un error al enviar los datos");
        });
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
    <div className="prim-all-background">
      <div className="prim-form-div">
        <Container>
          <Col>
            <Row>
              <h4 className="prim-title">FORMULARIO DE PRIMER INGRESO</h4>
            </Row>
            <hr></hr>
            <Row>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formCode">
                      <Form.Label className="prim-subtitle">
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
                      />
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId="formLastName">
                      <Form.Label className="prim-subtitle">
                        Apellidos <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            apellido: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId="formEmail">
                      <Form.Label className="prim-subtitle">
                        Correo <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            correo: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId="formSede">
                      <Form.Label className="prim-subtitle">
                        Sede <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Select
                        styles={customStyles}
                        // class="option"
                        className="option"
                        options={opciones}
                        onMenuOpen={handle_open_sedes}
                        placeholder="Cambie de Sede"
                        onChange={(e) => {
                          setData({
                            ...data,
                            sede: e.id,
                          });
                        }}
                      ></Select>
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId="formDocumentType">
                      <Form.Label className="prim-subtitle">
                        Tipo documento de identidad{" "}
                        <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        id="documentTypeTI"
                        label="T.I."
                        value="T.I."
                        name="documentType"
                        checked={documentType === "T.I."}
                        onChange={handleDocumentTypeChange}
                      />
                      <Form.Check
                        type="radio"
                        id="documentTypeCC"
                        label="C.C."
                        value="C.C."
                        name="documentType"
                        checked={documentType === "C.C."}
                        onChange={handleDocumentTypeChange}
                      />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Form.Check
                          type="radio"
                          id="documentTypeOther"
                          label="Otros: "
                          value="Otros"
                          name="documentType"
                          checked={documentType === "Otros"}
                          onChange={handleDocumentTypeChange}
                        />
                        {documentType === "Otros" ? (
                          <Form.Control
                            type="text"
                            placeholder="Especificar"
                            value={otherDocumentType}
                            onChange={(e) => handle_otherDocumentType(e)}
                            style={{ marginLeft: "10px" }} // Ajusta el margen según sea necesario
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </Form.Group>
                    {/* <hr></hr> */}
                  </Col>

                  {/* Columna Derecha */}
                  <Col>
                    <Form.Group controlId="formName">
                      <Form.Label className="prim-subtitle">
                        Nombre <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            nombre: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId="formSex">
                      <Form.Label className="prim-subtitle">
                        Sexo <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            sexo: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId="formCellphone">
                      <Form.Label className="prim-subtitle">
                        Celular <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            celular: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <hr></hr>
                    <Form.Group
                      controlId="formProgram"
                      style={{ marginBottom: "1rem" }}
                    >
                      <Form.Label className="prim-subtitle">
                        Código Programa{" "}
                        <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Select
                        styles={customStyles}
                        className="option"
                        options={opciones_programa}
                        onMenuOpen={handle_open_program}
                        placeholder="Cambie de programa"
                        onChange={(e) => {
                          console.log(e.value);
                          setData({
                            ...data,
                            programa: e.value,
                          });
                        }}
                      ></Select>
                    </Form.Group>
                    <br />

                    <hr></hr>

                    <Form.Group controlId="formDocument">
                      <Form.Label className="prim-subtitle">
                        Documento <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            num_doc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    {/* <hr></hr> */}
                  </Col>
                </Row>
                <br />
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
            </Row>
          </Col>
        </Container>
        <br />
      </div>
    </div>
  );
};

export default FormularioPrimerIngreso;
