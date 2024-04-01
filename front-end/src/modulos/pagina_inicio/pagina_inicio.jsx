/**
 * @file pagina_inicio.jsx
 * @version 1.0.0
 * @description página de inicio con un banner informativo.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 28 de marzo de 2023
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import Select from "react-select";
import Carousel from "react-bootstrap/Carousel";
import All_sede_service from "../../service/all_sede";
import {
  encriptar,
  desencriptar,
  encriptarInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import boton1 from "../../images/BOTONES_SVG 18.svg";
import boton2 from "../../images/BOTONES_SVG 19.svg";
import boton3 from "../../images/BOTONES_SVG 20.svg";
import boton4 from "../../images/BOTONES_SVG 21.svg";
import boton6 from "../../images/BOTONES_SVG 3.svg";

import boton8 from "../../images/BOTONES_SVG 5.svg";
import boton9 from "../../images/BOTONES_SVG 6.svg";

import boton15 from "../../images/BOTONES_SVG 12.svg";

import boton17 from "../../images/BOTONES_SVG 14.svg";

import boton20 from "../../images/BOTONES_SVG 17.svg";
import boton21 from "../../images/BOTONES_SVG 1.svg";

import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Pagina_inicio = () => {
  //const decryptRol = desencriptar(sessionStorage.getItem('rol'));
  //Desencriptar los permisos del usuario desde el sessionStorage y los asignamos a userRole
  const userRole = desencriptar(sessionStorage.getItem("rol"));
  let desplegable;

  if (userRole === "sistemas" || userRole === "super_ases") {
    desplegable = "ADMIN";
  } else if (
    userRole === "socioeducativo_reg" ||
    userRole === "socioeducativo"
  ) {
    desplegable = "SOCIOEDUCATIVO";
  } else if (userRole === "dir_academico") {
    desplegable = "DIRECTOR ACÁDEMICO";
  } else if (userRole === "monitor") {
    desplegable = "MONITOR";
  } else if (userRole === "practicante") {
    desplegable = "PRACTICANTE";
  } else if (userRole === "dir_investigacion") {
    desplegable = "DIRECTOR INVES.";
  } else if (userRole === "dir_programa") {
    desplegable = "DIRECTOR PROGRAMA";
  } else if (userRole === "vcd_academico") {
    desplegable = "VICERRECTOR ACADE.";
  } else if (userRole === "profesional") {
    desplegable = "PROFESIONAL";
  } else if (userRole === "profesor") {
    desplegable = "PROFESOR";
  }

  //Constante y variable que se usaran para el select
  const opciones = [];
  var bandera_option = true;

  //Estado que se usara para extraer todas las sedes
  const [state, set_state] = useState({ tabs: [] });
  const [temp, set_temp] = useState({ seleccionado: "", value: "", id: "" });

  //Conexion con el back para extraer todas las sedes
  useEffect(() => {
    if (bandera_option === true && state.tabs.length === 0) {
      All_sede_service.all_sede()
        .then((res) => {
          console.log("Respuesta de la API:", res);
          if (res && Array.isArray(res)) {
            set_state({
              ...state,
              tabs: res,
            });
          } else {
            console.error("Respuesta de la API no es un arreglo válido:", res);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos de la API:", error);
        });
      bandera_option = false;
    }
  }, []);

  /**
   * Prop que toma las sedes y las transforma en opciones para el select
   */
  const handle_sedes = () => {
    console.log("ENTRO");
    console.log(state.tabs);
    if (bandera_option === true) {
      for (var i = 0; i < state.tabs["length"]; i++) {
        const dato = {
          value: state.tabs[i]["nombre"],
          label: state.tabs[i]["nombre"],
          id: state.tabs[i]["id"],
        };
        opciones.push(dato);
      }
      bandera_option = false;
    }
  };

  //Estados para Pop Up
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    set_temp({
      ...temp,
      value: e["value"],
      seleccionado: e["label"],
      id: e["id"],
    });
    //Comandos para reconocer qué objeto fue seleccionado
    // set_state({ ...state, seleccionado: e["value"] });
    // set_state({ ...state, seleccionado: e["id"] });
    // console.log(temp.value + "AQUI");
    // console.log(Object.values(e));
    setShow(true);
  };

  //Cambia las sedes para visualizarse
  const handle_storage = () => {
    sessionStorage.setItem("sede", encriptar(temp.value));
    sessionStorage.setItem("sede_id", encriptarInt(temp.id));
    window.location.reload();

    // });
  };
  /*<div
          className="banner"
          style={{ marginTop: 20, marginBottom: 20, marginLeft: 22 }}
        >
          <h1>Ingresaste como admin.</h1>
          <>
            {
              <Container>
                <div className="smolSelect" style={{ width: 300 }}>
                  <Row className="rowJustFlex">
                    <h4>Para cambiar de sede:</h4>
                  </Row>
                  <Row className="rowJustFlex">
                    <Select
                      name="def"
                      class="option"
                      options={opciones}
                      onMenuOpen={handle_sedes}
                      onChange={handleShow}
                      className="option"
                      placeholder="Selecione una sede"
                    />
                  </Row>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Importante</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Está seguro qué desea seleccionar otra sede?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={handle_storage}
                        onClickCapture={handleClose}
                        autoFocus
                      >
                        Cambiar de Sede
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Container>
            }
          </>
          
        </div>*/
  return (
    <Row className="fondo_inicio">
      <Col xs={"12"} md={"6"} className="col_background">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Importante</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro qué desea seleccionar otra sede?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handle_storage}
              onClickCapture={handleClose}
              autoFocus
            >
              Cambiar de Sede
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {(userRole === "super_ases" ||
          userRole === "socioeducativo" ||
          userRole === "socioeducativo_reg") && (
          <Row className="rowJustFlex">
            <h4>Para cambiar de sede:</h4>
          </Row>
        )}
        {(userRole === "super_ases" ||
          userRole === "socioeducativo" ||
          userRole === "socioeducativo_reg") && (
          <Row className="selector_reg">
            {(userRole === "super_ases" ||
              userRole === "socioeducativo" ||
              userRole === "socioeducativo_reg") && (
              <Select
                name="def"
                class="option"
                options={opciones}
                onMenuOpen={handle_sedes}
                onChange={handleShow}
                className="option"
                placeholder="Selecione una sede"
              />
            )}
          </Row>
        )}
        <p className="estilo_bienvenido"> ¡Bienvenido!</p>
        <p className="estilo_sesion">INICIASTE SESIÓN </p>
        <p className="estilo_como">COMO {desplegable}</p>
      </Col>

      <Col style={{ background: "white" }} xs={"12"} md={"6"}>
        <Row>
          <Col xs={"12"} md={"5"} className="botones-container">
            {(userRole === "super_ases" || userRole === "sistemas") && (
              <Link to={`/gestion_usuario_rol`}>
                <img src={boton6} className="boton" alt="/"></img>
              </Link>
            )}
            {(userRole === "dir_academico" ||
              userRole === "dir_programa" ||
              userRole === "vcd_academico" ||
              userRole === "practicante" ||
              userRole === "monitor" ||
              userRole === "profesional" ||
              userRole === "socioeducativo" ||
              userRole === "socioeducativo_reg" ||
              userRole === "super_ases" ||
              userRole === "sistemas") && (
              <Link to={`/ficha_estudiante/sin_seleccion`}>
                <img src={boton9} className="boton" alt="/"></img>
              </Link>
            )}
            {(userRole === "dir_academico" ||
              userRole === "dir_programa" ||
              userRole === "vcd_academico" ||
              userRole === "practicante" ||
              userRole === "monitor" ||
              userRole === "profesional" ||
              userRole === "socioeducativo" ||
              userRole === "socioeducativo_reg" ||
              userRole === "super_ases" ||
              userRole === "sistemas") && (
              <Link to={`/reporte`}>
                <img src={boton15} className="boton" alt="/"></img>
              </Link>
            )}
            {(userRole === "super_ases" || userRole === "sistemas") && (
              <Link to={`/carga_masiva`}>
                <img src={boton21} className="boton" alt="/"></img>
              </Link>
            )}
            {(userRole === "practicante" ||
              userRole === "profesional" ||
              userRole === "socioeducativo" ||
              userRole === "socioeducativo_reg") && (
              <Link to={`/reporte_seguimientos`}>
                <img src={boton17} className="boton" alt="/"></img>
              </Link>
            )}
            {(userRole === "socioeducativo" ||
              userRole === "socioeducativo_reg" ||
              userRole === "profesional") && (
              <Link to={`/sin_seguimientos`}>
                <img src={boton8} className="boton" alt="/"></img>
              </Link>
            )}
            {userRole === "dir_academico" && (
              <Link to={`/academico`}>
                <img src={boton20} className="boton" alt="/"></img>
              </Link>
            )}
            {userRole === "profesor" && (
              <meta http-equiv="Refresh" content="0; url='/academico'" />
            )}
          </Col>

          <Col className="vertical-line-col">
            <div className="vertical"></div>
          </Col>

          <Col xs={"12"} md={"5"} className="botones-container">
            <Link
              to={`https://sistemasases.github.io/rutasdeatencion/`}
              target="_blank"
            >
              <img src={boton1} className="boton" alt="/"></img>
            </Link>
            <Link
              to={`https://asesinteractiva.univalle.edu.co/semaforoalertas/`}
              target="_blank"
            >
              <img src={boton2} className="boton" alt="/"></img>
            </Link>
            <Link
              to={`https://caja-de-herramientas-univalle.vercel.app/`}
              target="_blank"
            >
              <img src={boton3} className="boton" alt="/"></img>
            </Link>
            <Link to={`https://ases.univalle.edu.co/`} target="_blank">
              <img src={boton4} className="boton" alt="/"></img>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Pagina_inicio;
