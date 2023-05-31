import React, {useState} from 'react';
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
  })
  const url = "http://127.0.0.1:8000/login" 
  const data = {
    'username' : state.usuario[0],
    'password' : state.contrasena[0]
  }

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
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('refresh-token', res.data['refresh-token'])
      localStorage.setItem('email', res.data.user.email)
      localStorage.setItem('first_name', res.data.user.first_name)
      localStorage.setItem('sede', res.data.user.sede)
      localStorage.setItem('last_name', res.data.user.last_name)
      localStorage.setItem('nombre_completo', res.data.user.nombre_completo)
      localStorage.setItem('sede_id', res.data.user.sede_id)
      localStorage.setItem('rol', res.data.user.rol)
      localStorage.setItem('semestre_actual', res.data.user.semestre_actual)
      localStorage.setItem('username', res.data.user.username)
      localStorage.setItem('message', res.data.user.message)
      set_state({
        ...state,
        logged:localStorage.token,
      })
    })
    .catch(err=>console.log(err))
    
  }

  return (
    <Row>
      {
        localStorage.token == undefined?
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