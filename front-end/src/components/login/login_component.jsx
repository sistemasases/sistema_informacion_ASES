import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const login_component = () =>{

  const [state,set_state] = useState({
    usuario: '',
    contrasena: '',
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
    })
    .catch(err=>console.log(err))
  }

  // return (
  //   <div className="Auth-form-container">
  //     <form className="Auth-form">
  //       <div className="Auth-form-content">
  //         <h3 className="Auth-form-title">Sign In</h3>
  //         <div className="form-group mt-3">
  //           <label>Usuario</label>
  //           <input
  //             type="text"
  //             className="form-control mt-1"
  //             placeholder="Escribe tu usuario"
  //           />
  //         </div>
  //         <div className="form-group mt-3">
  //           <label>Password</label>
  //           <input
  //             type="password"
  //             className="form-control mt-1"
  //             placeholder="Escribe tu contraseña"
  //           />
  //         </div>
  //         <div className="d-grid gap-2 mt-3">
  //           <button onClick={handleSendNewData} className="btn btn-primary">
  //             Submit
  //           </button>
  //           <a href={"/ficha_estudiante"}  className="sidebar-item">
  //               <span className="tamaño_icon">aqui</span>
  //           </a>
  //         </div>
  //         <p className="forgot-password text-right mt-2">
  //           Forgot <a href="#">password?</a>
  //         </p>
  //       </div>
  //     </form>
  //   </div>
  // )

  return (
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
}

export default login_component