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

import profecionales from "./profecionales";
import todos_practicantes from "./practicantes_json.json";
import practicantes_seleccionados from "./practicante_seleccionado";
import monitores_json from "./monitores_json.json";
import monitores_seleccionados from "./monitores_seleccionados";
import estudiantes_json from "./estudiantes_json.json";
import estudiantes_seleccionados from "./estudiantes_seleccionados";
import {Scrollbars} from 'react-custom-scrollbars'; 


const asignaciones_component = (props) =>{

  const opciones_profecionales =[
    {value : profecionales['0']['id'], label : profecionales['0']['username']},
    {value : profecionales['1']['id'], label : profecionales['1']['username']},
    {value : profecionales['2']['id'], label : profecionales['2']['username']}

  ]

  const[rol] = useState("practicante");
  const[rol2] = useState("monitor");
  const[rol3] = useState("estudiante");


  

  const [state,set_state] = useState({

    profecional_seleccionado : '',
    practicante_seleccionado : '',
    monitor_seleccionado : '',
    estudiante_seleccion : '',

    practicante_filtro : '',
    monitor_filtro : '',
    estudiante_filtro : '',

    option : '',
    mensaje : [],
    respuesta : 'Cargando...',
  })

  const cambiar_dato_select = (e) =>{
          set_state({
                ...state,
                 profecional_seleccionado: e.value
          })
    }


   const cambiar_dato = (e) =>{
          set_state({
                ...state,
                [e.target.name] : e.target.value
          })
          console.log(e.target.value)
    }




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


  const limpiar_practicantes = () => {
    set_state({
                ...state,
                practicante_filtro : ''
          })
  }
  const limpiar_monitores = () => {
    set_state({
                ...state,
                monitor_filtro : ''
          })
  }
  const limpiar_estudiantes = () => {
    set_state({
                ...state,
                estudiante_filtro : ''
          })
  }


  return (
        <Container className="container_asignaciones">

          <Row className="row_listas">

            <Col xs={"12"} md={"4"}>

              <Row  className="row_asignaciones_titulos">     
                <Col xs={"12"} className="col_asignaciones_titulos">
                Practicantes
                </Col> 
                <Col xs={"12"} className="col_asignaciones_titulos">
                Total estudiantes acompañados 
                </Col> 
                <Col xs={"12"} className="col_asignaciones_titulos">
                Profecional
                </Col>   
                <Select options={opciones_profecionales} onChange={cambiar_dato_select} ></Select>
              </Row>
              <Row >

                {
                    state.profecional_seleccionado === '' ?
                    (
                      <Col className="scroll_listas">
                        <Row className="asignaciones_no_seleccion">
                          Profecional no seleccionado 
                        </Row>
                      <Scrollbars>
                          { todos_practicantes.filter((item)=>{
                          return state.practicante_filtro.toLowerCase() === '' ? item 
                          : 
                          item.username.toLowerCase().includes(state.practicante_filtro) ||
                          item.first_name.toLowerCase().includes(state.practicante_filtro) ||
                          item.last_name.toLowerCase().includes(state.practicante_filtro);                      
                        }).map((item, index) => <Listas 
                        key={index} item={item} rol={rol} profecional_seleccionado={state.profecional_seleccionado}
                        childClicked={(name)=>practicante_seleccion(name)}/>) }
                      </Scrollbars>

                      </Col>
                    )
                    :
                    (
                    <Col className="scroll_listas">
                      <Row className="asignaciones_seleccion_profecional">
                        profecional: {state.profecional_seleccionado}
                        </Row>
                      { practicantes_seleccionados['0'].filter((item)=>{
                        return state.practicante_filtro.toLowerCase() === '' ? item 
                        : 
                        item.username.toLowerCase().includes(state.practicante_filtro) ||
                        item.first_name.toLowerCase().includes(state.practicante_filtro) ||
                        item.last_name.toLowerCase().includes(state.practicante_filtro);                      
                      }).map((item, index) => <Listas 
                    key={index} item={item} rol={rol} profecional_seleccionado={state.profecional_seleccionado}
                    childClicked={(name)=>practicante_seleccion(name)}/>) }
                    <Row className="separador_asignaciones"></Row>
                      { practicantes_seleccionados['1'].filter((item)=>{
                        return state.practicante_filtro.toLowerCase() === '' ? item 
                        : 
                        item.username.toLowerCase().includes(state.practicante_filtro) ||
                        item.first_name.toLowerCase().includes(state.practicante_filtro) ||
                        item.last_name.toLowerCase().includes(state.practicante_filtro);                      
                      }).map((item, index) => <Listas_no_seleccion 
                    key={index} item={item} rol={rol} profecional_seleccionado={state.profecional_seleccionado}/>) }
                    </Col>
                    )
                  }

              </Row>

            </Col>

            <Col xs={"12"} md={"4"}>
              <Row  className="row_asignaciones_titulos">  
                <Col xs={"12"} className="col_asignaciones_titulos">
                Monitores         
                </Col>     
                <Col xs={"12"} md={"9"}>
                  <input name="monitor_filtro" onChange={cambiar_dato}></input>
                </Col>
                <Col  xs={"12"} md={"3"}>
                  <Button onClick={limpiar_monitores}>Limpiar</Button>
                </Col>
              </Row>
              <Row>

                {
                  state.practicante_seleccionado === '' ?
                  (
                    <Col className="scroll_listas">
                      <Row className="asignaciones_no_seleccion">
                        Practicante no seleccionado 
                        </Row>
                    <Scrollbars>

                        { monitores_json.filter((item)=>{
                        return state.monitor_filtro.toLowerCase() === '' ? item 
                        : 
                        item.username.toLowerCase().includes(state.monitor_filtro) ||
                        item.first_name.toLowerCase().includes(state.monitor_filtro) ||
                        item.last_name.toLowerCase().includes(state.monitor_filtro);                      
                      }).map((item, index) => <Listas 
                      key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}
                      childClicked2={(name)=>monitor_seleccion(name)}/>) }
                     </Scrollbars>
                    </Col>
                  )
                  :
                  (
                  <Col className="scroll_listas">
                    <Row className="asignaciones_seleccion">
                      Practicante seleccionado : {state.monitor_seleccionado }
                    </Row>
                    <Scrollbars>
                    { monitores_seleccionados['0'].filter((item)=>{
                      return state.monitor_filtro.toLowerCase() === '' ? item 
                      : 
                      item.username.toLowerCase().includes(state.monitor_filtro) ||
                      item.first_name.toLowerCase().includes(state.monitor_filtro) ||
                      item.last_name.toLowerCase().includes(state.monitor_filtro);                      
                    }).map((item, index) => <Listas 
                  key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}
                  childClicked2={(name)=>monitor_seleccion(name)}/>) }
                    <Row className="separador_asignaciones"></Row>

                    { monitores_seleccionados['1'].filter((item)=>{
                      return state.monitor_filtro.toLowerCase() === '' ? item 
                      : 
                      item.username.toLowerCase().includes(state.monitor_filtro) ||
                      item.first_name.toLowerCase().includes(state.monitor_filtro) ||
                      item.last_name.toLowerCase().includes(state.monitor_filtro);                      
                    }).map((item, index) => <Listas_no_seleccion 
                  key={index} item={item} rol={rol2} practicante_seleccionado={state.practicante_seleccionado}/>) }
                  </Scrollbars>
                  </Col>
                  )
                }

                
              </Row>
            </Col>

            <Col xs={"12"} md={"4"}>
              <Row className="row_asignaciones_titulos">
                <Col xs={"12"} className="col_asignaciones_titulos">
                Estudiantes
                </Col>
                <Col xs={"12"} md={"9"}>
                  <input name="estudiante_filtro" onChange={cambiar_dato}></input>
                </Col>
                <Col  xs={"12"} md={"3"}>
                  <Button  onClick={limpiar_estudiantes}>Limpiar</Button>
                </Col>
              </Row>
              <Row>
                {
                  state.monitor_seleccionado === '' ?
                  (
                    <Col className="scroll_listas">
                      <Row className="asignaciones_no_seleccion">
                        Monitor no seleccionado 
                      </Row>
                    <Scrollbars>
                      { estudiantes_json.filter((item)=>{
                        return state.estudiante_filtro.toLowerCase() === '' ? item 
                        : 
                        item.nombre.toLowerCase().includes(state.estudiante_filtro) ||
                        item.apellido.toLowerCase().includes(state.estudiante_filtro) ||
                        item.cod_univalle.toLowerCase().includes(state.estudiante_filtro);                      
                      }).map((item, index) => 
                      
                      <Listas 
                      key={index} item={item} rol={rol3} 
                      monitor_seleccionado={state.monitor_seleccionado}
                      filtro={state.estudiante_filtro}
                      childClicked3={(name)=>estudiante_seleccion(name)}/>) }
                    </Scrollbars>
                    </Col>
                  )
                  :
                  (
                  <Col className="scroll_listas">
                    <Row className="asignaciones_seleccion">
                      Monitor seleccionado : {state.monitor_seleccionado }
                    </Row>
                  <Scrollbars>
                  { estudiantes_seleccionados['0'].filter((item)=>{
                      return state.estudiante_filtro.toLowerCase() === '' ? item 
                      : 
                      item.nombre.toLowerCase().includes(state.estudiante_filtro) || 
                      item.apellido.toLowerCase().includes(state.estudiante_filtro) ||
                      item.cod_univalle.toLowerCase().includes(state.estudiante_filtro);                      
                    }).map((item, index) => <Listas 
                  key={index} item={item} rol={rol3} 
                  filtro={state.estudiante_filtro}
                  monitor_seleccionado={state.monitor_seleccionado}
                  childClicked3={(name)=>estudiante_seleccion(name)}/>) }
                    <Row className="separador_asignaciones"></Row>

                    { estudiantes_seleccionados['1'].filter((item)=>{
                      return state.estudiante_filtro.toLowerCase() === '' ? item 
                      : 
                      item.nombre.toLowerCase().includes(state.estudiante_filtro), 
                      item.apellido.toLowerCase().includes(state.estudiante_filtro),
                      item.cod_univalle.toLowerCase().includes(state.estudiante_filtro);                      
                    }).map((item, index) => <Listas_no_seleccion 
                  key={index} item={item} rol={rol3} 
                  filtro={state.estudiante_filtro}
                  monitor_seleccionado={state.monitor_seleccionado}/>) }
                  </Scrollbars>
                  </Col>
                  )
                }

                
                
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


  
  
  
