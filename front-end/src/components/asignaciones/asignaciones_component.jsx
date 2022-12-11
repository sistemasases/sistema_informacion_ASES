import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select'  ;
import Switch from 'react-switch'
import {Container, Row, Col, Dropdown, Button,Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import carga_masiva_service from '../../service/carga_masiva';
import DataTable, {createTheme} from 'react-data-table-component';
import Listas from './listas'
import Listas_no_seleccion from './listas_no_seleccion';
import items from "./seleccionado.json";

const asignaciones_component = (props) =>{


  const[rol] = useState("practicante");
  const[rol2] = useState("monitor");
  const[rol3] = useState("estudiante");


  

  const [state,set_state] = useState({

    practicante_seleccionado : '',
    monitor_seleccino : '',
    estudiante_seleccion : '',


    option : '',
    mensaje : [],
    respuesta : 'Cargando...',
  })




  function practicante_seleccion(name){
    set_state({
      ...state,
      practicante_seleccionado : name
    })
    alert(name)
  }
  function monitor_seleccion(name){
    set_state({
      ...state,
      monitor_seleccionado : name
    })
        alert(name)

  }
  function estudiante_seleccion(name){
    set_state({
      ...state,
      estudiante_seleccionado : name
    })
        alert(name)

  }



  return (
        <Container className="container_asignaciones">

          <Row className="row_listas">

            <Col xs={"12"} md={"4"}>
              <Row>      
                Practicantes          
              </Row>
                Total estudiantes acompañados 
              <Row>
              </Row>
              <Row>
                Profecional
                <Select></Select>
              </Row>
              <Row>
              { items.map((item, index) => <Listas key={index} item={item} rol={rol} 
              childClicked={(name)=>practicante_seleccion(name)}/>) }
              </Row>
            </Col>

            <Col xs={"12"} md={"4"}>
              <Row>       
                Monitores         
              </Row>
              <Row>
                <Col xs={"6"}>
                  Facultad
                  <Select></Select>
                </Col>
                <Col xs={"6"}>
                  Programa
                  <Select></Select>
                </Col>
              </Row>
              <Row>
                <Col xs={"12"} md={"9"}>
                  <Select></Select>
                </Col>
                <Col  xs={"12"} md={"3"}>
                  <Button>Limpiar</Button>
                </Col>
              </Row>
              <Row>

                {
                  state.practicante_seleccionado === '' ?
                  (
                    <Col>Practicante no seleccionado </Col>
                  )
                  :
                  (
                  <Col>
                    { items.map((item, index) => <Listas 
                  key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}
                  childClicked2={(name)=>monitor_seleccion(name)}/>) }
                  </Col>
                  )
                }

                { items.map((item, index) => <Listas_no_seleccion 
                key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}/>) }

              </Row>
            </Col>

            <Col xs={"12"} md={"4"}>
              <Row>   
                Estudiantes             
              </Row> 
              <Row>
                <Col xs={"6"}>
                  Facultad
                  <Select></Select>
                </Col>
                <Col xs={"6"}>
                  Programa
                  <Select></Select>
                </Col>
              </Row>
              <Row>
                <Col xs={"12"} md={"9"}>
                  <Select></Select>
                </Col>
                <Col  xs={"12"} md={"3"}>
                  <Button>Limpiar</Button>
                </Col>
              </Row>
              <Row>
                {
                  state.practicante_seleccionado === '' ?
                  (
                    <Col>Monitor no seleccionado </Col>
                  )
                  :
                  (
                  <Col>
                  { items.map((item, index) => <Listas 
                  key={index} item={item} rol={rol3} monitor_seleccionado={state.monitor_seleccionado}
                  childClicked3={(name)=>estudiante_seleccion(name)}/>) }
                  </Col>
                  )
                }

                { items.map((item, index) => <Listas_no_seleccion 
                key={index} item={item} rol={rol3} monitor_seleccionado={state.monitor_seleccionado}/>) }

                
              </Row>
            </Col>

          </Row>


          <Row>
            <Button>abajo</Button>
          </Row>






            
        </Container>
  )
}

export default asignaciones_component


  
  
  
