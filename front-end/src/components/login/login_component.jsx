import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import App from '../../App.js'
import Footer from '../componentes_generales/footer.jsx';

const login_component = () =>{

  const [state,set_state] = useState({
    usuario: '',
    contrasena: '',
    logged:'',
    temporal:false
  })
  const url = "http://127.0.0.1:8000/login" 
  const data = {
    'username' : state.usuario[0],
    'password' : state.contrasena[0]
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

  const handle_user = (e) => {
    set_state({
      ...state,
      usuario : [e.target.value],
    })

  }
  const handle_password = (e) => {
    console.log(e)
    set_state({
      ...state,
      contrasena : [e.target.value],
    })

  }
  const handleSendNewData = () => {
    axios.post(url, data)
    .then(res=>{
      console.log(res.data)
      sessionStorage.setItem('token', 'superAses')
      sessionStorage.setItem('refresh-token', res.data['refresh-token'])
      sessionStorage.setItem('email', res.data.user.email)
      sessionStorage.setItem('first_name', res.data.user.first_name)
      sessionStorage.setItem('sede', res.data.user.sede)
      sessionStorage.setItem('last_name', res.data.user.last_name)
      sessionStorage.setItem('nombre_completo', res.data.user.nombre_completo)
      sessionStorage.setItem('sede_id', res.data.user.sede_id)
      sessionStorage.setItem('rol', 'superAses')
      sessionStorage.setItem('semestre_actual', res.data.user.semestre_actual)
      sessionStorage.setItem('username', res.data.user.username)
      sessionStorage.setItem('message', res.data.user.message)
      set_state({
        ...state,
        logged:sessionStorage.token,
        temporal:true
      })
    })
    .catch(err=>console.log(err))
    
  }

  return (
    <Row>
      {
        sessionStorage.token == undefined  && state.temporal ?
        (
          <Container className="containerLogin">
            <Row>
            <Col>
              <Row>
                <img src="https://asesinteractiva.univalle.edu.co/semaforoalertas/images/logoasesuv.svg" className='imagen_logo'/>
              </Row>
            </Col>
            <Col>
              <div className="formularioLogin">
                <Row className="form_title">
                  <b>Sistema de Información ASES</b>
                </Row>
                <div className="form_login">
                  <div className="form_group_login">
                    <Form.Control className='form_input_login' id='user' type="text" onChange={handle_user} placeholder=" "/>
                    <label className='form_label_login' for="user">Usuario</label>
                  </div>
                  <div className="form_group_login">
                    <Form.Control className='form_input_login' id='pass' type="password" onChange={handle_password} placeholder=" "/>
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
          <App/>
        )
      } 
    </Row>
  )
}

export default login_component