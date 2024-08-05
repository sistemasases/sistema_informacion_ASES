import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { Row, Col } from "styled-bootstrap-grid";

import Seguimiento_individual from "../seguimiento_forms/form_seguimiento_individual";
import Inasistencia from "../seguimiento_forms/form_inasistencia";
import Seguimiento_individual_v2 from "../seguimiento_forms/form_seguimiento_individual_v2";
import All_semestres from "../../service/all_semestres.js";
import { useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  desencriptar,
  decryptTokenFromSessionStorage,
  desencriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

const Info_registros = (props) => {
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };
  const userRole = desencriptar(sessionStorage.getItem("rol"));
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showIn, setShowIn] = useState(false);
  const handleModalIn = () => setShowIn(true);
  const handleCloseIn = () => setShowIn(false);

  const [semestres, set_semestres] = useState({
    data_semestre: [],
  });

  const [state, set_state] = useState({
    data_user: [],
  });
  const opciones = [];

  useEffect(() => {
    let formData = new FormData();
    formData.append("id_estudiante", props.id_estudiante);
    formData.append(
      "id_semestre",
      desencriptarInt(sessionStorage.getItem("id_semestre_actual"))
    );

    axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_API_URL}/usuario_rol/ultimo_seguimiento_individual/ultimo_seguimiento_semestre/`,
      method: "POST",
      headers: config,
      data: formData,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_user: respuesta.data,
        });
      })
      .catch((err) => {
        console.log("estos son los primeros datos :" + state.data_user);
      });
  }, [props.id_estudiante]);

  useEffect(() => {
    All_semestres.all_semestres().then((res) => {
      // console.log(res);
      set_semestres({
        ...semestres,
        data_semestre: res,
      });
    });
  }, []);

  const handle_semestre = () => {
    // console.log(semestres.data_semestre);
    // console.log("HOLAAA");
    // console.log(semestres.data_semestre.length);
    for (let i = 0; i < semestres.data_semestre.length; i++) {
      opciones.pop(i);
    }

    for (let i = 0; i < semestres.data_semestre.length; i++) {
      const dato = {
        value: semestres.data_semestre[i]["nombre"],
        label: semestres.data_semestre[i]["nombre"],
        id: semestres.data_semestre[i]["id"],
        // nombre: semestres.data_semestre[i]["nombre"],
      };
      //   console.log(dato);
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
      margin: "10px", // Agregar margen alrededor del control
      padding: "5px", // Agregar padding dentro del control
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

  const actualizar_seguimientos_semestres = (e) => {
    // console.log(e);
    // console.log("HOALAAAA");
    let formData = new FormData();
    formData.append("id_estudiante", props.id_estudiante);
    formData.append("id_semestre", e.id);
    let url_update = `${process.env.REACT_APP_API_URL}/usuario_rol/ultimo_seguimiento_individual/ultimo_seguimiento_semestre/`;

    axios({
      // Endpoint to send files
      url: `${process.env.REACT_APP_API_URL}/usuario_rol/ultimo_seguimiento_individual/ultimo_seguimiento_semestre/`,
      method: "POST",
      headers: config,
      data: formData,
    })
      .then((respuesta) => {
        // console.log(respuesta.data);
        set_state({
          ...state,
          data_user: respuesta.data,
        });
        // console.log(state);
      })
      .catch((err) => {
        console.log("estos son los primeros datos :" + err);
      });
  };

  return (
    <Row className="container_info_registro">
      <Seguimiento_individual_v2
        estudiante_seleccionado={props.id_estudiante}
        recarga_ficha_estudiante={true}
        show={show}
        onHide={handleClose}
        handleClose={handleClose}
        handleModalIn={handleModalIn}
        size="lg"
      />
      <Inasistencia
        estudiante_seleccionado={props.id_estudiante}
        recarga_ficha_estudiante={true}
        show={showIn}
        onHide={handleCloseIn}
        handleCloseIn={handleCloseIn}
        handleModal={handleModal}
        size="lg"
      />
      {}
      <div class="d-none d-lg-block col-1">
        <Col></Col>
      </div>
      <Col xs={12} lg={11}>
        <div class="d-none d-md-block l-20px">
          {(userRole === "super_ases" ||
            userRole === "sistemas" ||
            userRole === "socioeducativo_reg" ||
            userRole === "socioeducativo" ||
            userRole === "profesional" ||
            userRole === "practicante" ||
            userRole === "monitor") && (
            <Row className="generar_nuevo_reporte">
              <Button className="boton_nuevo_registro" onClick={handleModal}>
                NUEVO SEGUIMIENTO
              </Button>
            </Row>
          )}

          <Row className="riesgos">
            <Col>
              <Row xs={"12"} className="titulo_riesgos">
                <Col xs={"12"}>
                  <h3 className="texto_subtitulo" activeClassName="text_center">
                    RIESGOS
                  </h3>
                </Col>
                <Col>
                  <Select
                    styles={customStyles}
                    // class="option"
                    className="option"
                    options={opciones}
                    onMenuOpen={handle_semestre}
                    placeholder="Cambie de semestre"
                    onChange={actualizar_seguimientos_semestres}
                  ></Select>
                </Col>
              </Row>

              <Row xs={"12"} className="tipos_riesgos">
                <Col xs={"4"} sm={"4"} className="center_tipos_riesgos">
                  <Row className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto">A</label>
                    <h1 className="texto_alto">ALTO</h1>
                  </Row>
                </Col>
                <Col xs={"4"} sm={"4"} className="center_tipos_riesgos">
                  <Row className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio">M</label>
                    <h3 className="texto_medio">MEDIO</h3>
                  </Row>
                </Col>
                <Col xs={"4"} sm={"4"} className="center_tipos_riesgos">
                  <Row className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo">B</label>
                    <h3 className="texto_bajo">BAJO</h3>
                  </Row>
                </Col>
              </Row>

              <Row className="riesgos_fondo_claro">
                <Col>
                  {state.data_user["riesgo_individual"] === 0 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_bajo">
                          <label className="button_tipo_riesgo_bajo_2">B</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_bajo_texto">
                          INDIVIDUAL
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_individual"] === 1 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_medio">
                          <label className="button_tipo_riesgo_medio_2">
                            M
                          </label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_medio_texto">
                          INDIVIDUAL
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_individual"] === 2 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_alto">
                          <label className="button_tipo_riesgo_alto_2">A</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_alto_texto">
                          INDIVIDUAL
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_individual"] !== 0 &&
                    state.data_user["riesgo_individual"] !== 1 &&
                    state.data_user["riesgo_individual"] !== 2 && (
                      <Row className="row_riesgo">
                        <Col xs={"2"} sm={"2"} className="z_index_2">
                          <label className="borde_riesgos_ninguno">
                            <label className="button_tipo_riesgo_ninguno_2">
                              N
                            </label>
                          </label>
                        </Col>
                        <Col
                          xs={"10"}
                          sm={"10"}
                          className="center_tipos_riesgos"
                        >
                          <label className="button_tipo_riesgo_ninguno_texto">
                            INDIVIDUAL
                          </label>
                        </Col>
                      </Row>
                    )}

                  {state.data_user["riesgo_familiar"] === 0 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_bajo">
                          <label className="button_tipo_riesgo_bajo_2">B</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_bajo_texto">
                          FAMILIAR
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_familiar"] === 1 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_medio">
                          <label className="button_tipo_riesgo_medio_2">
                            M
                          </label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_medio_texto">
                          FAMILIAR
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_familiar"] === 2 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_alto">
                          <label className="button_tipo_riesgo_alto_2">A</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_alto_texto">
                          FAMILIAR
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_familiar"] !== 0 &&
                    state.data_user["riesgo_familiar"] !== 1 &&
                    state.data_user["riesgo_familiar"] !== 2 && (
                      <Row className="row_riesgo">
                        <Col xs={"2"} sm={"2"} className="z_index_2">
                          <label className="borde_riesgos_ninguno">
                            <label className="button_tipo_riesgo_ninguno_2">
                              N
                            </label>
                          </label>
                        </Col>
                        <Col
                          xs={"10"}
                          sm={"10"}
                          className="center_tipos_riesgos"
                        >
                          <label className="button_tipo_riesgo_ninguno_texto">
                            FAMILIAR
                          </label>
                        </Col>
                      </Row>
                    )}

                  {state.data_user["riesgo_academico"] === 0 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_bajo">
                          <label className="button_tipo_riesgo_bajo_2">B</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_bajo_texto">
                          ACADEMICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_academico"] === 1 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_medio">
                          <label className="button_tipo_riesgo_medio_2">
                            M
                          </label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_medio_texto">
                          ACADEMICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_academico"] === 2 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_alto">
                          <label className="button_tipo_riesgo_alto_2">A</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_alto_texto">
                          ACADEMICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_academico"] !== 0 &&
                    state.data_user["riesgo_academico"] !== 1 &&
                    state.data_user["riesgo_academico"] !== 2 && (
                      <Row className="row_riesgo">
                        <Col xs={"2"} sm={"2"} className="z_index_2">
                          <label className="borde_riesgos_ninguno">
                            <label className="button_tipo_riesgo_ninguno_2">
                              N
                            </label>
                          </label>
                        </Col>
                        <Col
                          xs={"10"}
                          sm={"10"}
                          className="center_tipos_riesgos"
                        >
                          <label className="button_tipo_riesgo_ninguno_texto">
                            ACADEMICO
                          </label>
                        </Col>
                      </Row>
                    )}

                  {state.data_user["riesgo_economico"] === 0 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_bajo">
                          <label className="button_tipo_riesgo_bajo_2">B</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_bajo_texto">
                          ECONOMICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_economico"] === 1 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_medio">
                          <label className="button_tipo_riesgo_medio_2">
                            M
                          </label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_medio_texto">
                          ECONOMICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_economico"] === 2 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_alto">
                          <label className="button_tipo_riesgo_alto_2">A</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_alto_texto">
                          ECONOMICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_economico"] !== 0 &&
                    state.data_user["riesgo_economico"] !== 1 &&
                    state.data_user["riesgo_economico"] !== 2 && (
                      <Row className="row_riesgo">
                        <Col xs={"2"} sm={"2"} className="z_index_2">
                          <label className="borde_riesgos_ninguno">
                            <label className="button_tipo_riesgo_ninguno_2">
                              N
                            </label>
                          </label>
                        </Col>
                        <Col
                          xs={"10"}
                          sm={"10"}
                          className="center_tipos_riesgos"
                        >
                          <label className="button_tipo_riesgo_ninguno_texto">
                            ECONOMICO
                          </label>
                        </Col>
                      </Row>
                    )}

                  {state.data_user["riesgo_vida_universitaria_ciudad"] ===
                    0 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_bajo">
                          <label className="button_tipo_riesgo_bajo_2">B</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_bajo_texto">
                          VIDA UNIVERSITARIA
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_vida_universitaria_ciudad"] ===
                    1 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_medio">
                          <label className="button_tipo_riesgo_medio_2">
                            M
                          </label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_medio_texto">
                          VIDA UNIVERSITARIA
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_vida_universitaria_ciudad"] ===
                    2 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_alto">
                          <label className="button_tipo_riesgo_alto_2">A</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_alto_texto">
                          VIDA UNIVERSITARIA
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_vida_universitaria_ciudad"] !== 0 &&
                    state.data_user["riesgo_vida_universitaria_ciudad"] !== 1 &&
                    state.data_user["riesgo_vida_universitaria_ciudad"] !==
                      2 && (
                      <Row className="row_riesgo">
                        <Col xs={"2"} sm={"2"} className="z_index_2">
                          <label className="borde_riesgos_ninguno">
                            <label className="button_tipo_riesgo_ninguno_2">
                              N
                            </label>
                          </label>
                        </Col>
                        <Col
                          xs={"10"}
                          sm={"10"}
                          className="center_tipos_riesgos"
                        >
                          <label className="button_tipo_riesgo_ninguno_texto">
                            VIDA UNIVERSITARIA
                          </label>
                        </Col>
                      </Row>
                    )}

                  {state.data_user["riesgo_geografico"] === 0 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_bajo">
                          <label className="button_tipo_riesgo_bajo_2">B</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_bajo_texto">
                          GEOGRAFICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_geografico"] === 1 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_medio">
                          <label className="button_tipo_riesgo_medio_2">
                            M
                          </label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_medio_texto">
                          GEOGRAFICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_geografico"] === 2 && (
                    <Row className="row_riesgo">
                      <Col xs={"2"} sm={"2"} className="z_index_2">
                        <label className="borde_riesgos_alto">
                          <label className="button_tipo_riesgo_alto_2">A</label>
                        </label>
                      </Col>
                      <Col xs={"10"} sm={"10"} className="center_tipos_riesgos">
                        <label className="button_tipo_riesgo_alto_texto">
                          GEOGRAFICO
                        </label>
                      </Col>
                    </Row>
                  )}

                  {state.data_user["riesgo_geografico"] !== 0 &&
                    state.data_user["riesgo_geografico"] !== 1 &&
                    state.data_user["riesgo_geografico"] !== 2 && (
                      <Row className="row_riesgo">
                        <Col xs={"2"} sm={"2"} className="z_index_2">
                          <label className="borde_riesgos_ninguno">
                            <label className="button_tipo_riesgo_ninguno_2">
                              N
                            </label>
                          </label>
                        </Col>
                        <Col
                          xs={"10"}
                          sm={"10"}
                          className="center_tipos_riesgos"
                        >
                          <label className="button_tipo_riesgo_ninguno_texto">
                            GEOGRAFICO
                          </label>
                        </Col>
                      </Row>
                    )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div class="d-block d-md-none">
          <Row className="riesgos_pequeño">
            <Col>
              <Row xs={"12"} className="titulo_riesgos_pequeño">
                <Col xs={"12"}>
                  <h3 className="texto_subtitulo" activeClassName="text_center">
                    RIESGOS
                  </h3>
                </Col>
              </Row>

              <Row className="riesgos_fondo_claro">
                {state.data_user["riesgo_individual"] === 0 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo_texto_pequeño">
                      INDIVIDUAL
                    </label>
                  </Col>
                )}
                {state.data_user["riesgo_individual"] === 1 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio_texto_pequeño">
                      INDIVIDUAL
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_individual"] === 2 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto_texto_pequeño">
                      INDIVIDUAL
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_individual"] !== 0 &&
                  state.data_user["riesgo_individual"] !== 1 &&
                  state.data_user["riesgo_individual"] !== 2 && (
                    <Col xs={"6"} className="center_tipos_riesgos">
                      <label className="button_tipo_riesgo_ninguno_texto_pequeño">
                        INDIVIDUAL
                      </label>
                    </Col>
                  )}

                {state.data_user["riesgo_familiar"] === 0 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo_texto_pequeño">
                      FAMILIAR
                    </label>
                  </Col>
                )}
                {state.data_user["riesgo_familiar"] === 1 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio_texto_pequeño">
                      FAMILIAR
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_familiar"] === 2 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto_texto_pequeño">
                      FAMILIAR
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_familiar"] !== 0 &&
                  state.data_user["riesgo_familiar"] !== 1 &&
                  state.data_user["riesgo_familiar"] !== 2 && (
                    <Col xs={"6"} className="center_tipos_riesgos">
                      <label className="button_tipo_riesgo_ninguno_texto_pequeño">
                        FAMILIAR
                      </label>
                    </Col>
                  )}

                {state.data_user["riesgo_academico"] === 0 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo_texto_pequeño">
                      ACADEMICO
                    </label>
                  </Col>
                )}
                {state.data_user["riesgo_academico"] === 1 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio_texto_pequeño">
                      ACADEMICO
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_academico"] === 2 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto_texto_pequeño">
                      ACADEMICO
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_academico"] !== 0 &&
                  state.data_user["riesgo_academico"] !== 1 &&
                  state.data_user["riesgo_academico"] !== 2 && (
                    <Col xs={"6"} className="center_tipos_riesgos">
                      <label className="button_tipo_riesgo_ninguno_texto_pequeño">
                        ACADEMICO
                      </label>
                    </Col>
                  )}

                {state.data_user["riesgo_economico"] === 0 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo_texto_pequeño">
                      ECONOMICO
                    </label>
                  </Col>
                )}
                {state.data_user["riesgo_economico"] === 1 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio_texto_pequeño">
                      ECONOMICO
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_economico"] === 2 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto_texto_pequeño">
                      ECONOMICO
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_economico"] !== 0 &&
                  state.data_user["riesgo_economico"] !== 1 &&
                  state.data_user["riesgo_economico"] !== 2 && (
                    <Col xs={"6"} className="center_tipos_riesgos">
                      <label className="button_tipo_riesgo_ninguno_texto_pequeño">
                        ECONOMICO
                      </label>
                    </Col>
                  )}

                {state.data_user["riesgo_vida_universitaria_ciudad"] === 0 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo_texto_pequeño">
                      VIDA UNIV..
                    </label>
                  </Col>
                )}
                {state.data_user["riesgo_vida_universitaria_ciudad"] === 1 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio_texto_pequeño">
                      VIDA UNIV..
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_vida_universitaria_ciudad"] === 2 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto_texto_pequeño">
                      VIDA UNIV..
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_vida_universitaria_ciudad"] !== 0 &&
                  state.data_user["riesgo_vida_universitaria_ciudad"] !== 1 &&
                  state.data_user["riesgo_vida_universitaria_ciudad"] !== 2 && (
                    <Col xs={"6"} className="center_tipos_riesgos">
                      <label className="button_tipo_riesgo_ninguno_texto_pequeño">
                        VIDA UNIV..
                      </label>
                    </Col>
                  )}

                {state.data_user["riesgo_geografico"] === 0 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_bajo_texto_pequeño">
                      GEOGRAFICO
                    </label>
                  </Col>
                )}
                {state.data_user["riesgo_geografico"] === 1 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_medio_texto_pequeño">
                      GEOGRAFICO
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_geografico"] === 2 && (
                  <Col xs={"6"} className="center_tipos_riesgos">
                    <label className="button_tipo_riesgo_alto_texto_pequeño">
                      GEOGRAFICO
                    </label>
                  </Col>
                )}

                {state.data_user["riesgo_geografico"] !== 0 &&
                  state.data_user["riesgo_geografico"] !== 1 &&
                  state.data_user["riesgo_geografico"] !== 2 && (
                    <Col xs={"6"} className="center_tipos_riesgos">
                      <label className="button_tipo_riesgo_ninguno_texto_pequeño">
                        GEOGRAFICO
                      </label>
                    </Col>
                  )}
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Info_registros;
