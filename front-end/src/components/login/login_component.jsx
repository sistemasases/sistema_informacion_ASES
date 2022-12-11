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
    logged:true,
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
      localStorage.setItem('instancia', res.data.user.instancia)
      localStorage.setItem('last_name', res.data.user.last_name)
      localStorage.setItem('nombre_completo', res.data.user.nombre_completo)
      localStorage.setItem('instancia_id', res.data.user.instancia_id)
      localStorage.setItem('rol', res.data.user.rol)
      localStorage.setItem('semestre_actual', res.data.user.semestre_actual)
      localStorage.setItem('username', res.data.user.username)
      localStorage.setItem('message', res.data.user.message)
    })
    .catch(err=>console.log(err))
    set_state({
      ...state,
      logged:false,
    })
  }

  return (
    <Row>
      {
        state.logged ?
        (
          <Container>
            <Row className="g-2">
              <h3>Sing In</h3>
            </Row>
            <Row className="g-2">
              <h6>Usuario:</h6>
            </Row>
            <Row className="g-2">
              <Form.Control type="text" onChange={handle_user} />
            </Row>
            <Row className="g-2">
              <h6>Contraseña:</h6>
            </Row>
            <Row className="g-2">
              <Form.Control type="password" onChange={handle_password}  />
            </Row>
            <Row className='mt-2'> 
              <Button onClick={handleSendNewData}>Ingresar</Button> 
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