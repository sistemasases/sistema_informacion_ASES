<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from "react-bootstrap";
=======
import React, { useState, } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, } from "react-bootstrap";
>>>>>>> Desarrollo
import Form from 'react-bootstrap/Form';
import App from '../../App.js'
import Footer from '../componentes_generales/footer.jsx';
import { AES } from 'crypto-js';

const Login_component = () => {

  const [state, set_state] = useState({
    usuario: '',
    contrasena: '',
    logged: '',
<<<<<<< HEAD
    temporal: false
  })
  const url = "http://127.0.0.1:8000/login"
  const data = {
    'username': state.usuario[0],
    'password': state.contrasena[0]
  }

  useEffect(() => {
    const tiempoEspera = 1 * 10 * 60 * 1000; // en milisegundos

    // Programar la eliminación después del tiempo especificado
    const timeoutId = setTimeout(() => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('refresh-token')
      sessionStorage.removeItem('email')
      sessionStorage.removeItem('first_name')
      sessionStorage.removeItem('instancia')
      sessionStorage.removeItem('last_name')
      sessionStorage.removeItem('nombre_completo')
      sessionStorage.removeItem('instancia_id')
      sessionStorage.removeItem('rol')
      sessionStorage.removeItem('semestre_actual')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('message')
    }, tiempoEspera);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
=======
    temporal: false,
    errorMessage: '',
  });

  const url = "http://127.0.0.1:8000/login";
  const data = {
    'username': state.usuario[0],
    'password': state.contrasena[0]
  };
>>>>>>> Desarrollo

  const handle_user = (e) => {
    set_state({
      ...state,
      usuario: [e.target.value],
<<<<<<< HEAD
    })
=======
    });
  };
>>>>>>> Desarrollo

  const handle_password = (e) => {
    set_state({
      ...state,
      contrasena: [e.target.value],
<<<<<<< HEAD
    })
=======
    });
  };
>>>>>>> Desarrollo

  const handleSendNewData = () => {
    axios.post(url, data)
      .then(res => {
        console.log(res.data)
<<<<<<< HEAD
        sessionStorage.setItem('token', 'superAses')
        sessionStorage.setItem('refresh-token', AES.encrypt(res.data['refresh-token'], 'refresh-token'))
        sessionStorage.setItem('email', AES.encrypt(res.data.user.email, 'email'))
        sessionStorage.setItem('first_name', AES.encrypt((res.data.user.first_name, 'first_name')))
        sessionStorage.setItem('sede', AES.encrypt(res.data.user.sede, 'sede'))
        sessionStorage.setItem('last_name', AES.encrypt(res.data.user.last_name, 'last_name'))
        sessionStorage.setItem('nombre_completo', AES.encrypt(res.data.user.nombre_completo, 'nombre_completo'))
        sessionStorage.setItem('sede_id', AES.encrypt(res.data.user.sede_id, 'sede_id'))
        sessionStorage.setItem('rol', AES.encrypt('superAses', 'rol'))
        sessionStorage.setItem('semestre_actual', AES.encrypt(res.data.user.semestre_actual, 'semestre_actual'))
        sessionStorage.setItem('username', AES.encrypt(res.data.user.username, 'username'))
        sessionStorage.setItem('message', AES.encrypt(res.data.user.message, 'message'))
=======
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('refresh-token', res.data['refresh-token']);
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
>>>>>>> Desarrollo
        set_state({
          ...state,
          logged: sessionStorage.token,
          temporal: true
<<<<<<< HEAD
        })
      })
      .catch(err => console.log(err))

  }

  return (
    <Row>
      {
        sessionStorage.token == undefined ?
          (
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
                    <div className="form_login">
                      <div className="form_group_login">
                        <Form.Control className='form_input_login' id='user' type="text" onChange={handle_user} placeholder=" " />
                        <label className='form_label_login' for="user">Usuario</label>
                      </div>
                      <div className="form_group_login">
                        <Form.Control className='form_input_login' id='pass' type="password" onChange={handle_password} placeholder=" " />
                        <label className='form_label_login' for="pass">Contraseña</label>
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
          )
          :
          (
            <App />
          )
      }
=======
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
>>>>>>> Desarrollo
    </Row>
  );
};

export default Login_component;
