/**
 * @file login_component.jsx
 * @version 1.0.0
 * @description Logica para el inicio de sesión y guardar la información del usuario en el session storage.
 * @author Deiby A. Rodriguez R.
 * @contact deiby.rodriguez@correounivalle.edu.co
 * @date 13 de febrero del 2024
 */

import {
  encriptar,
  encriptarJson,
  encriptarInt,
  encriptarBigInt,
} from "../../modulos/utilidades_seguridad/utilidades_seguridad";
import { Container, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { set } from "date-fns";
import { GoogleLogin } from "@react-oauth/google";
import TFA from "../2fa_login/two_fa_login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login_component = () => {
  // información para el inicio de usuario

  const [state, set_state] = useState({
    usuario: "",
    contrasena: "",
    logged: "",
    temporal: false,
    errorMessage: "",
  });
  const url = `${process.env.REACT_APP_API_URL}/login`;
  const data = {
    username: state.usuario[0],
    password: state.contrasena[0],
  };
  /**
   * Función para cambiar el estado del nombre de usuario.
   * @param {Event} e Información del nombre del usuario.
   */
  const handle_user = (e) => {
    set_state({
      ...state,
      usuario: [e.target.value],
    });
  };
  /**
   * Función para cambiar el estado de la constaseña del usuario.
   * @param {Event} e Información de la contraseña del usuario.
   */
  const handle_password = (e) => {
    set_state({
      ...state,
      contrasena: [e.target.value],
    });
  };
  /**
   * Función para obtener toda la información del usuario y lo almacena en el session storage.
   */
  const handleSendNewData = () => {
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        const encryptedToken = encriptar(res.data.token);
        const encryptedRefreshToken = encriptar(res.data.refresh_token);
        const encryptedIdUsuario = encriptarBigInt(res.data.user.id);
        const encryptedEmail = encriptar(res.data.user.email);
        const encryptedFirstName = encriptar(res.data.user.first_name);
        const encryptedSede = encriptar(res.data.user.sede);
        const encryptedLastName = encriptar(res.data.user.last_name);
        const encryptedNombreCompleto = encriptar(
          res.data.user.nombre_completo
        );
        const encryptedSedeId = encriptarInt(res.data.user.sede_id);
        const encryptedRol = encriptar(res.data.user.rol);
        const encryptedIdSemestreActual = encriptarInt(
          res.data.user.id_semestre_actual
        );
        const encryptedSemestreActual = encriptar(
          res.data.user.semestre_actual
        );
        const encryptedUsername = encriptar(res.data.user.username);
        const encryptedPermisos = encriptarJson(res.data.user.permisos);
        const encryptedMessage = encriptar(res.data.message);
        const encryptedPath = encriptar("/");
        sessionStorage.setItem("token", encryptedToken);
        sessionStorage.setItem("refresh-token", encryptedRefreshToken);
        sessionStorage.setItem("id_usuario", encryptedIdUsuario);
        sessionStorage.setItem("email", encryptedEmail);
        sessionStorage.setItem("first_name", encryptedFirstName);
        sessionStorage.setItem("sede", encryptedSede);
        sessionStorage.setItem("last_name", encryptedLastName);
        sessionStorage.setItem("nombre_completo", encryptedNombreCompleto);
        sessionStorage.setItem("sede_id", encryptedSedeId);
        sessionStorage.setItem("rol", encryptedRol);
        sessionStorage.setItem("id_semestre_actual", encryptedIdSemestreActual);
        sessionStorage.setItem("semestre_actual", encryptedSemestreActual);
        sessionStorage.setItem("username", encryptedUsername);
        sessionStorage.setItem("permisos", encryptedPermisos);
        sessionStorage.setItem("message", encryptedMessage);
        sessionStorage.setItem("path", encryptedPath);
        set_state({
          ...state,
          logged: encryptedToken,
          temporal: true,
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          set_state({
            ...state,
            errorMessage: "Usuario o contraseña incorrecto", // Mensaje de error personalizado
          });
        }
      });
  };
  /**
   * Función para poder utilizar el enter en el pantalla de login
   * @param {Event} e Información con la tecla que está tocando.
   */
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSendNewData();
    }
  };
  // Constante para ver y cerrar el modal
  const [show, setShow] = useState(false);
  /**
   * Función para abrir el modal, cambiando el show a true.
   */
  const handleModal = () => setShow(true);
  /**
   * Función para abrir el modal, cambiando el show a false.
   */
  const handleClose = () => setShow(false);

  const [mail, setMail] = useState("");
  // const [show, setShow] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const enviar_correos_not_w = () => {
    // console.log("enviar correos");
    // console.log("HOLAAA");
    // console.log(mail);

    // setShow(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/correos/enviar_correo_cambio_contra/`,
        {
          params: { mail: mail.correo },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMailSent(true);
        if (mailSent) {
          alert("Correo enviado correctamente");
          handleClose();
        }
      })
      .catch((err) => {
        // console.log(err.response);
        setMailSent(false);
        if (!mailSent) {
          alert(err.response.data.error);
        }
      });
  };

  const handleForfottenPassword = (e) => {
    console.log(e.target.value);
    setMail({
      ...mail,
      correo: e.target.value,
    });
  };

  // const handleClose = () => setShow(false);
  return (
    <Row>
      {sessionStorage.token === undefined ? (
        <Container className="containerLogin">
          <Row>
            <Col>
              <Row>
                <img
                  src="https://asesinteractiva.univalle.edu.co/semaforoalertas/images/logoasesuv.svg"
                  className="imagen_logo"
                />
              </Row>
            </Col>
            <Col>
              <div className="formularioLogin">
                <Row className="form_title">
                  <b>Sistema de Información ASES</b>
                </Row>
                {state.errorMessage && (
                  <div
                    className="error-message"
                    style={{ marginBottom: "20px" }}
                  >
                    {state.errorMessage}
                  </div>
                )}
                <div className="form_login">
                  <div className="form_group_login">
                    <Form.Control
                      className="form_input_login"
                      id="user"
                      type="text"
                      onChange={handle_user}
                      placeholder=" "
                    />
                    <label className="form_label_login" htmlFor="user">
                      Usuario
                    </label>
                  </div>
                  <div className="form_group_login">
                    <Form.Control
                      className="form_input_login"
                      id="pass"
                      type="password"
                      onChange={handle_password}
                      onKeyDown={handleKeyDown} // Agrega el evento onKeyDown
                      placeholder=" "
                    />
                    <label className="form_label_login" htmlFor="pass">
                      Contraseña
                    </label>
                  </div>
                  <div>
                    <label href="https://www.google.com" onClick={handleModal}>
                      Olvidé mi contraseña
                    </label>
                  </div>
                </div>
                <Row>
                  <Button className="boton_login" onClick={handleSendNewData}>
                    Ingresar
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
          <Modal
            id={"modal_password"}
            name={"modal_password"}
            show={show}
            onHide={handleClose}
            size={"md"}
          >
            <Modal.Header closeButton>
              <Modal.Title>Reestablecimiento de contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontFamily: "cursive", fontSize: "1.1em" }}>
                Por favor ingrese su correo electrónico registrado. Recibirá una
                contraseña temporal para iniciar sesión y cambiarla por una
                segura.
              </p>

              <Form.Group>
                <Row>
                  <Col xs={8}>
                    <Form.Control
                      style={{
                        marginTop: "10px",
                        width: "100%",
                      }}
                      type="text"
                      placeholder="Correo"
                      onChange={(e) => {
                        handleForfottenPassword(e);
                      }}
                    />
                  </Col>
                  <Col xs={4}>
                    <Button
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        height: "80%",
                      }}
                      type="submit"
                      // value="Enviar"
                      variant="primary"
                      onClick={enviar_correos_not_w}
                    >
                      Envíar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : (
        <TFA />
      )}
    </Row>
  );
};

export default Login_component;
