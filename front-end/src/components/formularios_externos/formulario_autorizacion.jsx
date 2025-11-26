/**
 * @file formulario_autorizacion.jsx
 * @version 1.0.0
 * @description Formulario de autorizacion de tratamiento de datos.
 * @author Steven Bernal
 * @contact steven.bernal@correounivalle.edu.co
 * @date 4 de Julio del 2024
 */
import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { decryptTokenFromSessionStorage } from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";
import Formularios_externos_firma_tratamiento_datos_envio from "../../service/formularios_externos_firma_tratamiento_datos_envio.js";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import "../../Scss/formularios_externos/formulario_autorizacion_style.css";
import Swal from "sweetalert2";

const FormularioActualizacion = (props) => {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [emailError, setEmailError] = useState("");
  const [autorizacionDatos, setAutorizacionDatos] = useState(false);
  const [autError, setAutError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const handleCheckboxChange = (e) => {
    setAutorizacionDatos(e.target.checked);
    setData({
      ...data,
      autoriza_tratamiento_datos: e.target.checked,
    });
  };


  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);

    if (e.target.value === "C.C.") {
      setData({
        ...data,
        tipo_id_estudiante: e.target.value,
      });
    } else if (e.target.value === "T.I.") {
      setData({
        ...data,
        tipo_id_estudiante: e.target.value,
      });
    } else if (e.target.value === "Otros") {
      setData({
        ...data,
        tipo_id_estudiante: "",
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === "") {
      setEmailError("");
      return;
    }
    
    if (!emailRegex.test(email)) {
      setEmailError("El correo no tiene un formato válido (ejemplo: nombre@dominio.com)");
    } else {
      setEmailError("");
    }
  };

  const handle_otherDocumentType = (e) => {
    setOtherDocumentType(e.target.value);
    setData({
      ...data,
      tipo_id_estudiante: e.target.value,
    });
  };

  const [data, setData] = useState({
    nombre_firma: "",
    tipo_id_estudiante: "",
    documento: "",
    correo_firma: "",
    autoriza_tratamiento_imagen: null,
    autoriza_tratamiento_datos: null,
    fecha_firma: new Date().toISOString().split("T")[0],
  });

  const send_data = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(data.autoriza_tratamiento_datos);
    // Verificar que los campos obligatorios no estén vacíos
    if (
      data.nombre_firma === "" ||
      data.tipo_id_estudiante === "" ||
      data.documento === "" ||
      data.correo_firma === "" ||
      data.autoriza_tratamiento_datos === null ||
      data.autoriza_tratamiento_imagen === null
    ) {
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
    } else if (!emailRegex.test(data.correo_firma)) {
      Swal.fire({
        title: "Mensaje de alerta",
        text: "El correo ingresado no tiene un formato válido. Por favor, corrígelo para continuar.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Aceptar",
        // cancelButtonText: "No",
      });
      setEmailError("El correo no tiene un formato válido");
      return;
    } else if (data.autoriza_tratamiento_datos === false) {
      console.log("No autorizó el tratamiento de datos");
      try {
        setAutError("Debe autorizar el tratamiento de datos personales para continuar.");
        return;
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al guardar los datos. Inténtalo nuevamente.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } else {
      setShowConfirmModal(true);   
    }
  };

  const result = async (e) => {
    const res =
      await Formularios_externos_firma_tratamiento_datos_envio.formularios_externos_firma(
        data
      );
    try {
      if (res) {
        Swal.fire({
          title: "Éxito",
          text: "Los datos fueron guardados correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar los datos. Inténtalo nuevamente.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (

    <div className="auth-all-background">
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar número de documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "1rem" }}>
            ¿Confirmas que tu número de documento es:
            <br />
            <strong style={{ fontSize: "1.2rem" }}>{data.documento}</strong> ?
          </p>
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            ⚠️ Este valor es muy importante para validar tu identidad.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={result}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="auth-form-div">
        <Container>
          <Col>
            <Row>
              <h4 className="auth-title">
                AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES ESTRATEGIA ASES
              </h4>
              <h5 className="salute">Apreciado/a Estudiante:</h5>
              <p className="info-text">
                La Estrategia de Seguimiento y Acompañamiento Estudiantil, en
                adelante ASES, es una iniciativa de la Vicerrectoría Académica
                de la Universidad del Valle, cuyas labores consisten en el
                acompañamiento y seguimiento socio educativo y académico de los
                estudiantes que ingresan a la Universidad con programas de
                créditos condonables del Estado Colombiano o por condiciones de
                excepción otorgadas por la ley a grupos poblacionales
                específicos. Dicho trabajo, tiene el objetivo de contribuir al
                desarrollo personal y académico de los estudiantes y a la
                reducción de su riesgo de deserción universitaria. Para el
                desarrollo de sus labores, ASES recopila y almacena información
                personal y sensible de los estudiantes.
              </p>

              <h5 className="salute">
                AUTORIZACIÓN TRATAMIENTO DE DATOS PERSONALES E IMÁGENES
              </h5>
              <p className="info-text">
                En cumplimiento a nuestro deber de informar tal como lo dispone
                la Ley 1581 de 2012, la Universidad del Valle, le informa que
                los datos personales y sensibles recolectados, serán utilizados
                únicamente con fines (de contacto, para la planeación y
                ejecución de las actividades de seguimiento y acompañamiento,
                para la elaboración de material informativo y publicitario y
                para propósitos de investigación. Además, podrán ser compartidos
                con otras dependencias de la Universidad para fines estadísticos
                o con cualquier dependencia que lo llegase a solicitar con
                ajuste a la ley), y tratados conforme la política de tratamiento
                de datos personales de la Universidad del Valle, publicada en la
                página web:{" "}
                <a href="http://www.univalle.edu.co/">
                  {" "}
                  http://www.univalle.edu.co/
                </a>
                .
              </p>

              <p className="info-text">
                En el transcurso de las labores de acompañamiento:
              </p>
              <p className="info-text-item">
                - Se tomarán fotografías y videos que podrán usarse en el
                material publicitario, informativo, didáctico, página web, redes
                sociales institucionales y otros medios de difusión de ASES.
              </p>
              <p className="info-text-item">
                - Se llevará a cabo el registro de datos personales, sensibles e
                información del acompañamiento en las bases de datos resultado
                del ejercicio de acompañamiento, es decir, información en las
                cinco dimensiones del riesgo de deserción a saber: Individual,
                Económica, Familiar, Académica y, Vida universitaria y ciudad,
                de tipo académico, familiar, personal y datos relacionados con
                su ámbito económico.
              </p>
              <p className="info-text">
                Las imágenes y datos recolectados son considerados datos
                sensibles, por lo cual el titular de la información no está
                obligado a brindar su autorización para el tratamiento de estos.
                No obstante, esta información es requerida para realizar la
                planeación y ejecución de las actividades de seguimiento y
                acompañamiento.
              </p>
              <p className="info-text">
                Así mismo, ASES indica que los datos serán consignados,
                almacenados y utilizados para las funciones establecidas en el
                marco de la Estrategia, única y exclusivamente para fines
                investigativos, académicos y de difusión. La autorización del
                uso de datos e imágenes no representa una retribución monetaria
                para usted como estudiante, dado el carácter académico del uso
                de los datos.
              </p>

              <p className="info-text">
                Para ejercer su derecho de conocer, actualizar o rectificar la
                información puede contactarnos a través de los siguientes
                canales:
              </p>

              <ul>
                <li className="channels-info">
                  Mediante nuestro Programa Atención al Ciudadano, diligenciando
                  el formato en la opción protección de datos a través de la
                  página{" "}
                  <a href="http://atencionalciudadano.univalle.edu.co/">
                    {" "}
                    http://atencionalciudadano.univalle.edu.co/
                  </a>
                </li>
                <li className="channels-info">
                  Escribiendo al correo electrónico de PQRSD{" "}
                  <label className="mail-text">
                    quejasyreclamos@correounivalle.edu.co{" "}
                  </label>{" "}
                  .{" "}
                </li>
              </ul>

              <label style={{ color: "red" }}>
                * Indica que la pregunta es obligatoria
              </label>
            </Row>
            <hr></hr>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="formAuthMail">
                    <Form.Label>
                      Correo electrónico{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Tu respuesta"
                      onChange={(e) =>{
                        setData({
                          ...data,
                          correo_firma: e.target.value,
                        })

                        if (!e.target.value.includes("@")) {
                          validateEmail(e.target.value);
                        }else {
                          setEmailError("");
                        }
                        
                      }
                      }
                      onKeyDown={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                      title="Debe ingresar un correo electrónico válido: nombre@dominio.com"
                    />
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                  </Form.Group>
                  <hr></hr>

                  <Form.Group controlId="formAuthFullname">
                    <Form.Label>
                      Nombre y Apellidos{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tu respuesta"
                      onChange={(e) => {
                        // eliminar cualquier caracter que no sea letra o espacio
                        const onlyLetters = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                        setData({
                          ...data,
                          nombre_firma: onlyLetters,
                        });
                        // actualizar el valor del input
                        e.target.value = onlyLetters;
                      }}
                      
                    />
                  </Form.Group>
                  <hr></hr>

                  <Form.Group controlId="formDocumentType">
                    <Form.Label>
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

                  <Form.Group controlId="formDocumentNumber">
                    <Form.Label>
                      Número de documento de identidad{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <p style={{ fontSize: "0.9rem", color: "red", fontWeight: "bold" }}>
                      ⚠️ Este número debe ser EXACTO. Con él se verifican tus registros en el sistema. Por favor asegurese de que sea correcto.
                    </p>
                    <Form.Control
                      type="text"
                      inputMode="numeric"
                      placeholder="Tu respuesta"
                      value={data.documento}
                      onChange={(e) => {
                        // Solo permite dígitos (0-9), elimina cualquier otro carácter
                        const numericValue = e.target.value.replace(/\D/g, '');
                        setData({
                          ...data,
                          documento: numericValue,
                        });
                      }}
                      onKeyDown={(e) => {
                        // Previene la entrada de espacios
                        if (e.key === ' ') {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Group>
                  <hr></hr>

                  <Form.Group controlId="formImageAuth">
                    <Form.Label>
                      ¿Autoriza el uso de imágenes en material publicitario?{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Form.Check
                      type="radio"
                      id="si"
                      label="Sí"
                      value="true"
                      name="imageAuth"
                      
                      onChange={(e) =>
                        setData({
                          ...data,
                          autoriza_tratamiento_imagen: e.target.value,
                        })
                      }
                    />
                    <Form.Check
                      type="radio"
                      id="no"
                      label="No"
                      value="false"
                      name="imageAuth"
                      // checked={documentType === "Otros"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          autoriza_tratamiento_imagen: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <hr></hr>

                  <Form.Group controlId="formDataAuth">
                    <Form.Label>
                      ¿Autoriza el tratamiento de datos personales y sensibles?{" "}
                      <label style={{ color: "red" }}> *</label>
                    </Form.Label>
                    <Form.Check
                      type="checkbox"
                      id="dataAuthCheckbox"
                      label="Autorizo el tratamiento de mis datos personales"
                      checked={autorizacionDatos}
                      onChange={handleCheckboxChange}
                    />
                  </Form.Group>
                  {autError && <p style={{ color: "red" }}>{autError}</p>}
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

export default FormularioActualizacion;
