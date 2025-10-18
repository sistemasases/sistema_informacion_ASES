/**
 * @file formulario_primer_ingreso.jsx
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
import Swal from "sweetalert2";

const FormularioPrimerIngreso = (props) => {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [program, setProgram] = useState({
    data_program: [],
  });
  const opciones = [];
  const opciones_programa = [];
  const opciones_sexo = [
    { id: 0, value: "M", label: "Masculino" },
    { id: 1, value: "F", label: "Femenino" },
    { id: 2, value: "NB", label: "No Binario" },
    { id: 3, value: "O", label: "Otro" },
  ];

  useEffect(() => {
    All_program_formularios_externos.all_program_formularios_externos()
      .then((pro_res) => {
        if (pro_res) {
          // console.log("Respuesta de la API programas:", pro_res);

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

  const handle_open_program = () => {
    // // console.log("HOLAAA");
    // // console.log(semestres.data_semestre.length);
    for (let i = 0; i < program.data_program.length; i++) {
      opciones_programa.pop(i);
    }

    for (let i = 0; i < program.data_program.length; i++) {
      const dato = {
        value: program.data_program[i]["codigo_univalle"],
        label:
          program.data_program[i]["codigo_univalle"] +
          " - " +
          program.data_program[i]["nombre"] +
          " - " +
          program.data_program[i]["nombre_sede"] +
          " - " +
          program.data_program[i]["jornada"],
        id: program.data_program[i]["id"],
      };
      //   // console.log(dato);
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
  });

  const send_data = (e) => {
    // const regex = /^[a-zA-Z-]*$/;
    const regex = /^[0-9]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const documento = /^\d*$/;
    const regexCodigo = /^-?\d*$/;

    console.log(data);
    if (
      data.codigo_estudiante === "" ||
      data.nombre === "" ||
      data.apellido === "" ||
      data.tipo_doc === "" ||
      data.num_doc === "" ||
      data.sexo === "" ||
      data.correo === "" ||
      data.celular === "" ||
      data.programa === ""
    ) {
      // alert("Por favor llene todos los campos obligatorios");
      console.log(data);
      Swal.fire({
        title: "Mensaje de alerta",
        text: "Por favor, verifica que todos los campos obligatorios estén llenos antes de enviar",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Aceptar",
        // cancelButtonText: "No",
      });
      return;
    } else if (data.celular <= 0 || data.num_doc <= 0) {
      alert("El número de celular o documento no puede ser negativo");
      Swal.fire({
        title: "Error",
        text: "El número de celular o documento no puede ser negativo",
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
    } else if (data.celular.length > 10) {
      let text = "El número celular debe ser inferior a 10 dígitos";
      Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
    } else if (regex.test(data.celular) == false) {
      // alert("Ocurrió un error");
      let text = "El número de celular no puede contener letras";
      Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
      setPhoneError("El número de celular no puede contener letras");
    } else if (data.codigo_estudiante.length !== 7) {
      // alert("Ocurrió un error");
      let text = "El código no debe ser mayor ni menor a 7 dígitos";
      Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
      setError("El código no debe ser mayor ni menor a 7 dígitos");
    } else if (emailRegex.test(data.correo) == false) {
      // alert("Ocurrió un error");
      let text =
        "El correo ingresado no tiene un formato válido. Por favor, corrígelo para continuar.";
      Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
      setEmailError("El correo no tiene un formato válido");
    } else if (documento.test(data.num_doc) == false) {
      let text = "El número de documento no puede contener letras";
      Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
    } else if (regex.test(data.codigo_estudiante) == false) {
      // alert("Ocurrió un error");
      let text =
        "El código de estudiante no puede contener caracteres especiales";
      Swal.fire({
        title: "Error",
        text: text,
        icon: "error",
        timer: 1300,
        showConfirmButton: false,
      });
      setError(
        "El código de estudiante no puede contener caracteres especiales"
      );
    } else {
      Formulario_primer_ingreso.formularios_externos_primer_ingreso_envio(data)
        .then((res) => {
          // console.log("Respuesta de la API:", res);
        })
        .catch((error) => {
          // console.error("Error al obtener datos de la API:", error);
          alert(
            "Ocurrió un error al enviar los datos, reintente de nuevo más tarde"
          );
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

  const handle_sexo = () => {
    // // console.log("HOLAAA");
    // // console.log(semestres.data_semestre.length);
    for (let i = 0; i < opciones_sexo.length; i++) {
      opciones_sexo.pop(i);
    }

    for (let i = 0; i < opciones_sexo.length; i++) {
      const dato = {
        value: opciones_sexo[i]["value"],
        label: opciones_sexo[i]["label"],
      };
      //   // console.log(dato);
      opciones_sexo.push(dato);
    }
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
                        title="Debe ingresar el código sin la centuria, por ejemplo: 203550050, 3550050"
                      />
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="formName">
                      <Form.Label className="prim-subtitle">
                        Nombre <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        style={{ textTransform: "uppercase" }}
                        onChange={(e) =>
                          setData({
                            ...data,
                            nombre: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr></hr>

                <Row>
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label className="prim-subtitle">
                        Apellidos <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu respuesta"
                        style={{ textTransform: "uppercase" }}
                        onChange={(e) =>
                          setData({
                            ...data,
                            apellido: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    {/* Columna Derecha */}

                    <Form.Group controlId="formSex">
                      <Form.Label className="prim-subtitle">
                        Sexo <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Select
                        styles={customStyles}
                        className="option"
                        options={opciones_sexo}
                        // onMenuOpen={handle_sexo}
                        placeholder="Elija su sexo"
                        onChange={(e) => {
                          // console.log(e.value);
                          setData({
                            ...data,
                            sexo: e.value,
                          });
                        }}
                      ></Select>
                    </Form.Group>
                  </Col>
                </Row>
                <hr></hr>
                <Row>
                  <Col>
                    <Form.Group controlId="formEmail">
                      <Form.Label className="prim-subtitle">
                        Correo <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            correo: e.target.value,
                          })
                        }
                        title="Debe ingresar un correo electrónico válido: nombre@dominio.com"
                      />
                      {emailError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="formCellphone">
                      <Form.Label className="prim-subtitle">
                        Celular <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min={0}
                        max={9999999999}
                        placeholder="Tu respuesta"
                        onChange={(e) => {
                          const value = e.target.value;
                          console.log(value);
                          if (value >= 0) {
                            setData({
                              ...data,
                              celular: value,
                            });
                          } else {
                            // alert("El número de celular no puede ser negativo");
                            Swal.fire({
                              title: "Error",
                              text: "El número de celular no puede ser negativo",
                              icon: "error",
                              timer: 1300,
                              showConfirmButton: false,
                            });
                          }
                        }}
                      />
                      {phoneError && (
                        <p style={{ color: "red" }}>{phoneError}</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <hr></hr>

                <Row>
                  <Form.Group
                    controlId="formProgram"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Form.Label className="prim-subtitle">
                      Código Programa <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Select
                      styles={customStyles}
                      className="option"
                      options={opciones_programa}
                      onMenuOpen={handle_open_program}
                      placeholder="Cambie de programa"
                      onChange={(e) => {
                        // console.log(e.value);
                        setData({
                          ...data,
                          programa: e.id,
                        });
                      }}
                    ></Select>
                  </Form.Group>
                </Row>
                <hr></hr>
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
                    <Form.Group controlId="formDocument">
                      <Form.Label className="prim-subtitle">
                        Documento <label style={{ color: "red" }}> *</label>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Tu respuesta"
                        onChange={(e) =>
                          setData({
                            ...data,
                            num_doc: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr></hr>
                <br />
                <div style={{ textAlign: "center", alignItems: "center" }}>
                  <Button
                    variant="primary"
                    // type="submit"
                    onClick={(e) => send_data(e)}
                  >
                    Crear estudiante
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
