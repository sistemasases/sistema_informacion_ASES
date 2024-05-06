/**
 * @file navbar.jsx
 * @version 1.0.0
 * @description Este archivo se encarga de renderizar el footer de la página web
 * @author Componente Sistemas ASES
 * @contact sistemas.ases@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import Logos from "./LOGO BLANCORecurso 1.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";
import {
  encriptar,
  desencriptar,
  decryptTokenFromSessionStorage,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { Contador_alertas } from "../../modulos/alertas/contador_alertas";

/**
 * Se encarga de renderizar el navbar de la página web, conteniendo el historial de rutas visitadas, alertas,
 * opciones de usuario e información de perfil
 * @param {Diccionario} props
 * @returns Renderizado de la navbar
 */
const Navbar = (props) => {
  // Variables de utilidades
  const decryptToken = decryptTokenFromSessionStorage();
  const location = useLocation();
  // Variables de estado para las rutas visitadas
  const [lastVisitedRoutes, setLastVisitedRoutes] = useState([]);
  // Configuración de la petición
  const config = {
    headers: {
      Authorization: "Bearer " + decryptToken,
    },
  };

  /**
   * Se encarga de obtener las rutas visitadas y almacenarlas en sessionStorage permitiendo la navegación entre rutas
   */
  useEffect(() => {
    // Obtener la ruta actual
    const currentUrl = desencriptar(sessionStorage.getItem('path'));
    // Obtener las rutas almacenadas en sessionStorage
    const storedRoutes = sessionStorage.getItem("lastVisitedRoutes");
    // Arreglo para actualizar las rutas
    let updatedRoutes = [];

    if (storedRoutes) {
      updatedRoutes = JSON.parse(storedRoutes);

      if (updatedRoutes.includes(currentUrl)) {
        const index = updatedRoutes.indexOf(currentUrl);
        updatedRoutes.splice(index, 1);
      }

      updatedRoutes.unshift(currentUrl);
      if (updatedRoutes.length > 3) {
        updatedRoutes.pop();
      }
    } else {
      updatedRoutes = [currentUrl];
    }

    sessionStorage.setItem("lastVisitedRoutes", JSON.stringify(updatedRoutes));
    setLastVisitedRoutes(updatedRoutes.reverse());
  }, [location]);

  /**
   * Función para cerrar sesión
   */
  const handleSalir = () => {
    sessionStorage.clear();
    window.location.replace("");
  };

  // Variables de estado para el modal de cambio de contraseña
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(true);
  const handleClose = () => setShow(false);

  /**
   * Función para obtener el título de la ruta
   * @param {String} url url de la ruta actual
   * @returns Ultima ruta de manera legible para los usuarios
   */
  const getTitleFromUrl = (url) => {
    const segments = url.split("/");
    return segments[1].replaceAll("_", " "); // Reemplazar "_" por " "
  };

  // Variables de estado para el cambio de contraseña
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setActualPassword] = useState("");

  /**
   * Funciones para el cambio de contraseña
   * @param {Evento} event captura la contraseña actual
   */
  const actualPassword = (event) => {
    setActualPassword(event.target.value);
  };

  /**
   * Función para el cambio de contraseña
   * @param {Evento} event Captura la nueva contraseña
   */
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  /**
   * Función para el cambio de contraseña
   * @param {Evento} event Confirma la nueva contraseña
   */
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Variables de estado para el desplegable de usuario
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  /**
   * Función que se encarga de cambiar la contraseña del usuario
   * @returns Cambia la contraseña del usuario
   */
  const cambiar_contra_funcion = () => {
    // Desencriptar el id del usuario
    const decryptedUserId = desencriptar(sessionStorage.getItem("id_usuario"));
    // Configuración de la petición
    const url = `${process.env.REACT_APP_API_URL}/change_password`;
    // Datos de la petición
    const data = {
      user_id: decryptedUserId,
      contraseña: password,
      new_contraseña: newPassword,
    };

    axios
      .post(url, data, config)
      .then((res) => {
        alert("Contraseña actualizada.");
        handleClose();
      })
      .catch((err) => alert("ERROR en la actualización."));
  };
  // Desencriptar los datos del usuario
  const decryptNombreCompleto = desencriptar(
    sessionStorage.getItem("nombre_completo")
  );
  const decryptRol = desencriptar(sessionStorage.getItem("rol"));
  const decryptSede = desencriptar(sessionStorage.getItem("sede"));

  /**
   * @function cambiar_ruta
   * @param e Es el nombre de la ruta
   * @description Cambia la vista según los links seleccionados
  */
  const cambiar_ruta = (e) => {
    sessionStorage.setItem("path", encriptar(e));
    window.location.reload();
  };

  return (
    <Container>
      <Row className="nav">
        <Col xs={"5"} md={"2"} href={"/"}>
          <img src={Logos} className="logo" alt="/" onClick={() => cambiar_ruta("/")}></img>
        </Col>

        <div class="d-none d-md-inline col-md-5">
          <Col className="ulDropdown">
            <Row>
              {/* Aquí se mostrarían las últimas rutas visitadas en orden inverso */}
              {lastVisitedRoutes.reverse().map((url, index) => (
                <Col key={index} md={"4"} className="col_historial">
                  <a onClick={() => cambiar_ruta(url)} className="col_historial_item">
                    {getTitleFromUrl(url) === ""
                      ? "Inicio"
                      : getTitleFromUrl(url)}
                  </a>
                  <i class="bi bi-chevron-right"></i>
                </Col>
              ))}
            </Row>
          </Col>
        </div>

        <Col md={"1"} xs={"1"} className="alert_icon">
          <Row>
            {decryptRol === "super_ases" ||
            decryptRol === "sistemas" ||
            decryptRol === "monitor" ||
            decryptRol === "practicante" ||
            decryptRol === "profesional" ||
            decryptRol === "socioeducativo" ||
            decryptRol === "socioeducativo_reg" ? (
              // <i class="bi bi-exclamation-diamond-fill"></i>
              <>
                <Col md={"4"}>
                  <a onClick={()=>cambiar_ruta("/alertas")}>
                    <i class="bi bi-exclamation-diamond" onClick={()=>cambiar_ruta("/alertas")}></i>
                  </a>
                </Col>
                <Col md={"1"} className="alert_counter">
                  {" "}
                  <a onClick={()=>cambiar_ruta("/alertas")} className="inner-counter">
                    <Contador_alertas></Contador_alertas>
                  </a>
                </Col>
              </>
            ) : (
              ""
            )}
          </Row>
        </Col>

        <Col className="boton_perfil" xs={"7"} md={"3"}>
          <Row>
            <Col xs={"7"} md={"7"} className="info_perfil">
              <Row>{decryptNombreCompleto} </Row>
              <Row>{decryptRol + " - " + decryptSede}</Row>
              {/* <Row>{}</Row> */}
            </Col>

            <Col xs={"5"} md={"5"}>
              <Row onClick={toggle} className="desplegable_usuario">
                <Col xs={"10"} md={"6"} className="boton_usuario">
                  <i class="bi bi-person-circle"></i>
                </Col>
                {isOpen ? (
                  <div class="d-none d-md-inline col-md-5">
                    <Col className="flecha_usuario">
                      <i class="bi bi-caret-up-fill"></i>
                    </Col>
                  </div>
                ) : (
                  <div class="d-none d-md-inline col-md-5">
                    <Col className="flecha_usuario">
                      <i class="bi bi-caret-down-fill"></i>
                    </Col>
                  </div>
                )}
              </Row>

              {isOpen ? (
                <Row className="opciones_usuario">
                  <Col
                    xs={"12"}
                    className="opciones_usuario_contrase"
                    onClick={handleModal}
                  >
                    CAMBIAR CONTRASEÑA
                  </Col>
                  <Col
                    xs={"12"}
                    className="opciones_usuario_salir"
                    onClick={handleSalir}
                  >
                    SALIR
                  </Col>
                </Row>
              ) : (
                <Row></Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Importante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Contraseña actual :{" "}
          <input onChange={actualPassword} type="password"></input>
          <br></br>
          <br></br>
          <br></br>
          Nueva contraseña :{" "}
          <input onChange={handleNewPasswordChange} type="password"></input>
          <br></br>
          <br></br>
          Confirme contraseña :{" "}
          <input onChange={handleConfirmPasswordChange} type="password"></input>
          {newPassword !== confirmPassword && (
            <p style={{ color: "red" }}>Las contraseñas no coinciden</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cambiar_contra_funcion}
            disabled={newPassword !== confirmPassword}
          >
            Aceptar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Navbar;
