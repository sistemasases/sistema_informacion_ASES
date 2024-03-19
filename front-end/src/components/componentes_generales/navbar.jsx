import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import Logos from "./LOGO BLANCORecurso 1.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button, ListGroupItem } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  encriptar,
  desencriptar,
  decryptTokenFromSessionStorage,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
// import { Contador_alertas } from "../../modulos/alertas/contador_alertas";
import {Contador_alertas} from "../../modulos/alertas/contador_alertas";

const Navbar = (props) => {
  const decryptToken = decryptTokenFromSessionStorage();
  const location = useLocation();
  const [lastVisitedRoutes, setLastVisitedRoutes] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + decryptToken,
    },
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const storedRoutes = sessionStorage.getItem("lastVisitedRoutes");
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

  const getSegmentsFromUrl = (url) => {
    const segments = url.split("/");
    return segments.slice(1, 2); // Obtener el cuarto segmento (índice 3)
  };

  const handleSalir = () => {
    sessionStorage.clear();
    window.location.replace("");
  };

  const [show, setShow] = useState(false);
  const handleModal = () => setShow(true);
  const handleClose = () => setShow(false);

  const getTitleFromUrl = (url) => {
    const segments = url.split("/");
    const lastSegment = segments.slice(1)[2]; // Obtener el último segmento
    return lastSegment.replaceAll("_", " "); // Reemplazar "_" por " "
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setActualPassword] = useState("");

  const actualPassword = (event) => {
    setActualPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // const handleSalir = () =>{
  //     sessionStorage.removeItem('token')
  //     sessionStorage.removeItem('refresh-token')
  //     sessionStorage.removeItem('email')
  //     sessionStorage.removeItem('first_name')
  //     sessionStorage.removeItem('instancia')
  //     sessionStorage.removeItem('last_name')
  //     sessionStorage.removeItem('nombre_completo')
  //     sessionStorage.removeItem('instancia_id')
  //     sessionStorage.removeItem('rol')
  //     sessionStorage.removeItem('semestre_actual')
  //     sessionStorage.removeItem('username')
  //     sessionStorage.removeItem('message')
  //     window.location.replace('');
  // }
  const cambiar_contra_funcion = () => {
    const decryptedUserId = desencriptar(sessionStorage.getItem("id_usuario"));
    const url = `${process.env.REACT_APP_API_URL}/change_password`;
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
  const decryptNombreCompleto = desencriptar(
    sessionStorage.getItem("nombre_completo")
  );
  const decryptRol = desencriptar(sessionStorage.getItem("rol"));
  const decryptSede = desencriptar(sessionStorage.getItem("sede"));
  let navigate = useNavigate();
  return (
    <Container>
      <Row className="nav">
        <Col xs={"5"} md={"2"} href={"/"}>
          <Link to={`/`}>
            <img src={Logos} className="logo" alt="/"></img>
          </Link>
        </Col>

        <div class="d-none d-md-inline col-md-5">
          <Col className="ulDropdown">
            <Row>
              {/* Aquí se mostrarían las últimas rutas visitadas en orden inverso */}
              {lastVisitedRoutes.reverse().map((url, index) => (
                <Col key={index} md={"4"} className="col_historial">
                  <a href={url} className="col_historial_item">
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
                  <a href="/alertas">
                    <i class="bi bi-exclamation-diamond" href="/alertas"></i>
                  </a>
                </Col>
                <Col md={"1"} className="alert_counter">
                  {" "}
                  <a href="/alertas" className="inner-counter">
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
