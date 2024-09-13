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

const FormularioActualizacion = (props) => {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");

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
    // setData({
    //   ...data,
    //   nombre_firma: e.target.value,
    // });
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
    autoriza_tratamiento_datos: "",
    autoriza_tratamiento_imagen: "",
    fecha_firma: new Date().toISOString().split("T")[0],
  });
  const send_data = (e) => {
    // console.log(e);
    // console.log(data);
    // usuario_rol

    // virificar que los campos obligatorios no esten vacios
    if (
      data.nombre_firma === "" ||
      data.tipo_id_estudiante === "" ||
      data.documento === "" ||
      data.correo_firma === "" ||
      data.autoriza_tratamiento_datos === "" ||
      data.autoriza_tratamiento_imagen === ""
    ) {
      alert("Por favor llene todos los campos obligatorios");
      return;
    } else {
      Formularios_externos_firma_tratamiento_datos_envio.formularios_externos_firma(
        data
      )
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          // console.error(error);
          alert("Error al enviar los datos, vuelva a intentarlo");
        });
    }
  };

  return (
    <div className="auth-all-background">
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
                      type="text"
                      placeholder="Tu respuesta"
                      onChange={(e) =>
                        setData({
                          ...data,
                          correo_firma: e.target.value,
                        })
                      }
                    />
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
                      onChange={(e) =>
                        setData({
                          ...data,
                          nombre_firma: e.target.value,
                        })
                      }
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
                    <Form.Control
                      type="text"
                      placeholder="Tu respuesta"
                      onChange={(e) =>
                        setData({
                          ...data,
                          documento: e.target.value,
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
                      type="radio"
                      id="si"
                      label="Sí"
                      value="true"
                      name="dataAuth"
                      // checked={documentType === "C.C."}
                      onChange={(e) =>
                        setData({
                          ...data,
                          autoriza_tratamiento_datos: e.target.value,
                        })
                      }
                    />
                    <Form.Check
                      type="radio"
                      id="no"
                      label="No"
                      value="false"
                      name="dataAuth"
                      // checked={documentType === "Otros"}
                      onChange={(e) =>
                        setData({
                          ...data,
                          autoriza_tratamiento_datos: e.target.value,
                        })
                      }
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
                      // checked={documentType === "C.C."}
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
