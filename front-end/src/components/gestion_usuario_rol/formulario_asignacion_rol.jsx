import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import all_rols_service from '../../service/all_rols'
import asignar_rol_service from '../../service/asignar_rol'
const formulario_asginacion_rol = () =>{

  const[switchChecked, setChecked] = useState(false);
  

  const [state,set_state] = useState({
    file: null,
    option : '',
  })
  const handle_file = (e) => {
    // Getting the files from the input
    console.log(e.target.files[0])
    set_state({
      ...state,
      [e.target.name] : [e.target.files[0]],
    })
  }
  const handle_options = (e) => {
    // Getting the files from the input
    console.log(e.target.value)
    set_state({
      ...state,
      [e.target.name] : [e.target.value]
    })
  }
  const handle_upload=(e)=> {
    let file = [state.file];
    let option = [state.option];

    all_rols_service.all_rols();
  }

  return (
        <Container>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Row className="rowJustFlex">
                <h3>Nombre Completo</h3>
            </Row>
            <Row className="rowJustFlex">
                <h3>Nombre Completo</h3>
            </Row>
            <Row className="rowJustFlex">
                <h3>Rol</h3>
            </Row>

            <Row className="rowJustFlex">
                <Form.Select name= "option" onChange={handle_options} >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Usuarios">Usuarios</option>
                  <option value="Materias">Materias</option>
                  <option value="Notas">Notas</option>
                  <option value="Resolución">Resolución</option>
                  <option value="Programa">Programa</option>
                  <option value="Retiros">Retiros</option>
                </Form.Select>
            </Row>
            <Row className="rowJustFlex">
                <Col>
                    <Button onClick={handle_upload}>Aceptar</Button> 
                </Col>
                <Col>
                    <Button onClick={handle_upload}>Cancelar</Button> 
                </Col>
                 
            </Row>
        </Container>
  )
}

export default formulario_asginacion_rol


  
  
  
