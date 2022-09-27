import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import inicio_semestre_service from '../../service/inicio_semestre';


const inicio_semestre_component = () =>{
  return (
        <Container>
            <Row className="rowJustFlex">
                <p>Para iniciar semestre selecione la instancia con la cual desea trabajar:</p>  
            </Row>
            <Row className="rowJustFlex">
                <Form.Select name= "option">
                  <option value="Principales">Sedes Principales</option>
                  <option value="Regionales">Sedes Regionales</option>
                </Form.Select>
            </Row>
            <Row className="rowJustFlex">
                <p>Crear semestre: </p>  
            </Row>
            <Row className="rowJustFlex">
                <Button>Iniciar</Button>  
            </Row>
        </Container>
  )
}

export default inicio_semestre_component