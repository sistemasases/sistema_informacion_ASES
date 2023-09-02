import React, { useState, } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import App from '../../App.js'
import Footer from '../componentes_generales/footer.jsx';
import Modal from 'react-bootstrap/Modal';
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

const Login_component = () => {

  const [state, set_state] = useState({
    usuario: '',
    contrasena: '',
    logged: '',
    temporal: false,
    errorMessage: '',
  });
  const url = `${process.env.REACT_APP_API_URL}/login`
  const data = {
    'username': state.usuario[0],
    'password': state.contrasena[0]
  };

  const handle_user = (e) => {
    set_state({
      ...state,
      usuario: [e.target.value],
    });
  };

  const handle_password = (e) => {
    set_state({
      ...state,
      contrasena: [e.target.value],
    });
  };

  const handleSendNewData = () => {
    axios.post(url, data)
      .then(res => {

        const encryptedToken = CryptoJS.AES.encrypt(res.data.token, secretKey).toString();
        const encryptedRefreshToken = CryptoJS.AES.encrypt(res.data['refresh-token'], secretKey).toString();
        const encryptedIdUsuario = CryptoJS.AES.encrypt(res.data.user.id.toString(), secretKey).toString();
        const encryptedEmail = CryptoJS.AES.encrypt(res.data.user.email, secretKey).toString();
        const encryptedFirstName = CryptoJS.AES.encrypt(res.data.user.first_name, secretKey).toString();
        const encryptedSede = CryptoJS.AES.encrypt(res.data.user.sede, secretKey).toString();
        const encryptedLastName = CryptoJS.AES.encrypt(res.data.user.last_name, secretKey).toString();
        const encryptedNombreCompleto = CryptoJS.AES.encrypt(res.data.user.nombre_completo, secretKey).toString();
        const encryptedSedeId = CryptoJS.AES.encrypt(res.data.user.sede_id.toString(), secretKey).toString();
        const encryptedRol = CryptoJS.AES.encrypt(res.data.user.rol, secretKey).toString();
        const encryptedIdSemestreActual = CryptoJS.AES.encrypt(res.data.user.id_semestre_actual.toString(), secretKey).toString();
        const encryptedSemestreActual = CryptoJS.AES.encrypt(res.data.user.semestre_actual, secretKey).toString();
        const encryptedUsername = CryptoJS.AES.encrypt(res.data.user.username, secretKey).toString();
        const encryptedPermisos = CryptoJS.AES.encrypt(JSON.stringify(res.data.user.permisos), secretKey).toString();
        const encryptedMessage = CryptoJS.AES.encrypt(res.data.user.message, secretKey).toString();

        sessionStorage.setItem('token', encryptedToken);
        sessionStorage.setItem('refresh-token',encryptedRefreshToken);
        sessionStorage.setItem('id_usuario', encryptedIdUsuario);
        sessionStorage.setItem('email', encryptedEmail);
        sessionStorage.setItem('first_name', encryptedFirstName);
        sessionStorage.setItem('sede', encryptedSede);
        sessionStorage.setItem('last_name', encryptedLastName);
        sessionStorage.setItem('nombre_completo', encryptedNombreCompleto);
        sessionStorage.setItem('sede_id', encryptedSedeId);
        sessionStorage.setItem('rol', encryptedRol);
        sessionStorage.setItem('id_semestre_actual', encryptedIdSemestreActual);
        sessionStorage.setItem('semestre_actual', encryptedSemestreActual);
        sessionStorage.setItem('username', encryptedUsername);
        sessionStorage.setItem('permisos', encryptedPermisos);
        sessionStorage.setItem('message', encryptedMessage);
        set_state({
          ...state,
          logged: encryptedToken,
          temporal: true
        });
      })
      .catch(err => {
        if (err.response.status === 400){
          set_state({
            ...state,
            errorMessage: 'Usuario o contraseña incorrecto', // Mensaje de error personalizado
          });
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSendNewData();
    }
  };
    const [show, setShow] = useState(false);
    const handleModal = () => setShow(true);
    const handleClose = () => setShow(false);
  return (
    <Row>
      {sessionStorage.token === undefined ? (
        <Container className="containerLogin">
          <Row>
            <Col>
              <Row>
                <img src="https://asesinteractiva.univalle.edu.co/semaforoalertas/images/logoasesuv.svg" className='imagen_logo' />
              </Row>
            </Col>
            <Col>
              <div className="formularioLogin">
                <Row className="form_title">
                  <b>Sistema de Información ASES</b>
                </Row>
                {state.errorMessage && <div className="error-message" style={{ marginBottom: '20px' }}>{state.errorMessage}</div>}
                <div className="form_login">
                  <div className="form_group_login">
                    <Form.Control
                      className='form_input_login'
                      id='user'
                      type="text"
                      onChange={handle_user}
                      placeholder=" "
                    />
                    <label className='form_label_login' htmlFor="user">Usuario</label>
                  </div>
                  <div className="form_group_login">
                    <Form.Control
                      className='form_input_login'
                      id='pass'
                      type="password"
                      onChange={handle_password}
                      onKeyDown={handleKeyDown} // Agrega el evento onKeyDown
                      placeholder=" "
                    />
                    <label className='form_label_login' htmlFor="pass">Contraseña</label>
                  </div>
                  <div>
                    <label href="https://www.google.com" onClick={handleModal}>Olvidé mi contraseña</label>
                  </div>
                </div>
                <Row>
                  <Button className='boton_login' onClick={handleSendNewData}>Ingresar</Button>
                </Row>
              </div>
            </Col>
          </Row>

        <Modal show={show} onHide={handleClose} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Importante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Para reportar algún problema al iniciar sesión, comuníquese al correo:
            <br></br>
            <a href="mailto:sistemas.ases@correounivalle.edu.co">sistemas.ases@correounivalle.edu.co</a>
          </Modal.Body>


            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>

        </Modal>
        </Container>
      ) : (
        <App />
      )}
    </Row>
  );
};

export default Login_component;