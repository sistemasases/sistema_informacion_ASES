import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import all_user_service from '../../service/all_users'
const selector_usuarios = () =>{

  const[switchChecked, setChecked] = useState(false);
  

  const [state,set_state] = useState({
    file: null,
    option : '',
  })

  const handle_options = (e) => {
    // Getting the files from the input
    console.log(e.target.value)
    set_state({
      ...state,
      [e.target.name] : [e.target.value]
    })
  }
  const handle_upload = (e) => {
    // Getting the files from the input
    console.log(e.target.value)
    set_state({
      ...state,
      [e.target.name] : [e.target.value]
    })
  }
  return (
        <Container>
            <Row className="rowJustFlex">
              <Col>
                <Form.Select name= "option" onChange={handle_options} >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Usuarios">Usuarios</option>
                  <option value="Materias">Materias</option>
                  <option value="Notas">Notas</option>
                  <option value="Resolución">Resolución</option>
                  <option value="Programa">Programa</option>
                  <option value="Retiros">Retiros</option>
                </Form.Select>
              </Col>
              <Col>
                <Button onClick={handle_upload}>Buscar</Button> 
              </Col>
                
            </Row>
        </Container>
  )
}

export default selector_usuarios


  
  
  
