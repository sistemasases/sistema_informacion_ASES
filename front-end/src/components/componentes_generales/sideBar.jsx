/**
 * @file sideBar.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de mostrar los menus que se encuentran abiertos segun el rol del usuario
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState } from "react";
import { Container, Row, Button, Modal } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import NavBar from "./navbar";
import Menu from "./menus/sistemas.json";
import Menu2 from "./menus/socioeducativa.json";
import Menu3 from "./menus/academico.json";
import Menu4 from "./menus/monitor.json";
import Menu5 from "./menus/dir_investigacion.json";
import Menu6 from "./menus/ente_academico.json";
import Menu7 from "./menus/sin_rol.json";
import Menu8 from "./menus/practicante.json";
import Menu9 from "./menus/profesor.json";
import Menu10 from "./menus/discapacidad.json";
import Menu11 from "./menus/campus_diverso.json";
import SidebarItem from "./sidebarItem";
import Footer from "./footer";
import Sidebar_item_closed from "./sidebar_item_closed";
import { Scrollbars } from "react-custom-scrollbars";
import axios from "axios";
import {
  decryptTokenFromSessionStorage,
  desencriptar,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad.jsx";

/**
 * Se encarga de gestionar los menus de la barra lateral para cada rol así como verificar el tiempo de sesión de cada usuario
 * @param {Diccionario} props Contiene los menus que son visibles para cada rol
 * @returns renderizado de los menus completamente funcionales
 */
const SideBar = (props) => {
  // Variable de estado que se encarga de abrir y cerrar los menus
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  /**
   * Cierra los menus que se encuentran abiertos si el click es en el exterior del menu
   * @param {Evento} e: Evento que se activa al hacer click fuera del menu
   */
  const outSideClick = (e) => {
    if (isOpen == true) {
      setIsOpen(false);
    }
  };

  //   Variables de estado que almacenan los menus que se encuentran segun el rol del usuario
  const [state, set_state] = useState({
    desplegable:
      desencriptar(sessionStorage.rol) === "sistemas" ||
      desencriptar(sessionStorage.rol) === "super_ases"
        ? Menu
        : desencriptar(sessionStorage.rol) === "socioeducativo_reg" ||
          desencriptar(sessionStorage.rol) === "profesional" ||
          desencriptar(sessionStorage.rol) === "socioeducativo"
        ? Menu2
        : desencriptar(sessionStorage.rol) === "dir_academico"
        ? Menu3
        : desencriptar(sessionStorage.rol) === "monitor"
        ? Menu4
        : desencriptar(sessionStorage.rol) === "dir_investigacion"
        ? Menu5
        : desencriptar(sessionStorage.rol) === "practicante"
        ? Menu8
        : desencriptar(sessionStorage.rol) === "dir_programa" ||
          desencriptar(sessionStorage.rol) === "vcd_academico"
        ? Menu6
        : desencriptar(sessionStorage.rol) === "profesor"
        ? Menu9
        : desencriptar(sessionStorage.rol) === 'CAMPUS DIVERSO' 
        ? Menu11 
        : desencriptar(sessionStorage.rol) === "discapacidad"
        ? Menu10
        : Menu7,
  });

  /**
   * Asigna en la variable state la ruta actual
   * @param {String} name
   */
  function path_actual(name) {
    set_state({
      ...state,
      path_actual: name,
    });
  }

  //   Constante que guarda el tokten de inicio de sesión
  const [data, setData] = useState({
    refreshtoken: desencriptar(sessionStorage.getItem("refresh-token")),
  });

  //  Constante que guarda el estado de la ventana modal
  const [show, setShow] = useState(false);

  //   Funciones que se encargan de abrir la ventana modal
  const handleShow = () => setShow(true);

  /**
   * Función que se encargan de cerrar la ventana modal y limpiar el sessionStorage
   */
  const handleClose = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh-token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("instancia");
    sessionStorage.removeItem("last_name");
    sessionStorage.removeItem("nombre_completo");
    sessionStorage.removeItem("instancia_id");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("semestre_actual");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("message");
    sessionStorage.removeItem("sede_id");
    sessionStorage.removeItem("sede");
    sessionStorage.removeItem("lastVisitedRoutes");
    sessionStorage.removeItem("id_estudiante_seleccionado");
    setShow(false);
    window.location.reload();
  };

  /**
   * Función que se encarga de prolongar la sesión del usuario
   */
  const handleContinue = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/refresh`, data)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        setShow(false);
      })
      .catch((err) => {
        window.alert("Ocurrió un error, debes ingresar nuevamente");
        handleClose();
      });
  };

  //   Constante que guarda la configuración de la petición
  const config = {
    headers: {
      Authorization: "Bearer " + decryptTokenFromSessionStorage(),
    },
  };

  //   Constante que guarda el tiempo de espera
  const tiempoEspera = 1 * 1 * 60 * 1000;

  /**
   * Función que se encarga de verificar el tiempo de sesión del usuario
   */
  const timeoutId = setTimeout(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/wizard/instancia/`, config)
      .then((res) => {})
      .catch((err) => {
        handleShow();
      });
  }, tiempoEspera);

  return (
    <Container className="containerSidebar">
      <Row className="top_selection">
        <FaBars onClick={toggle} />
      </Row>
      {isOpen ? (
        <Row style={{ width: isOpen ? "250px" : "70px" }} className="sideBar">
          <Scrollbars className="scrollbar_sidebar">
            <div className="sidebar_item">
              {state.desplegable.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
            </div>
          </Scrollbars>
        </Row>
      ) : (
        <div class="d-none d-md-block">
          <Row style={{ width: isOpen ? "250px" : "70px" }} className="sideBar">
            <Scrollbars className="scrollbar_sidebar">
              <div className="sidebar_item">
                {state.desplegable.map((item, index) => (
                  <Sidebar_item_closed key={index} item={item} />
                ))}
              </div>
            </Scrollbars>
          </Row>
        </div>
      )}

      <Row className="row_navbar">
        <NavBar
          tamaño={isOpen}
          nombre={props.usuario}
          rol={props.rolUsuario}
        ></NavBar>
      </Row>
      <div class="d-none d-md-block">
        <Row className="inf_der">
          <main
            style={{ marginLeft: isOpen ? "230px" : "50px", marginTop: "5rem" }}
            onClick={outSideClick}
          >
            {props.children}
          </main>
        </Row>
      </div>

      <div class="d-block d-md-none">
        <Row className="inf_der">
          <main style={{ marginTop: "4rem" }}>{props.children}</main>
        </Row>
      </div>

      <div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Tiempo de sesión expirada</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Su tiempo en la sesión ya expiró
            <br />
            ¿Desea continuar con la sesión?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleContinue}>
              Sí
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Footer></Footer>
    </Container>
  );
};

export default SideBar;
