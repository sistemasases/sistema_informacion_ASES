import React, { useState, } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import App from '../../App.js'
import CryptoJS from 'crypto-js';
import Footer from '../componentes_generales/footer.jsx';

const Login_component = () => {

  const secretKey = process.env.REACT_APP_SECRET_KEY;

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

     // Encriptar los datos antes de almacenarlos en sessionStorage
    const encryptedUsuario = CryptoJS.AES.encrypt(state.usuario, secretKey).toString();
    const encryptedContrasena = CryptoJS.AES.encrypt(state.contrasena, secretKey).toString();

    sessionStorage.setItem('usuario', encryptedUsuario);
    sessionStorage.setItem('contrasena', encryptedContrasena);

    const data = {
      'username': state.usuario,
      'password': state.contrasena
    };

    const handleRetrieveData = () => {
      // Desencriptar los datos almacenados en sessionStorage
    const encryptedUsuario = sessionStorage.getItem('usuario');
    const encryptedContrasena = sessionStorage.getItem('contrasena');
      
      if (encryptedUsuario && encryptedContrasena) {
        const decryptedUsuario = CryptoJS.AES.decrypt(sessionStorage.usuario, secretKey).toString(CryptoJS.enc.Utf8);
        const decryptedContrasena = CryptoJS.AES.decrypt(sessionStorage.contrasena, secretKey).toString(CryptoJS.enc.Utf8);

       // Utiliza los datos descifrados como necesites
       
      }
    };




    //const encryptedRequest = {
      //encryptedData: encryptedData
    //};
    
    axios.post(url, data)
      .then(res => {
        console.log(res.data)
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('refresh-token', res.data['refresh-token']);
        sessionStorage.setItem('id_usuario', res.data.user.id);
        sessionStorage.setItem('email', res.data.user.email);
        sessionStorage.setItem('first_name', res.data.user.first_name);
        sessionStorage.setItem('sede', res.data.user.sede);
        sessionStorage.setItem('last_name', res.data.user.last_name);
        sessionStorage.setItem('nombre_completo', res.data.user.nombre_completo);
        sessionStorage.setItem('sede_id', res.data.user.sede_id);
        sessionStorage.setItem('rol', res.data.user.rol);
        sessionStorage.setItem('semestre_actual', res.data.user.semestre_actual);
        sessionStorage.setItem('username', res.data.user.username);
        sessionStorage.setItem('permisos', res.data.user.permisos);
        sessionStorage.setItem('message', res.data.user.message);
        set_state({
          ...state,
          logged: sessionStorage.token,
          temporal: true
        });
      })
      .catch(err => {
        console.log(err)
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
                    <label href="https://www.google.com">Olvidé mi contraseña</label>
                  </div>
                </div>
                <Row>
                  <Button className='boton_login' onClick={handleSendNewData}>Ingresar</Button>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <App />
      )}
    </Row>
  );
};

export default Login_component;