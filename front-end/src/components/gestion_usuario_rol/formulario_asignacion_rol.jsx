import React, {useState} from 'react';
import {Container, Row, Col, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import all_rols_service from '../../service/all_rols';

const Formulario_asginacion_rol = () =>{

  const[switchChecked, setChecked] = useState(false);
  

  const [state,set_state] = useState({
    file: null,
    seleccionado : 'ejemplo',
  })
  const handle_file = (e) => {
    // Getting the files from the input
    set_state({
      ...state,
      [e.target.name] : [e.target.files[0]],
    })
  }
  const handle_options = (e) => {
    // Getting the files from the input
    set_state({
      ...state,
      [e.target.name] : [e.target.value],
      seleccionado : [e.target.value],
    })
  }
  const handle_upload=(e)=> {
    let file = [state.file];
    let option = [state.option];

    all_rols_service.all_rols();
  }

  return (
        <Container>
            <Row className="g-2">
                <h3>Nombre Completo</h3>
            </Row>
            <Row className="g-2">
                <Form.Control as="textarea" value={state.seleccionado}  rows={1} readOnly/>
            </Row>
            <Row className="g-2">
                <h3>Rol</h3>
            </Row>

            <Row className="g-2" >
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
            <Row className='mt-2'> 
                <Col lg={{ span: 1, offset: 5}}>
                    <Button onClick={handle_upload}>Aceptar</Button> 
   
                </Col>
                <Col>

                    <Button onClick={handle_upload}>Cancelar</Button> 
                </Col>
          
            </Row>
        </Container>
  )
}

export default Formulario_asginacion_rol


  
  
  
