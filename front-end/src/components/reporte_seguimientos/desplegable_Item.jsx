/**
 * @file desplegable_Item.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de renderizar en una tabla el reporte de los seguimientos e inasistencias de los estudiantes
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import Socieducativa from "./socieducativa";
import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptarInt,
  encriptar,
  encriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

/**
 * Renderiza desplegables qué contienen los seguimientos e inasistencias
 * @param {Diccionario} item contiene datos como el tipo de usuario, el nombre, cantidad de estudiantes, etc.
 * @returns Renderizado de desplegables
 */
const Desplegable_item = ({ item }) => {
  // Configuración de la petición
  const config = {
    Authorization: "Bearer " + decryptTokenFromSessionStorage(),
  };

  // Constantes para controlar la apertura y cierre de los modales
  const [open, setOpen] = useState(false);

  // Constante para controlar el estado de los reportes
  const [state, set_state] = useState({
    data_user_socioedu: [],
    tiene_reportes_cargados: false,
  });

  // Constantes para controlar los datos del usuario socioeducativo
  const [data_user_socioedu, set_data_user_socioedu] = useState([]);

  /**
   * Se encarga de traer los seguimientos de un estudiante solamente del semestre actual
   * @param {Integer} e: Contiene el id del estudiante
   */
  const traer_reportes = (e) => {
    // Se define el id de la sede como parametro para la petición
    const paramsget = {
      id_sede: desencriptarInt(sessionStorage.getItem("sede_id")),
    };

    set_state({
      ...state,
      tiene_reportes_cargados: false,
    });

    // Se define la peticion que se realiza al servidor
    const url_axios =
      `${process.env.REACT_APP_API_URL}/seguimiento/seguimientos_estudiante_solo_semestre_actual/` +
      e +
      "/";

    axios({
      // Endpoint to send files
      url: url_axios,
      params: paramsget,
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_user_socioedu: respuesta.data,
          tiene_reportes_cargados: true,
        });

        set_data_user_socioedu(respuesta.data);
      })
      .catch((err) => {
        return err;
      });

    axios({
      // Endpoint to send files
      url: url_axios,
      method: "GET",
      headers: config,
    })
      .then((respuesta) => {
        set_state({
          ...state,
          data_user_socioedu: respuesta.data,
          tiene_reportes_cargados: true,
        });

        set_data_user_socioedu(respuesta.data);
      })
      .catch((err) => {
        return err;
      });

    encriptarInt(sessionStorage.setItem("id_estudiante_seleccionado", e));
  };
  /**
   * @function cambiar_ruta
   * @param e Es el nombre de la ruta
   * @description Cambia la vista según los links seleccionados
  */
  const cambiar_ruta = (e) => {
    if(e) {
      sessionStorage.setItem("path", encriptar(e));
    }
    window.location.reload();
  };
  if (item.tipo_usuario === "practicante") {
    return (
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
                    {item.first_name}
                    <br></br>
                    {item.last_name}
                  </Row>
                </Col>
                <Col
                  className="col_link_text_reporte_seguimientos_spans"
                  xs={"2"}
                  md={"1"}
                >
                  {item.monitores_del_practicante ? (
                    <Row className="row_spans_card_content_flex">
                      <Col xs={12}>
                        <FaUser></FaUser> :{" "}
                        {item.monitores_del_practicante.length}
                      </Col>
                      <Col xs={12}>
                        <FaGraduationCap></FaGraduationCap> :{" "}
                        {item.cantidad_estudiantes}
                      </Col>
                    </Row>
                  ) : (
                    <Row className="row_spans_card_content_flex">
                      <FaUser></FaUser>
                      <FaGraduationCap></FaGraduationCap>
                    </Row>
                  )}
                </Col>
                <Col
                  className="col_link_text_reporte_seguimientos_info"
                  xs={"12"}
                  md={"6"}
                >
                  {item.cantidad_reportes ? (
                    <Row className="sub_col_link_text_reporte_seguimientos_info">
                      <Col xs={"4"}>
                        <Row>
                          Fichas : {item.cantidad_reportes.count_seguimientos}
                        </Row>
                        <Row>
                          Inasistencias :{" "}
                          {item.cantidad_reportes.count_inasistencias}
                        </Row>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>
                            Pendientes prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_profesional
                            }
                          </Row>
                          <Row>
                            Pendientes prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_profesional
                            }
                          </Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>
                            P. prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_profesional
                            }
                          </Row>
                          <Row>
                            P. prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_profesional
                            }
                          </Row>
                        </div>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>
                            Pendientes pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_practicante
                            }
                          </Row>
                          <Row>
                            Pendientes pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_practicante
                            }
                          </Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>
                            P. pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_practicante
                            }
                          </Row>
                          <Row>
                            P. pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_practicante
                            }
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="sub_col_link_text_reporte_seguimientos_info">
                      <Col xs={"4"}>
                        <Row>Fichas : N/A</Row>
                        <Row>Inasistencias : N/A</Row>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>Pendientes prof</Row>
                          <Row>Pendientes prof</Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>P. prof</Row>
                          <Row>P. prof</Row>
                        </div>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>Pendientes pract</Row>
                          <Row>Pendientes pract</Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>P. pract</Row>
                          <Row>P. pract</Row>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
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
            </Col>
          </Row>
          <Row className="fichas-content">
            <div class="d-none d-md-inline col-12">
              <Col className="contenido_fichas">
                {item.monitores_del_practicante.map((child, index) => (
                  <Desplegable_item key={index} item={child} />
                ))}
              </Col>
            </div>
            <div class="d-inline d-md-none col-12">
              <Col className="contenido_fichas_pequeño">
                {item.monitores_del_practicante.map((child, index) => (
                  <Desplegable_item key={index} item={child} />
                ))}
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    );
  } else if (item.tipo_usuario === "monitor") {
    return (
      <Row>
        <Col className={open ? "fichas-item2 open" : "fichas-item2"}>
          <Row
            className="link_reporte_seguimientos1"
            onClick={() => setOpen(!open)}
          >
            <Col className="link_text_reporte_seguimientos1">
              <Row className="link_text_reporte_seguimientos_hover2">
                <Col xs={"10"} md={"4"}>
                  <Row className="col_link_text_reporte_seguimientos_nombre">
                    {item.first_name}
                    <br></br>
                    {item.last_name}
                  </Row>
                </Col>
                <Col
                  className="col_link_text_reporte_seguimientos_spans"
                  xs={"2"}
                  md={"1"}
                >
                  {item.estudiantes_del_monitor ? (
                    <Row className="row_spans_card_content_flex">
                      <Col xs={12}>
                        <FaUser></FaUser> :{" "}
                        {item.estudiantes_del_monitor.length}
                      </Col>
                    </Row>
                  ) : (
                    <Row className="row_spans_card_content_flex">
                      <FaUser></FaUser>
                    </Row>
                  )}
                </Col>
                <Col
                  className="col_link_text_reporte_seguimientos_info"
                  xs={"12"}
                  md={"6"}
                >
                  {item.cantidad_reportes ? (
                    <Row className="sub_col_link_text_reporte_seguimientos_info">
                      <Col xs={"4"}>
                        <Row>
                          Fichas : {item.cantidad_reportes.count_seguimientos}
                        </Row>
                        <Row>
                          Inasistencias :{" "}
                          {item.cantidad_reportes.count_inasistencias}
                        </Row>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>
                            Pendientes prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_profesional
                            }
                          </Row>
                          <Row>
                            Pendientes prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_profesional
                            }
                          </Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>
                            P. prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_profesional
                            }
                          </Row>
                          <Row>
                            P. prof :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_profesional
                            }
                          </Row>
                        </div>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>
                            Pendientes pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_practicante
                            }
                          </Row>
                          <Row>
                            Pendientes pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_practicante
                            }
                          </Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>
                            P. pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_seguimientos_pendientes_practicante
                            }
                          </Row>
                          <Row>
                            P. pract :{" "}
                            {
                              item.cantidad_reportes
                                .count_inasistencias_pendientes_practicante
                            }
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="sub_col_link_text_reporte_seguimientos_info">
                      <Col xs={"4"}>
                        <Row>Fichas : N/A</Row>
                        <Row>Inasistencias : N/A</Row>)
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>Pendientes prof</Row>
                          <Row>Pendientes prof</Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>P. prof</Row>
                          <Row>P. prof</Row>
                        </div>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>Pendientes pract</Row>
                          <Row>Pendientes pract</Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>P. pract</Row>
                          <Row>P. pract</Row>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
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
            </Col>
          </Row>

          <Row className="fichas-content">
            <div class="d-none d-md-inline col-12">
              <Col className="contenido_fichas">
                {item.estudiantes_del_monitor.map((child, index) => (
                  <Desplegable_item key={index} item={child} />
                ))}
              </Col>
            </div>
            <div class="d-inline d-md-none col-12">
              <Col className="contenido_fichas_pequeño">
                {item.estudiantes_del_monitor.map((child, index) => (
                  <Desplegable_item key={index} item={child} />
                ))}
              </Col>
            </div>
          </Row>
        </Col>
      </Row>
    );
  } else if (item.cod_univalle) {
    return (
      <Row>
        <Col className={open ? "fichas-item3 open" : "fichas-item3"}>
          <Row
            className="link_reporte_seguimientos1"
            onClick={() => {
              setOpen(!open);
              traer_reportes(item.id);
            }}
          >
            <Col className="link_text_reporte_seguimientos1">
              <Row className="link_text_reporte_seguimientos_hover3">
                <Col xs={"12"} md={"4"}>
                  <Row className="col_link_text_reporte_seguimientos_nombre">
                    {item.nombre}
                    <br></br>
                    {item.apellido}
                  </Row>
                </Col>
                <Col
                  className="col_link_text_reporte_seguimientos_info"
                  xs={"12"}
                  md={"6"}
                >
                  {item.cantidad_seguimientos ? (
                    <Row className="sub_col_link_text_reporte_seguimientos_info">
                      <Col xs={"4"}>
                        <Row>
                          Fichas :{" "}
                          {item.cantidad_seguimientos.count_seguimientos}
                        </Row>
                        <Row>
                          Inasistencias :{" "}
                          {item.cantidad_seguimientos.count_inasistencias}
                        </Row>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>
                            Pendientes prof :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_seguimientos_pendientes_profesional
                            }
                          </Row>
                          <Row>
                            Pendientes prof :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_inasistencias_pendientes_profesional
                            }
                          </Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>
                            P. prof :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_seguimientos_pendientes_profesional
                            }
                          </Row>
                          <Row>
                            P. prof :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_inasistencias_pendientes_profesional
                            }
                          </Row>
                        </div>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>
                            Pendientes pract :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_seguimientos_pendientes_practicante
                            }
                          </Row>
                          <Row>
                            Pendientes pract :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_inasistencias_pendientes_practicante
                            }
                          </Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>
                            P. pract :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_seguimientos_pendientes_practicante
                            }
                          </Row>
                          <Row>
                            P. pract :{" "}
                            {
                              item.cantidad_seguimientos
                                .count_inasistencias_pendientes_practicante
                            }
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="sub_col_link_text_reporte_seguimientos_info">
                      <Col xs={"4"}>
                        <Row>Fichas : N/A</Row>
                        <Row>Inasistencias : N/A</Row>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>Pendientes prof</Row>
                          <Row>Pendientes prof</Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>P. prof</Row>
                          <Row>P. prof</Row>
                        </div>
                      </Col>
                      <Col xs={"4"}>
                        <div class="d-none d-md-inline col-4">
                          <Row>Pendientes pract</Row>
                          <Row>Pendientes pract</Row>
                        </div>
                        <div class="d-inline d-md-none col-4">
                          <Row>P. pract</Row>
                          <Row>P. pract</Row>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Col>
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
            </Col>
          </Row>

          {state.tiene_reportes_cargados ? (
            <Row className="fichas-content">
              <div class="d-none d-md-inline col-12">
                <Col className="contenido_fichas">
                  <Socieducativa
                    data_user_socioedu={state.data_user_socioedu[0]}
                    updateDataUserSocioedu={traer_reportes}
                  />
                </Col>
              </div>
              <div class="d-inline d-md-none col-12">
                <Col className="contenido_fichas_pequeño">
                  <Socieducativa
                    data_user_socioedu={state.data_user_socioedu[0]}
                    updateDataUserSocioedu={traer_reportes}
                  />
                </Col>
              </div>
            </Row>
          ) : (
            <Row></Row>
          )}
        </Col>
      </Row>
    );
  } else {
    return (
      <a onClick={()=> cambiar_ruta(item.path)} className="fichas-item plain">
        {item.num_doc_ini}
      </a>
    );
  }
};

export default Desplegable_item;
